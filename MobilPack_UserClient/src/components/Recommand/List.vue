<template>
  <div id="center">
    <div class="title">
      <h1>| 추천장소</h1>
      <h3>HOME > 추천장소</h3>
    </div>
    <div class="search">
      <ul>
        <li>
          <span>카테고리</span>
          <select v-model="tmp.category">
            <option value="">전체</option>
            <option value="관광지">관광지</option>
            <option value="맛집">맛집</option>
            <option value="숙소">숙소</option>
          </select>
        </li>
        <li style="width: calc(100% - 370px);">
          <span>장소명</span>
          <input type="text" v-model="tmp.title">
        </li>
      </ul>
      <button @click="getSearch">검색</button>
    </div>
    <div class="cont_inner">
      <p>| 검색 결과</p>
      <ul class="search">
        <li class="result" v-for="post of List" :key="post.index" @click="getRecommendPost(post.postindex)">
          <img v-if="post.thumbnail != null" :src="post.thumbnail" alt="Thumbnail"/>
          <img v-else src="../../assets/images/temp.jpg" alt="none image">
          <div class="content">
            <div class="title">
              <div class="category">{{post.category}}</div>
              <span class="title">{{post.title}}</span>
            </div>
            <span class="content">{{post.content}}</span>
            <span class="tag">{{post.tag}}</span>
          </div>
        </li>
      </ul>
      <div class="paging">
        <a class ="pagingFirst"  @click="getNextBeforePage('0')"/>
          <ul v-for="(n,index) in paging()" v-bind:key="index" @click="getPage(n)">
            <li  v-if="page !== n" class = "Nothere">{{n}}</li>
            <li v-else class="active">{{n}}</li>
          </ul>
        <a class="pagingLast" @click="getNextBeforePage('1')"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.getList()
  },
  data () {
    return {
      List: [],
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      tmp: {
        title: '',
        category: ''
      },
      Search: {
        title: '',
        category: ''
      },
      endpage: null,
      postcount: null,
      paging: function () {
        var pagenumber = []
        for (var i = 1; i <= this.endpage; i++) {
          pagenumber.push(i)
        }
        return pagenumber
      }
    }
  },
  methods: {
    getSearch () {
      this.Search = this.tmp
      this.page = 1
      this.List = []
      this.getList()
    },
    getList (n) {
      this.$axios.get('http://localhost:9000/api/post/search', {
        params: {
          page: n === undefined ? this.page : n,
          name: this.Search.title,
          count: 20,
          category: this.Search.category
        }})
        .then((res) => {
          this.List = []
          for (let i of res.data.result) {
            if (i.content.length > 120) {
              i.content = i.content.substr(0, 120) + '...'
            }
            this.List.push(i)
          }
          this.endpage = parseInt(res.data.count / 20)
          this.endpage += (res.data.count % 20) ? 1 : 0
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
    async getPage (n) {
      if (this.page !== n) {
        await this.getList(n)
        this.page = n
        this.$router.push({name: this.$route.name, query: {page: n}})
      }
    },
    getNextBeforePage (n) {
      if (n === '0' && this.page > 1) {
        this.getPage(this.page - 1)
      } else if (n === '1' && this.currentpage < this.endpage) {
        this.getPage(this.page + 1)
      }
    },
    getRecommendPost (n) {
      this.$router.push({path: this.$route.path + '/' + n})
    }
  }
}
</script>

<style scoped>

.cont_inner li.result{
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: center;
  padding: 10px 10px;
  width: 100%;
  height: 150px;
  margin-top: 10px;
  border: solid 1px #ddd;
  cursor: pointer;
}
.cont_inner li div.content{
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  width: 100%;
  height: 100%;
  position: relative;
}
.cont_inner li img {
  width: 150px;
  height: 128px;
  overflow: hidden;
  border: solid 1px #ddd;
}
.cont_inner li div.title {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.cont_inner li span.title {
  font-weight: bold;
  margin-left: 10px;
}
.cont_inner li span.content {
  position: absolute;
  top: 40px;
  width: 80%;
  margin-top: 10px;
}
.cont_inner li span.tag {
  position: absolute;
  bottom: 10px;
}
.cont_inner li div.category {
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
