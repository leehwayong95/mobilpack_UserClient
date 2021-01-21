<template>
  <div class='login' id='container'>
    <div class='loginBox'>
      <div class='login_logo'>
        회원가입
      </div>
      <table>
        <tr><td>
          <input type="text" id='signin_id' class="login_txt" placeholder="ID" v-model="id"/>
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
        </td></tr>
      </table>
      <table>
        <tr><td><input type="text" placeholder="이름" v-model="name" id='signin_name'/></td></tr>
        <tr><td><input type="text" placeholder="전화번호" v-model="phone" id='signin_phone'/></td></tr>
        <tr><td>
          <select id="signin_contry" name="contry" v-model="contry">
          <option value="">국가 선택</option>
          <option value="KR">대한민국</option>
          <option value="US">미국</option>
          <option value="JP">일본</option>
          <option value="CN">중국</option>
          </select>
        </td></tr>
      </table>
      <table>
        <tr><td><input type="checkbox" v-model="allagree" v-on:click="agree" ><span>전체동의</span></td></tr>
        <tr id='service_agree'><td><input type="checkbox" v-model="serviceagree"><span>(필수) 서비스 이용약관</span></td></tr>
        <tr id='info_agree'><td><input type="checkbox" v-model="infomationagree"><span>(필수) 개인정보 처리 방침</span></td></tr>
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
      contry: '',
      allagree: false,
      serviceagree: false,
      infomationagree: false
    }
  },
  methods: {
    signin () {
      let check = {
        signin_id: this.id,
        signin_check: this.check,
        signin_pw: this.pw,
        signin_confirm: this.confirmpw,
        signin_name: this.name,
        signin_phone: this.phone,
        signin_contry: this.contry,
        service_agree: this.serviceagree,
        info_agree: this.infomationagree
      }
      let message = {
        signin_id: '아이디를 입력해주세요',
        signin_check: '아이디 중복체크를 해주세요',
        signin_pw: '비밀번호를 입력해주세요',
        signin_confirm: '확인비밀번호가 다릅니다',
        signin_name: '이름을 입력해주세요',
        signin_phone: '전화번호를 입력해주세요',
        signin_contry: '거주나라를 선택해주세요',
        service_agree: '서비스 이용 약관에 동의해주세요',
        info_agree: '개인 정보 처리방침에 동의해주세요'
      }
      let checkingItem = null
      for (let i in check) {
        if (check[i] === '' || check[i] === false) {
          alert(message[i])
          document.getElementById(i).focus()
          checkingItem = i
          break
        }
      }
      if (checkingItem === null) {
        let signinItem = {
          user_id: this.id,
          password: this.pw,
          name: this.name,
          phone: this.phone,
          contry: this.contry
        }
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
    checkID () {
      if (this.id === '') {
        alert('아이디를 입력해주세요')
        document.getElementById('signin_id').focus()
      } else {
        this.$axios.post('http://localhost:9000/api/user/check', {
          id: this.id
        })
          .then((res) => {
            if (res.data.status) {
              alert('사용할 수 있는 아이디입니다.')
              document.getElementById('signin_id').disabled = true
              this.check = true
            } else {
              alert('사용할 수 없는 아이디입니다.')
            }
          })
      }
    },
    agree () {
      this.serviceagree = !this.allagree
      this.infomationagree = !this.allagree
    }
  }
}
</script>
