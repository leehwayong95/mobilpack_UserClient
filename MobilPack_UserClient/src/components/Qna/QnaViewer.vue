<template>
  <div id="center">
    <div class="title">
      <h1>| 문의내용</h1>
      <h3>home > 문의목록 > 문의내용</h3>
    </div>
    <div class="cont_inner">
      <table style ="margin-top: 30px">
        <tr style="height: 80px">
          <th>문의 유형</th>
            <td v-if="data.category == 1">이용</td>
            <td v-else-if="data.category == 2">오류</td>
            <td v-else-if="data.category == 3">기타</td>
          <th>문의 일시</th>
          <td>{{data.createat}}</td>
        </tr>
        <tr style="height: 80px">
          <th>답변 상태</th>
          <td v-if="data['admin_id']">답변완료</td>
          <td v-else>답변대기</td>
          <th>답변 일시</th>
          <td v-if="data.replydate">{{data.replydate}}</td>
          <td v-else>-</td>
        </tr>
        <tr style="height: 80px">
          <th colspan="1">제목</th>
          <td colspan="3">{{data.title}}</td>
        </tr>
        <tr style="height: 200px">
          <th colspan="1">문의 내용</th>
          <td colspan="3">{{data.content}}</td>
        </tr>
        <tr  style="height: 200px">
          <th colspan="1">답변 내용</th>
          <td colspan="3" v-if="data.reply">{{data.reply}}</td>
          <td colspan="3" v-else>-</td>
        </tr>
      </table>
      <div class="menu">
        <div class="btn_list">
          <button @click="goList">목록</button>
        </div>
        <div class="btn_crud" v-if="permission">
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
      qnaindex: null,
      permission: false,
      data: ''
    }
  },
  created () {
    this.getQna(this.$route.params.index)
  },
  methods: {
    getQna (n) {
      this.qnaindex = n
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
          console.log(err)
          alert('로그인이 만료되었습니다. 다시 로그인해주세요')
          this.$router.push('/')
        })
    },
    goList () {
      this.$router.push('/qna')
    },
    setDelete () {
      if (confirm('해당 문의를 삭제하시겠습니까?')) {
        this.$axios.delete('http://localhost:9000/api/qna/' + this.qnaindex)
          .then((res) => {
            alert('삭제되었습니다.')
            this.$router.push('/qna')
          })
          .catch((err) => {
            console.log(err)
            alert('로그인이 만료되었습니다. 다시 로그인해주세요')
            this.$router.push('/')
          })
      }
    },
    setUpdate () {
      this.$router.push({name: 'editQna', params: {data: this.data}})
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
</style>
