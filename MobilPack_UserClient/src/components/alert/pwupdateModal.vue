<template>
    <div id="modal">
        <div class="modal_message">
            <input type="password" v-model='currentpw' placeholder="현재 비밀번호">
            <input type="password" v-model='editpw' placeholder="변경 비밀번호">
            <input type="password" v-model='confirmpw' placeholder="변경 비밀번호 확인">
        </div>
        <div class="modal_button_wrap">
          <input class="btn btn-default col-md-3" @click="editPw" type="button" value="변경">
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      currentpw: '',
      editpw: '',
      confirmpw: ''
    }
  },
  props: [
    'hot_table'
  ],
  methods: {
    editPw () {
      if (this.currentpw === '' || this.editPw === '' || this.confirmpw === '') {
        alert('비밀번호를 입력해주세요.')
      } else {
        if (this.editpw === this.confirmpw) {
          this.$axios.post('http://localhost:9000/api/my/pwupdate', {
            currentpw: this.currentpw,
            editpw: this.editpw
          })
            .then((res) => {
              if (res.status === 202) {
                alert('현재 비밀번호와 일치하지 않습니다.')
              } else {
                alert('변경되었습니다.')
                this.$router.push('/')
                this.$emit('close')
              }
            })
            .catch((err) => {
              console.log(err)
              alert('서버 작업중입니다.\n다시 시도해주세요.')
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
