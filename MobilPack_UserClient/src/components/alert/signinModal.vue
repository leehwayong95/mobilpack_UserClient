<template>
    <div id="modal">
        <div class="modal_message">
            <span>ID</span>
            <span>
               <input type="text">
            </span>
            <span>PW</span>
            <span><input type="text"></span>
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
