<template>
  <div class="srch_box">
    <h1 v-on:click="jump('recommands')"> 관광지 추천 <br>&nbsp;&nbsp;&nbsp;페이지</h1>
    <div align="right">
        <button class="btn" v-on:click="jump('recommands')">추천장소</button>
        <button class="btn"  v-on:click="jump('notice')">공지사항</button>
        <button class="btn"  v-on:click="jump('qna')">문의사항</button>
        <button class="btn" v-on:click="jump('myinfo')">사용자 이름</button>
        <button class="btn" @click="Logout">로그아웃</button>
    </div>
  </div >
</template>

<script>
export default {
  methods: {
    jump (s) {
      this.$router.push('/' + s)
    },
    Logout () {
      this.$cookie.delete('authorization')
      this.$cookie.delete('name')
      this.$router.push('/')
    }
  }
}
</script>

<style>
.srch_box h1 {
    font-size: 30px;
    color: aliceblue;
}
.srch_box>*{
    display: inline-block;
}
.btn {
    /* margin이 버튼 간격 입니다 */
    margin-right: 60px;
    height: 30px;
    font-size: 20px;
    color: aliceblue;
}
.srch_box {
     /* flex, justify-content, align-items:공부 필요합니다 */
    position: relative;
    width: 100%;
    padding: 20px;
    background: #2c3a52;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
