<template>
    <div id="modal">
        <div class="modal_message">
            <span>
               로그인에 실패하였습니다.<br>로그인 정보를 다시 확인해주세요.
            </span>
        </div>
        <div class="modal_button_wrap">
          <input class="btn btn-default col-md-3" @click="$emit('close')" type="button" value="확인">
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      del_password: ''
    }
  },
  props: [
    'hot_table'
  ],
  methods: {
    del_data () {
      this.$emit('close')
    }
  }
}
</script>
