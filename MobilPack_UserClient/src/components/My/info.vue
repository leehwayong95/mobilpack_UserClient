<template>
  <div id="center">
    <div class="title">
      <h1>| 내 정보 변경</h1>
    </div>
    <div class="cont_inner">
      <table>
        <colgroup>
          <col width="200px">
          <col>
        </colgroup>
        <tr>
          <th>이름</th>
          <td><input type="text" placeholder="name" id="input_name" v-model="name"></td>
        </tr>
        <tr>
          <th>연락처</th>
          <td><input type="text" placeholder="phone" id="input_phone" v-model="phone"></td>
        </tr>
        <tr>
          <th>이메일</th>
          <td><input type="text" placeholder="name" id="input_email" v-model="email"><button id='check' @click="checkconfirm">중복확인</button></td>
        </tr>
        <tr>
          <th>비밀번호</th>
          <td><button class="pwedit" @click="pwupdate">비밀번호 변경</button></td>
        </tr>
      </table>
      <button class="infoupdate" @click="updateinfo">저 장</button>
    </div>
  </div>
</template>

<script>
import editPwModal from '../alert/pwupdateModal'
export default {
  data () {
    return {
      name: '',
      phone: '',
      email: '',
      checkEmail: false,
      original: ''
    }
  },
  mounted () {
    this.getinfo()
  },
  watch: {
    // 입력방지
    // id : 영문, 골뱅이, '.'문자만 허용
    // pw : 영문, 숫자
    // phone : 12글자, 숫자
    email () {
      if (!this.checkEmail) {
        this.email = this.email.replace(/[^A-Za-z0-9@._+]/g, '')
      } else {
        this.checkEmail = false
      }
    },
    name () {
      this.name = this.name.replace(/[^ㄱ-ㅎ가-힣+]/g, '')
    },
    phone () {
      this.phone = this.phone.replace(/[^0-9+]/g, '')
    }
  },
  methods: {
    // 사용자 정보 수정 메서드
    updateinfo () {
      if (this.confirmInfo()) {
        this.$axios.post('http://localhost:9000/api/my/update', {
          name: this.name,
          phone: this.phone,
          email: this.email
        })
          .then((res) => {
            alert('정보 수정 완료')
            if (this.original !== this.email) { // 아이디를 수정했을 때
              alert('바꾼 아이디로 로그인 해주세요')
              this.$router.push('/')
            } else { // 아이디를 수정하지 않았을 때
              // main으로 가는게 맞는거 같은데 token 정보가 바뀌지않아서 다시 로그인
              this.$cookie.set('name', this.name) // 쿠키 변경해도 새로고침이 필요. 조금더 고민
              this.$router.push('/')
            }
          })
          .catch((err) => { // 토큰 expired 일 때
            console.log(err)
            alert('다시 로그인해주세요')
          })
      }
    },
    // 사용자 정보 불러오기 메서드
    getinfo () {
      this.$axios.post('http://localhost:9000/api/my/info')
        .then((res) => {
          if (res.data.status) {
            this.email = res.data.UserModel['user_id']
            this.original = res.data.UserModel['user_id']
            this.name = res.data.UserModel.name
            this.phone = res.data.UserModel.phone
          } else { // 아이디가 없을 때
            alert('정보 불러오기 실패')
          }
        })
        .catch((err) => { // 토큰 expire 경우
          console.log(err)
          alert('다시 로그인 해주세요')
          this.$cookie.delete('Authorization')
          this.$cookie.delete('name')
          this.$router.push('/')
        })
    },
    // 사용자 입력 정보 검사
    confirmInfo () {
      let list = {
        input_name: this.name,
        input_phone: this.phone,
        input_email: this.email,
        check: this.checkEmail
      }
      let message = {
        input_name: '이름을 입력해주세요',
        input_phone: '휴대폰 번호를 입력해주세요.',
        input_email: '이메일을 입력해주세요.',
        check: '이메일 중복확인을 해주세요.'
      }
      // 빈칸 검사 flag
      let checkflag = true
      // 빈칸 검사 for문
      for (let i in list) {
        if (list[i] === '' || list[i] === false) { // 하나라도 해당 될 때
          if (i === 'check' && this.original === this.email) {
            // 이메일이 변경되지 않았을땐 중복검사 통과
            continue
          }
          alert(message[i]) // 해당 안내 메시지 표출
          document.getElementById(i).focus() // 해당 객체 focus
          checkflag = false
          break
        }
      }
      // 전화번호 형식검사
      if (checkflag && !this.phoneCheck(this.phone)) {
        alert('휴대폰 번호 형식이 아닙니다.\n다시 입력해주세요.')
        document.getElementById('input_phone').focus()
        checkflag = false
      }
      return checkflag
    },
    // 이메일 정규식 검사 실시 및 아이디 중복 확인 검사
    checkconfirm () {
      if (this.emailCheck(this.email)) { // 먼저 정규식 검사 통과하면 요청
        this.$axios.post('http://localhost:9000/api/user/check', {id: this.email})
          .then((res) => {
            if (res.data.status) {
              alert('사용 가능한 이메일입니다.')
              this.checkEmail = true
            } else {
              alert('이미 사용중인 이메일입니다.\n확인 후 다시 입력해주세요.')
            }
          })
          .catch((err) => {
            console.log(err)
            alert('서버개발자가 열심히 일하는중입니다.\n잠시후 시도해주세요.')
          })
      } else { // 정규식 검사 실패시
        alert('이메일 형식이 아닙니다.\n다시 입력해주세요.')
      }
    },
    // 정규식 검사 메서드 //

    // 이메일 정규식 검사
    emailCheck (asEmail) {
      var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      return regExp.test(asEmail)
    },
    // 휴대폰 번호 검사 메서드
    phoneCheck (asPhone) {
      var regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
      return regExp.test(asPhone)
    },
    pwupdate () {
      this.$modal.show(editPwModal, {
        hot_table: 'data',
        modal: this.$modal
      },
      {
        name: 'dynamic-modal',
        width: '400px',
        height: '330px',
        draggable: false
      })
    }
  }
}
</script>
<style scoped>
#center > .cont_inner {
  padding: 0 100px;
  background-image: url('../../assets/images/zzzzz.png');
  background-repeat: no-repeat;
}
#center table{
  margin-top: 30px !important;
  width: 100%;
}
#center table th{
  text-align: right;
  padding: 0 10px;
  width: 10%;
}
table td{
  text-align: left !important;
}
table td input{
  width: 30%;
  margin-right: 10px;
}
button{
  position: relative !important;
  width: 100px;
  height: 30px;
  margin: 0 auto;
  right: 0 !important;
}
</style>
