<template>
  <div class='login' id='container'>
    <div class='loginBox'>
      <div class='login_logo'>
        관광지 추천<br>페이지
      </div>
      <div class="inputform">
        <span>아이디</span>
        <input type="text" class="login_txt" v-model="id"/>
        <span>비밀번호</span>
        <input
          type="password" class="login_txt"
          v-model="pw"
          v-on:keyup.enter="login"/>
        <div class = 'btn_wrap'>
          <button type="button" class="login_btn"  @click="login">로그인</button>
          <button type="button" @click="signin">회원가입</button>
        </div>
      </div>
      <span> 기존 계정의 아이디 또는 비밀번호를 잊은 경우,<br> 담당 관리자에게 문의 바랍니다.</span>
    </div>
  </div>
</template>

<style>
@import url('../../assets/css/content');

div.login_logo {
  font-weight: 500;
  font-size: 50px;
}
div.inputform {
  border: solid 1px #aaa;
  padding: 20px;
  padding-top: 50px;
}
div.inputform span {
  display: inline-block;
  margin: 10px 0;
}
.login .btn_wrap button {
  width: 100%;
  height: 30px;
}
.login .btn_wrap button.login_btn {
  background: #548235;
}
.btn_wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.loginBox > span {
  width: 100%;
  display: inline-block;
  margin-top: 10px;
  text-align: center;
}
</style>

<script>
import modal from '../alert/modal'
export default {
  data () {
    return {
      id: '',
      pw: ''
    }
  },
  methods: {
    login () {
      if (this.id === '') {
        this.alert('아이디를 입력해주세요.')
      } else if (this.pw === '') {
        this.alert('비밀번호를 입력해주세요')
      } else {
        this.$axios.post('http://localhost:9000/api/user/login', {
          id: this.id,
          pw: this.pw
        })
          .then((res) => {
            if (res.data.status) {
              this.$cookie.set('Authorization', res.data['jwt-token'])
              this.$cookie.set('user_name', res.data.name)
              this.$axios.defaults.headers.common['Authorization'] = res.data['jwt-token']
              this.$router.push({name: 'recommands'})
            } else {
              this.alert('로그인에 실패하였습니다.<br><br>로그인 정보를 다시 확인해주세요.')
            }
          })
          .catch((err) => {
            console.log(err)
            if (err.response.status === 410) {
              this.alert('미등록 아이디입니다.<br><br>확인 후 다시 입력해주세요.')
            } else {
              alert('서버 작업중')
            }
          })
      }
    },
    signin () {
      this.$router.push('/signin')
    },
    alert (s) {
      this.$modal.show(modal, {
        hot_table: s,
        modal: this.$modal
      },
      {
        name: 'dynamic-modal',
        width: '330px',
        height: '200px',
        draggable: true
      })
    }
  }
}
</script>
