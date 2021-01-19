<template>
    <div class = 'login' id='center'>
        <div class='loginBox'>
            <form>
                <table>
                    <tr><td><input type="text" class="login_txt" placeholder="ID"/></td></tr>
                    <tr><td><input type="password" class="login_txt" placeholder="PW"/></td></tr>
                </table>
            </form>
            <div class = 'btn_wrap'>
                <button type="button" class="login_btn"  v-on:click="routerpush" style="height: 30px; width: 150px">로그인</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    routerpush () {
      this.$router.push('/main')
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
