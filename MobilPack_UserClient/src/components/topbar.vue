<template>
  <div class="srch_box">
    <h1 v-on:click="jump('recommands')"> 관광지 추천 <br>&nbsp;&nbsp;&nbsp;페이지</h1>
    <div class="manu">
        <button class="btn" v-on:click="jump('recommands')">추천장소</button>
        <button class="btn"  v-on:click="jump('notice')">공지사항</button>
        <button class="btn"  v-on:click="jump('qna')">문의사항</button>
        <span  v-on:click="jump('myinfo')">{{name}}님</span>
        <button class="btn2" @click="Logout">로그아웃</button>
    </div>
  </div >
</template>

<script>
export default {
  data () {
    return {
      click: false,
      name: this.$cookie.get('name')
    }
  },
  mounted () {
  },
  methods: {
    jump (s) {
      this.click = true
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
    margin-right: 60px;  /* margin이 버튼 간격 입니다 */
    height: 50px;/* 버튼 높이  */
    width: 150px;/* 버튼 너비 */
    font-size: 20px;
    color: aliceblue;
    border: 1px solid rgb(245, 240, 240);/* 버튼 테두리 배경 */
    padding: 0 10px;
    border-radius: 20px;/* 버튼모양을 원으로 만들어줌 ? */
    cursor: pointer; /* 뭐지? */
}
.btn2{
    font-size: 15px;
    border: 1px solid rgb(10, 4, 4);
    padding: 0 30px;
    border-radius: 4px;
    height: 30px;
    margin-left: 10px;
}
.srch_box {
     /* flex, justify-content, align-items:공부 필요합니다 */
    position: relative;
    width: 100%;
    padding: 20px;
    background: #2c3a52;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.manu span {
    font-size: 20px;
    color: #fff;
}
</style>
