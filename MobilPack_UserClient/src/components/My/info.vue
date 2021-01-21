<template>
  <div id="center">
    <div id="content">
      <div class="title">
        <h1>내 정보 변경</h1>
      </div>
      <div class="cont_inner">
        <table>
          <tr>이름
            <th><input type="text" placeholder="name" v-model="name"></th>
          </tr>
          <tr>연락처
            <th><input type="text" placeholder="phone" v-model="phone"></th>
          </tr>
          <tr>이메일
            <th><input type="text" placeholder="name" v-model="email"></th>
          </tr>
          <tr>비밀번호
            <th><button class="pwedit" >비밀번호 변경</button></th>
          </tr>
        </table>
        <button class="infoupdate" @click="updateinfo">저 장</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      phone: '',
      email: ''
    }
  },
  mounted () {
    this.getinfo()
  },
  methods: {
    updateinfo () {
      alert('구현중!')
    },
    getinfo () {
      this.$axios.post('http://localhost:9000/api/my/info')
        .then((res) => {
          if (res.data.status) {
            this.email = res.data.UserModel['user_id']
            this.name = res.data.UserModel.name
            this.phone = res.data.UserModel.phone
          } else {
            alert('정보 불러오기 실패')
          }
        })
        .catch((err) => {
          console.log(err)
          alert('오류')
        })
    }
  }
}
</script>
