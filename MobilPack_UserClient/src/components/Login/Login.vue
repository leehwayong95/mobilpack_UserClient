<template>
  <div class='login' id='container'>
    <div class='loginBox'>
      <div class='login_logo'>
        관광지 추천 페이지
      </div>
      <table>
        <tr><td><input type="text" class="login_txt" placeholder="ID" v-model="id"/></td></tr>
        <tr><td><input
          type="password" class="login_txt" placeholder="PW"
          v-model="pw"
          v-on:keyup.enter="login"/>
        </td></tr>
      </table>
      <div class = 'btn_wrap'>
        <button type="button" class="login_btn"  @click="login">로그인</button>
        <button type="button" class="login_btn" @click="signin">회원가입</button>
      </div>
    </div>
  </div>
</template>

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
      if (this.id === '' || this.pw === '') {
        alert('아이디와 비밀번호 모두 입력해주세요.')
      } else {
        this.$axios.post('http://localhost:9000/api/user/login', {
          id: this.id,
          pw: this.pw
        })
          .then((res) => {
            if (res.data.status) {
              this.$cookie.set('authorization', res.data['jwt-token'])
              this.$cookie.set('name', res.data.name)
              this.$axios.defaults.headers.common['authorization'] = res.data['jwt-token']
              this.$router.push('/main')
            } else {
              this.alert()
            }
          })
          .catch((err) => {
            console.log(err)
            alert('개발자가 열심히 일중입니다.\n잠시후 이용부탁드립니다.')
          })
      }
    },
    signin () {
      this.$router.push('/signin')
    },
    alert () {
      this.$modal.show(modal, {
        hot_table: 'data',
        modal: this.$modal
      },
      {
        name: 'dynamic-modal',
        width: '330px',
        height: '130px',
        draggable: true
      })
    }
  }
}
</script>

<style>
    @import url('../../assets/css/content');
.btn_wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
