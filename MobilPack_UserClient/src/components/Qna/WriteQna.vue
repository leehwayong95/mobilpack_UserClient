<template>
  <div id="center">
    <div class="title" v-if="edit">
      <h1>| 문의수정</h1>
      <h3>home > 문의목록 > 문의내용 > 문의수정</h3>
    </div>
    <div class="title" v-else>
      <h1>| 문의등록</h1>
      <h3>home > 문의목록 > 문의등록</h3>
    </div>
    <div class="cont_inner">
      <table>
        <tr>
          <th>문의유형</th>
          <td>
            <select v-model="category" id="category">
              <option value="">선택해주세요</option>
              <option value="1">이용</option>
              <option value="2">오류</option>
              <option value="3">기타</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>제목</th>
          <td><input type="text" v-model="title" id="title"></td>
        </tr>
        <tr>
          <th>내용</th>
          <td><textarea type="text" class="content" v-model="content" id="input_Q"/></td>
        </tr>
      </table>
      <div class="btn_wrap">
        <button class="cancel" @click="cancel">취소</button>
        <button class="save" @click="editQna" v-if="edit">수정</button>
        <button class="save" @click="writeQna" v-else>등록</button>
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
      content: '',
      edit: false
    }
  },
  mounted () {
    if (this.$route.name === 'editQna') {
      let data = this.$route.params.data
      this.category = data.category
      this.title = data.title
      this.content = data.content.replace(/(<br \/>)/g, '\n').replace(/(<([^>]+)>)/ig, '')
      this.edit = true
    }
  },
  methods: {
    cancel () {
      if (confirm('취소하시겠습니까?')) {
        this.$router.go(-1)
      }
    },
    writeQna () {
      if (this.category === '') {
        alert('문의 유형을 선택해주세요')
        document.getElementById('category').focus()
      } else if (this.title === '') {
        alert('제목을 입력해주세요')
        document.getElementById('title').focus()
      } else if (this.content === '') {
        alert('문의사항을 입력해주세요')
        document.getElementById('input_Q').focus()
      } else {
        this.$axios.post('http://localhost:9000/api/qna/', {
          category: this.category,
          title: this.title,
          content: this.convertHTML(this.content)
        })
          .then((res) => {
            alert('등록하였습니다.')
            this.$router.push('/qna')
          })
          .catch((err) => {
            console.log(err)
            alert('로그인이 만료되었습니다. 다시 로그인해주세요')
            this.$router.push('/')
          })
      }
    },
    editQna () {
      this.$axios.put('http://localhost:9000/api/qna/' + this.$route.params.index, {
        category: this.category,
        title: this.title,
        content: this.convertHTML(this.content)
      })
        .then((res) => {
          alert('수정되었습니다.')
          this.$router.push('/qna/' + this.$route.params.index)
        })
        .catch((err) => {
          console.log(err)
          alert('로그인이 만료되었습니다. 다시 로그인해주세요')
          this.$router.push('/')
        })
    },
    convertHTML (content) {
      var regURL = new RegExp(`(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)`, 'gi')
      var regEmail = new RegExp('([xA1-xFEa-z0-9_-]+@[xA1-xFEa-z0-9-]+.[a-z0-9-]+)', 'gi')
      return content
        .replace(regURL, `<a href='$1://$2' target='_blank'>$1://$2</a>`)
        .replace(regEmail, `<a href='mailto:$1'>$1</a>`)
        .replace(/(?:\r\n|\r|\n)/g, '<br />')
    }
  }
}
</script>
