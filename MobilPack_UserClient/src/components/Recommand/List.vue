<template>
  <div id="center">
    <div class="title">
        <h1>| 추천장소</h1>
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
      <ul>
        <li v-for="post in List" :key="post.index" @click="getRecommendPost(post.postindex)">
          <div class="item">
            <img v-if="post.thumbnail != null" :src="post.thumbnail" alt="Thumbnail"/>
            <img v-else src="..\..\assets\images\temp.jpg" alt="none image">
            <div class="content">
              <span class="title">{{post.title}}</span>
              <span class="content">{{post.content}}</span>
              <span class="tag">{{post.tag}}</span>
            </div>
            <div class="category">{{post.category}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="paging">
        <a class ="pagingFirst"  @click="getNextBeforePage('0')"/>
          <ul v-for="(n,index) in paging()" v-bind:key="index" @click="getPage(n)">
            <li  v-if="page !== n" class = "Nothere">{{n}}</li>
            <li v-else class="here">{{n}}</li>
          </ul>
        <a class="pagingLast" @click="getNextBeforePage('1')"/>
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
      page: 1,
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
    },
    getList () {
      this.$axios.get('http://localhost:9000/api/post/search', {
        params: {
          page: this.page,
          name: this.Search.title,
          count: 20,
          category: this.Search.category
        }})
        .then((res) => {
          for (let i of res.data.result) {
            if (i.content.length > 120) {
              i.content = i.content.substr(0, 120) + '...'
            }
            this.List.push(i)
          }
          this.endpage = res.data.count / 20
          this.endpage += (res.data.count % 20) ? 1 : 0
        })
    },
    getPage (n) {
      if (this.currentpage !== n) {
        this.currentpage = n
        this.getUserList()
      }
    },
    getNextBeforePage (n) {
      if (n === '0' && this.currentpage > 1) {
        this.currentpage--
      } else if (n === '1' && this.currentpage < this.endpage) {
        this.currentpage++
      }
      this.getUserList()
    },
    getRecommendPost (n) {
      this.$router.push({path: this.$route.path + '/' + n})
    }
  }
}
</script>

<style scoped>
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
  position: relative;
  padding: 10px 10px;
  width: 100%;
  height: 150px;
  border: solid 1px #ddd;
  cursor: pointer;
}
.cont_inner li div.item > div.content{
  display: flex;
  flex-direction: column;
  margin: 10px 10px
}
div.item img {
  width: 128px;
  height: 128px;
  border: solid 1px #ddd;
}
div.item span.title {
  font-weight: bold;
  position: absolute;
  top: 10px;
}
div.item span.content {
  position: absolute;
  top:40px;
}
div.item span.tag {
  position: absolute;
  bottom: 10px;
}
div.item div.category {
  position: absolute;
  right: 10px;
  top: 10px;
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
