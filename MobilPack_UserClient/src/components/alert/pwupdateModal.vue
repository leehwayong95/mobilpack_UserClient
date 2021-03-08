<template>
  <div id="modal">
    <div class="title">
      <span>비밀번호 변경</span>
      <img src="@/assets/images/btn_modalclose.png" width="20px" alt="Close Button" @click="$emit('close')">
    </div>
    <div class="modal_message">
      <span>현재 비밀번호</span>
      <input type="password" v-model='currentpw'>
      <span>새 비밀번호</span>
      <input type="password" v-model='editpw'>
      <span>새 비밀번호 확인</span>
      <input type="password" v-model='confirmpw'>
    </div>
    <p v-if="resCurrentPw" class="CurrentPwAlert">현재 비밀번호와 일치하지 않습니다.</p>
    <p v-if="regEditPw" class="regEditPwAlert">영문, 숫자를 포함 8자 이상으로 입력해주세요.</p>
    <p v-if="resConfirmpw" class="ConfirmPwAlert">새 비밀번호와 일치하지 않습니다.</p>
    <div class="modal_button_wrap">
      <input class="btn btn-default col-md-3" @click="editPw" type="button" value="변경하기">
    </div>
  </div>
</template>

<style scoped>
#modal {
  position:relative;
  width: 100%;
  height: 100%;
}
#modal > div.title {
  width: 100%;
  height: 50px;
  padding: 10px;
  border-bottom: solid 1px #000;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
}
div.title img {
  cursor: pointer;
}
#modal > div.modal_message {
  width: 100%;
  height: calc(100%-50px);
  display:grid;
  margin: 20px 0;
  grid-template-columns: 120px 200px;
  grid-template-rows: 30px 30px 30px;
  padding: 10px;
  gap: 20px;
  align-items: center;
  text-align: right;
  justify-content: center;
  position: absolute;
  bottom: 24%
}
div.modal_button_wrap {
  position: absolute;
  bottom: 10px;
  left: 40%;
}
div.modal_button_wrap input{
  width: 100px;
  height: 30px;
  font-size: 14px;
  color: #fff;
  background: #3d4b64;
  border: solid 1px #ddd;
  border-radius: 5px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  outline: none;
}
p.ConfirmPwAlert {
  position: absolute;
  bottom: 28%;
  right: 8%;
  color: red;
}
p.regEditPwAlert {
  position: absolute;
  bottom: 44%;
  right: 8%;
  color: red;
}
p.CurrentPwAlert {
  position: absolute;
  top: 37%;
  right: 8%;
  color: red;
}
</style>

<script>
export default {
  data () {
    return {
      currentpw: '',
      editpw: '',
      confirmpw: '',
      resCurrentPw: false,
      regEditPw: false,
      resConfirmpw: false
    }
  },
  props: [
    'hot_table'
  ],
  watch: {
    editpw () {
      if (this.regEditPw) {
        this.regEditPw = false
      }
    },
    currentpw () {
      if (this.resCurrentPw) {
        this.resCurrentPw = false
      }
    },
    confirmpw () {
      if (this.resConfirmpw) {
        this.resConfirmpw = false
      }
    }
  },
  methods: {
    editPw () {
      let flag = true
      var reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/
      if (this.currentpw === '' || this.editpw === '' || this.confirmpw === '') {
        alert('비밀번호를 입력해주세요.')
        flag = false
      }
      if (this.editpw !== this.confirmpw) {
        this.resConfirmpw = true
        flag = false
      }
      if (!reg.test(this.editpw)) {
        this.regEditPw = true
        flag = false
      }
      this.$axios.post('http://localhost:9000/api/my/pwupdate', {
        currentpw: this.currentpw,
        editpw: this.currentpw
      })
        .then((res) => {
          if (res.status === 202) {
            this.resCurrentPw = true
            flag = false
          }
        })
      if (flag) {
        if (this.editpw === this.confirmpw) {
          this.$axios.post('http://localhost:9000/api/my/pwupdate', {
            currentpw: this.currentpw,
            editpw: this.editpw
          })
            .then((res) => {
              if (res.status === 202) {
                this.resCurrentPw = true
              } else {
                alert('변경되었습니다.')
                this.$router.push('/')
                this.$emit('close')
              }
            })
            .catch((err) => {
              if (err.response.status === 401) {
                alert('로그인이 만료되었습니다. 다시 로그인해주세요')
                this.$cookie.delete('Authorization')
                this.$cookie.delete('user_name')
                this.$router.push('/')
              }
            })
        } else {
          alert('새비밀번호와 일치하지않습니다.\n다시 입력해주세요. ')
          this.editpw = ''
          this.confirmpw = ''
        }
      }
    }
  }
}
</script>
