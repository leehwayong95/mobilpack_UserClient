<template>
  <div id="center">
    <div class="title">
      <h1>| 문의상세</h1>
      <h3>HOME > 문의사항 > 문의상세</h3>
    </div>
    <div class="cont_inner">
      <table style ="margin-top: 30px">
        <colgroup>
          <col width="10%">
          <col width="40%">
          <col width="10%">
          <col width="40%">
        </colgroup>
        <tr>
          <th>문의 유형</th>
            <td v-if="data.category == 1">이용</td>
            <td v-else-if="data.category == 2">오류</td>
            <td v-else-if="data.category == 3">기타</td>
          <th>문의 일시</th>
          <td>{{data.createat}}</td>
        </tr>
        <tr>
          <th>답변 상태</th>
          <td v-if="data['admin_id']">답변완료</td>
          <td v-else>답변대기</td>
          <th>답변 일시</th>
          <td v-if="data.replydate">{{data.replydate}}</td>
          <td v-else>-</td>
        </tr>
        <tr>
          <th colspan="1">제목</th>
          <td colspan="3">{{data.title}}</td>
        </tr>
        <tr style="height: 200px">
          <th colspan="1">문의 내용</th>
          <td colspan="3" v-html="data.content" v-if="!editMode"></td>
          <td colspan="3" v-else>
            <div id="editMode">
              <textarea v-model="content"></textarea>
              <div id="editButton">
                <button @click="editQna">문의 수정</button>
                <button @click="editMode = false">취소</button>
              </div>
            </div>
          </td>
        </tr>
        <tr  style="height: 200px">
          <th colspan="1">답변 내용</th>
          <td colspan="3" v-if="data.reply" v-html="data.reply"></td>
          <td colspan="3" v-else>-</td>
        </tr>
      </table>
      <div class="menu">
        <div class="btn_list">
          <button @click="goList">목록</button>
        </div>
        <div class="btn_crud" v-if="permission && (data['admin_id'] === null)">
          <button class="btn_delete" @click="setUpdate">문의 수정</button>
          <button @click="setDelete">문의 삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      qnaindex: this.$route.params.index,
      permission: false,
      data: '',
      content: '',
      editMode: false
    }
  },
  created () {
    this.getQna(this.$route.params.index)
  },
  methods: {
    getQna (n) {
      this.$axios.get('http://localhost:9000/api/qna/' + n)
        .then((res) => {
          if (res.status === 202) {
            alert('글을 찾을 수 없습니다.')
            this.$router.push('/qna')
          } else {
            this.data = res.data.QnaPostModel
            this.permission = res.data.permission
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            alert('로그인이 만료되었습니다. 다시 로그인해주세요')
            this.$cookie.delete('Authorization')
            this.$cookie.delete('user_name')
            this.$router.push('/')
          }
        })
    },
    goList () {
      this.$router.push('/qna')
    },
    setDelete () {
      if (confirm('해당 문의를 삭제하시겠습니까?')) {
        this.$axios.delete('http://localhost:9000/api/qna/' + this.qnaindex)
          .then((res) => {
            this.$router.push('/qna')
          })
      }
    },
    setUpdate () {
      this.content = this.data.content.replace(/(<br \/>)/g, '\n').replace(/(<([^>]+)>)/ig, '')
      this.editMode = true
    },
    editQna () {
      this.$axios.put('http://localhost:9000/api/qna/' + this.$route.params.index, {
        content: this.convertHTML(this.content)
      })
        .then((res) => {
          alert('수정되었습니다.')
          this.editMode = false
          this.content = ''
          this.getQna(this.$route.params.index)
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

<style scoped>
#center {
  overflow: auto;
}
.menu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.menu > * > button {
  width: 100px;
  height: 30px;
  margin-top: 10px;
}
.menu > * > button.btn_delete {
  background-color: #6e8cc1;
  margin-right: 10px;
}

#center .cont_inner td {
  text-align: initial;
}
#center tr:hover {
  background: initial;
  cursor:initial;
}
#center table th {
  font-weight: 500;
  padding: 5px;
}
div#editMode {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: fit-content;
}
div#editMode div#editButton {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 10px;
}
div#editMode div#editButton button{
  width: 80px;
  height: 40px;
  margin: 10px 0;
}
</style>
