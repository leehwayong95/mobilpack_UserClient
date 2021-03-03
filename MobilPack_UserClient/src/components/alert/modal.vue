<template>
  <div id="modal">
    <div class="closebtn">
      <img src="@/assets/images/btn_modalclose.png" width="20px" alt="Close Button" @click="$emit('close')">
    </div>
    <div class="modal_message">
      <span v-html="this.$props.hot_table"></span>
    </div>
    <div class="modal_button_wrap">
      <input class="btn btn-default col-md-3"
        @click="$emit('close')"
        type="button"
        value="확인">
    </div>
  </div>
</template>

<style scoped>
#modal {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
div.closebtn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
div.modal_message {
  position: absolute;
  width: 100%;
  padding: 0 20px ;
}
div.modal_button_wrap {
  position: absolute;
  bottom: 10px;
}

div.modal_button_wrap input {
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
  transform: translate(-50%, 0);
}
</style>

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
