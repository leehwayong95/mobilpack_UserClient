<template>
    <div class = "scroll" id='content'>
       <span class="title">
       <h1>HOME</h1>
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
    <div>
      <div class="cont_inner">
        <table>
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
            <td>{{(20*(Currentpage-1)+(idx+1))}}</td>
            <td class="row" v-if="'1'===p.topsetting">
              <div class="imp">
                중요
              </div>
              {{ p.title }}
            </td>
            <td v-else>{{ p.title }}</td>
            <td>{{ p.createat }}</td>
            <td>{{ p.viewcount }}</td>
          </tr>
        </tbody>
        </table>
        <div class="paging">
        <a class="pagingFirst"/>
          <ul v-for="(n,index) in paging()" :key="index" href="javascript:;" >
            <li @click="ckpage(`${n}`)">{{n}}</li>
          </ul>
        <a class="pagingLast"/>
      </div>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  mounted () {
    this.$axios.get('http://localhost:9000//api/search', {params: { Currentpage: 1, Number: this.Number, title: this.title }})
      .then((res) => {
        console.log(res)
        console.log(res.data.count)
        this.items = res.data.result
        this.end_page = res.data.count / this.Number // count:list 수 를 20으로 나누어서 몇 페이지 필요한지 계산
        if (res.data.count % this.Number >= 1) {
          this.end_page = this.end_page + 1
        } else {
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  data () {
    return {
      items: [],
      listtotal: '',
      Currentpage: 1,
      Number: 20,
      language: '',
      title: '',
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
      this.$axios.get('http://localhost:9000//api/search', {
        params: {
          Currentpage: this.Currentpage,
          Number: this.Number,
          title: this.title
        }})
        .then((res) => {
          this.items = res.data.result
          this.listtotal = res.data.count
          this.end_page = res.data.count / this.Number
          if (res.data.count % this.Number >= 0) {
            this.end_page = this.end_page + 1
          } else {
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
      if (this.Currentpage !== n) {
        this.Currentpage = n
        this.search()
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
.imp { /* 제목 앞에 붙는 중요빨간 표지 */
  width: 30px;
  height: 20px;
  background-color: red;
  color: #fff;
  float: left; /* 방향 왼쪽으로 이동 */
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
</style>
