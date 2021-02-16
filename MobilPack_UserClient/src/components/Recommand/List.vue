<template>
  <div id="center">
    <div class="title">
        <h1>| 추천장소</h1>
    </div>
    <div class="search">
      <ul>
        <li>
          <span>카테고리</span>
          <select v-model="category">
            <option value="">전체</option>
            <option value="관광지">관광지</option>
            <option value="맛집">맛집</option>
            <option value="숙소">숙소</option>
          </select>
        </li>
        <li>
          <span>장소명</span>
          <input type="text">
        </li>
      </ul>
      <button>검색</button>
    </div>
    <div class="cont_inner">
      <ul>
        <li v-for="(post, index) in List" :key="index">
          <div class="item">
            <img v-if="post.thumbnail != null" :src="post.thumbnail" />
            <img v-else src="..\..\assets\images\temp.jpg" alt="none image">
            <div class="content">
              <span class="title">{{post.title}}</span>
              <span>{{post.content}}</span>
              <span class="tag">{{post.tag}}</span>
            </div>
            <div class="category">{{post.category}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.search_box {
  background-color:#fff;
  border: solid 1px #ddd;
  border-radius: 5px;
  width: 100%;
  height: 10%;
}
#center {
  overflow: scroll;
}
.cont_inner .item {
  height: 90%;
  width: 40px;
  margin-top: 10px;
}
.cont_inner li div.item {
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: center;
  padding: 10px 10px;
  width: 100%;
  height: 150px;
  border: solid 1px #ddd;
}
.cont_inner li div.item > div.content{
  display: flex;
  flex-direction: column;
  margin: 10px 10px
}
div.item img {
  width: 128px;
  height: 128px;
}
div.item span.title {
  font-weight: bold;
}
div.item div.category {
  position: absolute;
  right: 60px;
  color:#FFF;
  border: solid 1px #aaa;
  border-radius: 5px;
  width: 80px;
  height: 30px;
  background-color: #548235;
  text-align: center;
  padding: 5px 0;
}
</style>

<script>
export default {
  mounted () {
    this.getList()
  },
  data () {
    return {
      category: '',
      List: null,
      page: 1,
      endpage: null,
      postcount: null
    }
  },
  methods: {
    getList () {
      this.$axios.get('http://localhost:9000/api/post/search?page=1&name&count=20&category')
        .then((res) => {
          this.List = res.data.result
        })
    }
  }
}
</script>
