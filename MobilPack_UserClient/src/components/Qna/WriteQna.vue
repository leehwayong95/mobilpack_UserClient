<template>
  <div id="center">
    <div class="title">
      <h1>| 문의등록</h1>
      <h3>home > 문의목록 > 문의등록</h3>
    </div>
    <div class="cont_inner">
      <table>
        <tr>
          <th>문의유형</th>
          <td>
            <select v-model="category">
              <option value="">선택해주세요</option>
              <option value="1">이용</option>
              <option value="2">오류</option>
              <option value="3">기타</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>제목</th>
          <td><input type="text" v-model="title"></td>
        </tr>
        <tr>
          <th>내용</th>
          <td><input type="text" class="content" v-model="content"></td>
        </tr>
      </table>
      <div class="btn_wrap">
        <button class="cancel" @click="cancel">취소</button>
        <button class="save" @click="writeQna">등록</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      category: '',
      title: '',
      content: ''
    }
  },
  mounted () {
    if (this.$axios.defaults.headers.common['authorization'] === undefined || this.$axios.defaults.headers.common['authorization'] === null) {
      this.$axios.defaults.headers.common['authorization'] = this.$cookie.get('authorization')
    }
  },
  methods: {
    cancel () {
      if (confirm('취소하시겠습니까?')) {
        this.$router.push('/qna')
      }
    },
    writeQna () {
      this.$axios.post('http://localhost:9000/api/qna/', {
        category: this.category,
        title: this.title,
        content: this.content
      })
        .then((res) => {
          alert('등록하였습니다.')
          this.$router.push('/qna')
        })
        .catch((err) => {
          console.log(err)
          alert('개발자가 열심히 일을 하고 있습니다.\n잠시 후 시도해주세요')
        })
    }
  }
}
</script>
