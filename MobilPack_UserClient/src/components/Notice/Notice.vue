<template>
    <div id='center'>
       <span class="title">
       <h1>| 공지사항</h1>
       <h3>HOME > 공지사항</h3>
    </span>
    <div class="search">
      <ul>
         <li>
         <span>제목</span>
         <input type="text" style = "width:1000px" v-model="title" v-on:keyup.enter="search">
         </li>
      </ul>
      <button  @click="search" >검색</button>
    </div>
      <div class="cont_inner">
      <p>| 검색 결과</p>
        <table class="search">
            <colgroup>
            <col width="5%">
            <col width="60%">
            <col width="20%">
            <col width="15%">
            </colgroup>
        <thead>
         <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성일시</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p,idx) in items" :key="idx" v-show="Currentpage" @click="rowClick(p.postindex)">
            <td>{{(listtotal+1)-(20*(page-1)+(idx+1))}}</td>
            <td id="title" v-if="'1'===p.topsetting">
              <span class="point">
                중요
              </span>
              {{ p.title }}
            </td>
            <td v-else id="title">{{ p.title }}</td>
            <td>{{ p.createat.substring(0,16) }}</td>
            <td>{{ p.viewcount }}</td>
          </tr>
        </tbody>
        </table>
        <div class="paging">
        <a class="pagingFirst"/>
          <ul v-for="(n,index) in paging()" :key="index" href="javascript:;" >
            <li v-if="page !== n" @click="ckpage(n)">{{n}}</li>
            <li v-else class="active">{{n}}</li>
          </ul>
        <a class="pagingLast"/>
      </div>
      </div>
    </div>
</template>

<script>
export default {
  mounted () {
    this.search()
  },
  data () {
    return {
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      items: [],
      listtotal: '',
      Currentpage: 1,
      Number: 20,
      language: '',
      title: '',
      fixtitle: '',
      start_page: '',
      end_page: '',
      paging: function () {
        var pageNumber = []
        this.start_page = 1
        for (var i = this.start_page; i <= this.end_page; i++) pageNumber.push(i)
        return pageNumber
      }
    }
  },
  methods: {
    search () {
      this.fixtitle = this.title
      this.page = 1
      this.$axios.get('http://localhost:9000//api/search', {
        params: {
          Currentpage: 1,
          Number: this.Number,
          title: this.title
        }})
        .then((res) => {
          this.items = res.data.result
          this.listtotal = res.data.count
          this.end_page = res.data.count / this.Number
          if (res.data.count % this.Number > 0) {
            this.end_page = this.end_page + 1
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    pagingMove () {
      this.$axios.get('http://localhost:9000//api/search', {
        params: {
          Currentpage: this.page,
          Number: this.Number,
          title: this.fixtitle
        }})
        .then((res) => {
          this.items = res.data.result
          this.listtotal = res.data.count
          this.end_page = res.data.count / this.Number
          if (res.data.count % this.Number >= 1) {
            this.end_page = this.end_page + 1
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    rowClick (postindex) {
      this.$router.push({
        path: '/details',
        query: {index: postindex}
      })
    },
    NoticeRegister () {
      this.$router.push('/noticeregistration')
    },
    ckpage (n) {
      if (this.page !== n) {
        this.page = n
        this.pagingMove()
      }
    }
  }
}
</script>

<style scoped>
.scroll {
  overflow: scroll;
  background: lightgray;
}
.insertbutton { /* 신규등록 버튼 */
  /* float: right; 신규등록 위치 */
  font-size: 15px;
  height: 40%;
  width: 90px;
}
.cont_inner > .indecate {
    width: 100%;
    height: 50px;
}
#content {
    position: fixed;
    left: 40px;
    top: 130px;
    width: calc(100% - 40px);
    height: calc(100%);
    padding: 10px 20px 200px 20px;
    background: #ffffff
}
.Currentpage {
  background-color: #3e61dc;
  color: #fff;
}
#center table td#title {
  text-align: left;
}
.point {
    background: rgb(245 44 44);
    font-size: 15px;
    height: 25px;
    width: 40px;
    padding: 2px;
    text-align: center;
    justify-content: center; /* dispaly로flex 를 지정하였고 이친구는 flex 내용물 들을 조정하는 문구입니다 */
    display: inline-flex;  /* inline 은 세로로 공간파일이 생긴다고 생각하면 됨 */
    border-radius: 5px;
    margin-right: 10px;
    color:aliceblue;
}
</style>
