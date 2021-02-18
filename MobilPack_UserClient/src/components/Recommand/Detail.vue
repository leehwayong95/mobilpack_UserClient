<template>
  <div id="center">
    <div class="title">
      <h1>| 추천장소 상세</h1>
    </div>
    <div class="cont_inner">
      <table>
        <tr>
          <th>장소명</th>
          <td colspan='5'>{{Post.title}}</td>
        </tr>
        <tr>
          <th>주소</th>
          <td>{{Post.address}}</td>
          <th>연락처</th>
          <td colspan='3'>{{Post.phone}}</td>
        </tr>
        <tr>
          <th>운영시간</th>
          <td>데이터 만져야함</td>
          <th>입장마감</th>
          <td>{{Post.endtime}}</td>
          <th>휴무일</th>
          <td>이것도 데이터 만저야함</td>
        </tr>
        <tr>
          <th>위치</th>
          <td colspan='5'>{{Post.location}}</td>
        </tr>
        <tr>
          <td colspan='6' v-html="Post.content"></td>
        </tr>
      </table>
      <div class="commentsBox">
        <h3>| 리뷰</h3>
        <div class="input_comments">
          <input type="text" class="input_text" placeholder="내용을 입력해주세요">
          <button>리뷰 작성</button>
        </div>
        <div class="comments">
          <ul>
            <li v-for="(i,index) in comments" :key="index">
              <div class="comment">
                <span class="name">{{i.name}}</span>
                <span class="content">{{i.content}}</span>
                <span class="date">{{i.date}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.getPost()
  },
  data () {
    return {
      Post: '',
      comments: [{name: '이화용', content: '아 정말구리네', date: '2020-02-17 14:20'}, {name: '이화용', content: '아 정말구리네', date: '2020-02-17 14:20'}]
    }
  },
  methods: {
    getPost () {
      this.$axios.get('http://localhost:9000/api/post/' + this.$route.params.index)
        .then((res) => {
          this.Post = res.data
        })
    }
  }
}
</script>
<style scoped>
#center {
  overflow: auto;
}
#center tr:hover {
  background: initial;
  cursor:initial;
}
div.commentsBox {
  margin: 10px 0 ;
}
div.input_comments{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
}
div.input_comments input.input_text {
  border: solid 1px #ddd;
  margin: 10px 0;
  width: calc(100% - 140px);
  height: 60px;
}
div.input_comments button {
  width: 120px;
  height: 60px;
  margin: 10px 0;
}
div.comment {
  border: solid 1px #ddd;
  height: 40px;
  margin: 5px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}
div.comment span {
  margin: 0 5px;
}
div.comment span.name {
  font-weight: bold;
  margin-left: 20px;
}
div.comment span.content {
  margin-left: 20px;
}
div.comment span.date {
  position: absolute;
  right: 10px;
}
</style>
