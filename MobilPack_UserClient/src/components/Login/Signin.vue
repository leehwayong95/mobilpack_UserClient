<template>
  <div class='login' id='container'>
    <div class='login_logo'>
        회원가입
    </div>
    <div class='loginBox'>
      <div class="inputIDPW">
        <table>
          <tr>이메일</tr>
          <tr><td style="position: relative;">
            <input type="text"
              id='signin_id'
              class="login_txt"
              placeholder="이메일을 입력해주세요."
              v-model="id"/>
            <button type="button" id='signin_check' class="login_btn" @click='checkID'>중복확인</button>
          </td></tr>
          <tr>비밀번호</tr>
          <tr><td>
            <input
            type="password"
            class="login_txt"
            placeholder="영문, 숫자를 포함 8자 이상으로 입력해주세요."
            v-model="pw"
            id='signin_pw'/>
          </td></tr>
          <tr>비밀번호 확인</tr>
          <tr><td>
            <input
            type="password" class="login_txt"
            v-model="confirmpw" id='signin_confirm'
            placeholder="비밀번호를 한 번 더 입력해주세요"/>
          </td></tr>
        </table>
      </div>
      <div class="inputInfo">
        <table>
          <tr>이름</tr>
          <tr><td><input type="text" v-model="name" id='signin_name' placeholder="홍길동"/></td></tr>
          <tr>연락처</tr>
          <tr><td><input
                type="text"
                placeholder="하이픈(-)을 제외하고 입력해주세요."
                v-model="phone" id='signin_phone'/>
          </td></tr>
          <tr>국가 선택</tr>
          <tr><td>
            <select id="signin_country" name="country" v-model="country" required>
              <option value="" disabled selected hidden>국가 선택</option>
              <option value="KR">대한민국</option>
              <option value="US">미국</option>
              <option value="JP">일본</option>
              <option value="CN">중국</option>
            </select>
          </td></tr>
        </table>
      </div>
      <table>
        <tr>
          <td><input type="checkbox" v-model="allagree" v-on:click="agree" ></td>
          <td><span>전체동의</span></td>
        </tr>
        <tr id='service_agree'>
          <td><input type="checkbox" v-model="serviceagree"></td>
          <td><span>(필수) 서비스 이용약관</span></td>
        </tr>
        <tr id='info_agree'>
          <td><input type="checkbox" v-model="infomationagree"></td>
          <td><span>(필수) 개인정보 처리 방침</span></td>
        </tr>
      </table>
      <div class='btn_wrap' style="text-align: center;">
        <button type="button" class="login_btn" @click="signin">회원가입</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
select:required:invalid {
  color: gray;
}
.login_logo {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 10%;
  font-size: 50px;
  font-weight: 600;
  color: #777;
}
.loginBox {
  padding: 10px;
  border: solid 1px #ccc;
  transform: translate(-50%, -50%);
}
.loginBox > table {
  margin-top: 10px;
}
.loginBox > table > tr {
  display: flex;
  flex-direction: row;
  justify-content:left;
  align-items: center;
  width: 100%;
  border: solid 1px #ccc;
  padding: 10px;
}
.loginBox > table > tr > td {
  padding: 0 !important;
}
input[type="checkbox"] {
  width: 30px;
  margin-right: 10px;
}
.inputIDPW {
  background: #ccc;
  padding: 10px;
}
.inputInfo {
  background: #ccc;
  padding: 10px;
  margin-top: 10px;
}
.login_btn {
  background: #548235;
}
.inputIDPW .login_btn {
  position: absolute;
  right: 5px;
  top: 2px;
  width: 20%;
  height: 50%;
}
</style>

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
      } else {
        this.check = false
      }
    },
    pw () {
      this.pw = this.pw.replace(/[^A-Za-z0-9+]/g, '')
    },
    name () {
      this.name = this.name.replace(/[^ㄱ-ㅎ가-힣A-Za-z+]/g, '')
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
        signin_confirm: this.confirmpw === this.pw,
        signin_name: this.name,
        signin_phone: this.phone,
        signin_country: this.country,
        service_agree: this.serviceagree,
        info_agree: this.infomationagree
      }
      // 부적격시 안내 메시지 리스트
      let message = {
        signin_id: '이메일을 입력해주세요',
        signin_check: '이메일 중복 확인을 진행해주세요.',
        signin_pw: '비밀번호를 입력해주세요',
        signin_confirm: '비밀번호가 서로 일치하지 않습니다.\n확인 후 다시 입력해주세요.',
        signin_name: '이름을 입력해주세요',
        signin_phone: '전화번호를 입력해주세요',
        signin_country: '거주나라를 선택해주세요',
        service_agree: '동의하지 않은 필수 약관이 있습니다.\n필수 항목을 모두 동의해주세요.',
        info_agree: '동의하지 않은 필수 약관이 있습니다.\n필수 항목을 모두 동의해주세요.'
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
      if (checkingItem && !this.pwCheck(this.pw)) {
        alert('비밀번호는 영문, 숫자를 포함하여\n8자 이상으로 입력해주세요.')
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
                alert('사용 가능한 이메일 입니다.')
              } else {
                alert('이미 사용중인 이메일입니다.\n다른 이메일을 입력해주세요.')
                this.id = ''
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
    pwCheck (asPw) { // 비밀번호는 검사가 필요한지 모르겠음.
      var reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/
      return reg.test(asPw)
    }
  }
}
</script>
