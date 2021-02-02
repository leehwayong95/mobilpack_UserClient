<template>
  <div class='login' id='container'>
    <div class='loginBox'>
      <div class='login_logo'>
        회원가입
      </div>
      <table>
        <tr><td>
          <input type="text" id='signin_id' class="login_txt" placeholder="이메일" v-model="id"/>
        </td></tr>
        <tr><td>
          <button type="button" id='signin_check' class="login_btn" @click='checkID'>중복확인</button>
        </td></tr>
        <tr><td>
          <input
          type="password" class="login_txt" placeholder="비밀번호"
          v-model="pw" id='signin_pw'/>
        </td></tr>
        <tr><td>
          <input
          type="password" class="login_txt" placeholder="비밀번호 확인"
          v-model="confirmpw" id='signin_confirm'/>
          <h3 style="color: red;" v-if="(pw !== confirmpw) && (confirmpw !== '')">비밀번호가 일치하지않습니다</h3>
        </td></tr>
      </table>
      <table>
        <tr><td><input type="text" placeholder="이름" v-model="name" id='signin_name'/></td></tr>
        <tr><td><input type="text" placeholder="전화번호" v-model="phone" id='signin_phone'/></td></tr>
        <tr><td>
          <select id="signin_country" name="country" v-model="country">
          <option value="">국가 선택</option>
          <option value="KR">대한민국</option>
          <option value="US">미국</option>
          <option value="JP">일본</option>
          <option value="CN">중국</option>
          </select>
        </td></tr>
      </table>
      <table>
        <tr>전체동의<td><span><input type="checkbox" v-model="allagree" v-on:click="agree" ></span></td></tr>
        <tr id='service_agree'><span>(필수) 서비스 이용약관</span><td><input type="checkbox" v-model="serviceagree"></td></tr>
        <tr id='info_agree'><span>(필수) 개인정보 처리 방침</span><td><input type="checkbox" v-model="infomationagree"></td></tr>
      </table>
      <div class = 'btn_wrap'>
        <button type="button" class="login_btn" @click="signin">회원가입</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  updated () {
    this.allagree = this.serviceagree && this.infomationagree
  },
  data () {
    return {
      id: '',
      check: false,
      pw: '',
      confirmpw: '',
      name: '',
      phone: '',
      country: '',
      allagree: false,
      serviceagree: false,
      infomationagree: false
    }
  },
  watch: {
    // 입력방지
    // id : 영문, 골뱅이, '.'문자만 허용
    // pw : 영문, 숫자
    // phone : 12글자, 숫자
    id () {
      if (!this.check) {
        this.id = this.id.replace(/[^A-Za-z0-9@._+]/g, '')
      }
    },
    pw () {
      this.pw = this.pw.replace(/[^A-Za-z0-9+]/g, '')
    },
    name () {
      this.name = this.name.replace(/[^ㄱ-ㅎ가-힣+]/g, '')
    },
    phone () {
      this.phone = this.phone.replace(/[^0-9+]/g, '')
    }
  },
  methods: {
    // 회원가입 요청 메서드
    signin () {
      // 회원가입시 체크하는 리스트
      let check = {
        signin_id: this.id,
        signin_check: this.check,
        signin_pw: this.pw,
        signin_confirm: this.confirmpw,
        signin_name: this.name,
        signin_phone: this.phone,
        signin_country: this.country,
        service_agree: this.serviceagree,
        info_agree: this.infomationagree
      }
      // 부적격시 안내 메시지 리스트
      let message = {
        signin_id: '아이디를 입력해주세요',
        signin_check: '아이디 중복체크를 해주세요',
        signin_pw: '비밀번호를 입력해주세요',
        signin_confirm: '확인비밀번호가 다릅니다',
        signin_name: '이름을 입력해주세요',
        signin_phone: '전화번호를 입력해주세요',
        signin_country: '거주나라를 선택해주세요',
        service_agree: '서비스 이용 약관에 동의해주세요',
        info_agree: '개인 정보 처리방침에 동의해주세요'
      }
      // 리스트 점검 flag
      let checkingItem = true
      // 리스트 점검 반복문
      for (let i in check) {
        if (check[i] === '' || check[i] === false) {
          alert(message[i])
          document.getElementById(i).focus() // 부적격 아이템 focus
          checkingItem = false// 부적격 아이템 발견시 flag 초기화
          break
        }
      }
      // 휴대폰 번호 정규식 검사 (위 리스트 점검 반복문을 통과했을 때)
      if (checkingItem && !this.phoneCheck(this.phone)) {
        alert('휴대폰 번호가 올바르지 않습니다.\n다시 입력 해주세요')
        checkingItem = false
      }
      if (checkingItem) { // flag가 초기값 그대로일 때
        let signinItem = { // 필요 아이템 Json형식에 맞춰 담기
          user_id: this.id,
          password: this.pw,
          name: this.name,
          phone: this.phone,
          country: this.country
        }
        // 회원가입 요청
        this.$axios.post('http://localhost:9000/api/user/signin', signinItem)
          .then((res) => {
            if (res.data.status) {
              alert('회원가입이 정상적으로 처리되었습니다.')
              this.$router.push('/')
            } else {
              alert('회원가입 실패')
            }
          })
          .catch((err) => {
            alert(err.message)
          })
      }
    },
    // 아이디 중복 확인 메서드
    checkID () {
      if (this.id === '') {
        alert('아이디를 입력해주세요')
        document.getElementById('signin_id').focus()
        // 공백입력시 아이디 입력칸 focus
      } else {
        // 정규식 검사 메서드
        if (this.emailCheck(this.id)) {
          // 중복확인 요청
          this.$axios.post('http://localhost:9000/api/user/check', {
            id: this.id
          })
            .then((res) => {
              console.log(res.data)
              if (res.data.status) {
                this.check = true
                // 중복 확인 flag 활성화
                alert('사용할 수 있는 아이디입니다.')
                document.getElementById('signin_id').disabled = true
                // 사용할 수 있는 아이디이면 변경 불가하게 disabled
              } else {
                alert('사용할 수 없는 아이디입니다.')
              }
            })
            .catch((err) => {
              console.log(err.message)
              alert('서버 오류입니다.\n개발자가 열심히 일하고있습니다.\n잠시 후 시도해주세요')
            })
        } else {
          alert('이메일 형식이 아닙니다. 다시 입력 해주세요')
          document.getElementById('signin_id').focus()
        }
      }
    },
    // 전체 동의 메서드
    agree () {
      this.serviceagree = !this.allagree
      this.infomationagree = !this.allagree
    },
    // 정규식 검사 메서드 //
    emailCheck (asEmail) {
      var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      return regExp.test(asEmail)
    },
    phoneCheck (asPhone) {
      var regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
      return regExp.test(asPhone)
    },
    pwCheck () { // 비밀번호는 검사가 필요한지 모르겠음.
    }
  }
}
</script>
