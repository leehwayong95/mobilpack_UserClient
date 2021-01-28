<template>
  <div id='center'>
    <div class="title">
      <h1>| 문의목록</h1>
      <h3>home > 문의목록</h3>
    </div>
    <div class="search">
      <ul>
        <li>
          <span>문의 유형</span>
          <select v-model="category">
            <option value="">전체</option>
            <option value="1">이용</option>
            <option value="2">오류</option>
            <option value="3">기타</option>
          </select>
        </li>
        <li>
          <span>제목</span>
          <input type="text" v-model="title">
        </li>
        <li class ="date">
          <span>문의 일시</span>
          <p class="date">
            <input type="date" v-model="min">
            <i>~</i>
            <input type="date" v-model="max">
          </p>
        </li>
        <li>
          <span>답변유무</span>
          <select v-model="answer">
            <option value="">전체</option>
            <option value="0">답변대기</option>
            <option value="1">답변완료</option>
          </select>
        </li>
      </ul>
      <button @click="getList">검색</button>
    </div>
    <div class="writeQna">
      <button @click="writeQna">문의 등록</button>
    </div>
    <div class="cont_inner">
      <table>
        <colgroup>
          <col width="5%">
          <col width="10%">
          <col width="20%">
          <col width="20%">
          <col width="15%">
          <col width="10%">
          <col width="20%">
        </colgroup>
        <tr>
          <th rowspan="2">No.</th>
          <th colspan="3">문의 정보</th>
          <th colspan="3">답변 정보</th>
        </tr>
        <tr>
          <th scope="col">문의 유형</th>
          <th scope="col">문의 제목</th>
          <th scope="col">문의 일시</th>
          <th scope="col">답변 유무</th>
          <th scope="col">답변자</th>
          <th scope="col">답변 일시</th>
        </tr>
        <tr v-for="(post,index) in List" v-bind:key="index" @click="view(post.qnaindex)">
          <td>{{((page-1) * 20) + (index+1)}}</td>
            <td v-if="post.category == 1">이용</td>
            <td v-else-if="post.category == 2">오류</td>
            <td v-else-if="post.category == 3">기타</td>
          <td>{{post.title}}</td>
          <td>{{post.createat}}</td>
            <td v-if="post['admin_name'] == null">답변대기</td>
            <td v-else>답변완료</td>
            <td v-if="post['admin_name'] == null"> - </td>
            <td v-else>{{post['admin_name']}}</td>
            <td v-if="post['admin_name'] == null"> -</td>
            <td v-else>{{post.replydate}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      List: null,
      category: '',
      title: '',
      min: '',
      max: '',
      answer: '',
      page: 1,
      endpage: null
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.$axios.patch('http://localhost:9000/api/qna/search', {
        category: this.category,
        title: this.title,
        min: this.min.replace(/-/g, ''),
        max: this.max.replace(/-/g, ''),
        answer: this.answer,
        page: this.page,
        count: 20
      })
        .then((res) => {
          this.List = res.data.list
          this.endpage = res.data.count / 20
          this.endpage += (res.data.count % 20) ? 1 : 0
        })
        .catch((err) => {
          console.log(err)
          alert('개발자가 열심히 일중입니다\n잠시 후 이용해주세요')
        })
    },
    writeQna () {
      this.$router.push('/write')
    },
    view (n) {
      this.$router.push('/qna/' + n)
    }
  }
}
</script>

<style scoped>
#center {
  overflow: auto;
}
</style>
