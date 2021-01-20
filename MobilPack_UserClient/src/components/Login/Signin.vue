<template>
  <div class='login' id='container'>
    <div class='loginBox'>
      <div class='login_logo'>
        회원가입
      </div>
      <table>
        <tr><td>
          <input type="text" class="login_txt" placeholder="ID" v-model="id"/>
        </td></tr>
        <tr><td>
          <button type="button" class="login_btn">중복확인</button>
        </td></tr>
        <tr><td>
          <input
          type="password" class="login_txt" placeholder="비밀번호"
          v-model="pw"/>
        </td></tr>
        <tr><td>
          <input
          type="password" class="login_txt" placeholder="비밀번호 확인"
          v-model="confirmpw"/>
        </td></tr>
      </table>
      <table>
        <tr><td><input type="text" placeholder="이름" v-model="name"/></td></tr>
        <tr><td><input type="text" placeholder="전화번호" v-model="phone"/></td></tr>
        <tr><td>
          <select name="contry" v-model="contry">
          <option value="">국가 선택</option>
          <option value="KR">대한민국</option>
          <option value="US">미국</option>
          <option value="JP">일본</option>
          <option value="CN">중국</option>
          </select>
        </td></tr>
      </table>
      <table>
        <tr><td><input type="checkbox" v-model="allagree"><span>전체동의</span></td></tr>
        <tr><td><input type="checkbox" v-model="serviceagree"><span>(필수) 서비스 이용약관</span></td></tr>
        <tr><td><input type="checkbox" v-model="infomationagree"><span>(필수) 개인정보 처리 방침</span></td></tr>
      </table>
      <div class = 'btn_wrap'>
        <button type="button" class="login_btn" @click="signin">회원가입</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      pw: '',
      confirmpw: '',
      name: '',
      phone: '',
      contry: '',
      allagree: (this.serviceagree && this.infomationagree),
      serviceagree: false,
      infomationagree: false
    }
  },
  methods: {
    signin () {
      alert(this.allagree)
    }
  }
}
</script>
