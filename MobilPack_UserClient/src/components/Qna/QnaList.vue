<template>
  <div id='center'>
    <div class="title">
      <h1>| 문의사항</h1>
      <h3>HOME > 문의사항</h3>
    </div>
    <div class="search">
      <ul>
        <li>
          <span>문의 유형</span>
          <select v-model="tmp.category">
            <option value="">전체</option>
            <option value="1">이용</option>
            <option value="2">오류</option>
            <option value="3">기타</option>
          </select>
        </li>
        <li>
          <span>제목</span>
          <input type="text" v-model="tmp.title">
        </li>
        <li class ="date">
          <span>문의 일시</span>
          <p class="date">
            <input type="date" v-model="tmp.min">
            <i>~</i>
            <input type="date" v-model="tmp.max">
          </p>
        </li>
        <li>
          <span>답변유무</span>
          <select v-model="tmp.answer">
            <option value="">전체</option>
            <option value="0">답변대기</option>
            <option value="1">답변완료</option>
          </select>
        </li>
      </ul>
      <button @click="getSearch">검색</button>
    </div>
    <div class="cont_inner">
      <p>| 검색 결과</p>
      <button @click="writeQna">문의 등록</button>
      <table class="search">
        <colgroup>
          <col width="5%">
          <col width="10%">
          <col width="20%">
          <col width="20%">
          <col width="15%">
          <col width="10%">
          <col width="20%">
        </colgroup>
        <tr style="cursor: initial;">
          <th>No.</th>
          <th scope="col">문의 유형</th>
          <th scope="col">문의 제목</th>
          <th scope="col">문의 일시</th>
          <th scope="col">답변 유무</th>
          <th scope="col">답변자</th>
          <th scope="col">답변 일시</th>
        </tr>
        <tr v-for="(post,index) in List" v-bind:key="index" @click="view(post.qnaindex)">
          <td>{{totalPostCount - (index + (page-1)*20)}}</td>
            <td v-if="post.category == 1">이용</td>
            <td v-else-if="post.category == 2">오류</td>
            <td v-else-if="post.category == 3">기타</td>
          <td class="title" v-if="post.title.length > 35">{{post.title.substr(0,35)}}...</td>
          <td class="title" v-else>{{post.title}}</td>
          <td>{{post.createat.split(" ")[0]}} {{post.createat.split(" ")[1].substr(0, 5)}}</td>
            <td v-if="post.replydate == null">답변대기</td>
            <td v-else style="color: blue;">답변완료</td>
            <td v-if="(post['admin_name'] == null ) && (post.replydate == null)"> - </td>
            <td v-else-if="(post['admin_name'] == null) && (post.replydate != null)"> 삭제된 관리자 </td>
            <td v-else>{{post['admin_name']}}</td>
            <td v-if="post.replydate == null"> -</td>
            <td v-else>{{post.replydate.split(" ")[0]}} {{post.replydate.split(" ")[1].substr(0, 5)}}</td>
        </tr>
      </table>
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

<style scoped>
#center td.title {
  text-align: left;
}
</style>

<script>
export default {
  data () {
    return {
      List: null,
      Search: {
        category: '',
        title: '',
        min: '',
        max: '',
        answer: ''
      },
      tmp: {
        category: '',
        title: '',
        min: '',
        max: '',
        answer: ''
      },
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      totalPostCount: '',
      endpage: null,
      paging: function () {
        var pagenumber = []
        for (var i = 1; i <= this.endpage; i++) {
          pagenumber.push(i)
        }
        return pagenumber
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getSearch () {
      // 동작여부 Flag
      let doFlag = true
      // 조건 맞는지 확인
      if (this.tmp.min && this.tmp.max) { // min, max 둘다 주어졌을때만 동작
        if (this.tmp.min > this.tmp.max) {
          doFlag = false
        }
        if (doFlag) {
          // 최소기간에서 1년후 기간 객체 이용해서 생성
          let minAfterYear = this.$moment(this.tmp.min).add(12, 'months').add(1, 'd')
          minAfterYear = this.$moment(minAfterYear).format('YYYY-MM-DD')
          // 비교
          if (this.tmp.max > minAfterYear) {
            doFlag = false
          }
        }
      }
      // Flag에 따라 동작
      if (doFlag) {
        this.Search = this.tmp
        this.page = 1
        this.getList()
      } else {
        alert('유효하지 않은 날짜입니다.\n날짜간격은 12개월 이내로, 시작일은 종료일보다 앞서서 설정해주세요')
        this.tmp.max = ''
      }
    },
    getList () {
      this.$axios.patch('http://localhost:9000/api/qna/search', {
        category: this.Search.category,
        title: this.Search.title,
        min: this.Search.min.replace(/-/g, ''),
        max: this.Search.max.replace(/-/g, ''),
        answer: this.Search.answer,
        page: this.page,
        count: 20
      })
        .then((res) => {
          this.List = res.data.list
          this.totalPostCount = res.data.count
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
    writeQna () {
      this.$router.push('/write')
    },
    view (n) {
      this.$router.push('/qna/' + n)
    },
    getPage (n) {
      if (this.page !== n) {
        this.page = n
        this.$router.push({name: this.$route.name, query: {page: n}})
        this.getList()
      }
    },
    getNextBeforePage (n) {
      if (n === '0' && this.page > 1) {
        this.getPage(this.page - 1)
      } else if (n === '1' && this.page < this.endpage) {
        this.getPage(this.page + 1)
      }
    }
  }
}
</script>
