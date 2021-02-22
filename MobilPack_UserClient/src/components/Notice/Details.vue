<template>
    <div id=center>
    <span class="title">
    <h1>HOME</h1>
    <h2>공지사항 > 공지 사항 상세</h2>
    </span>
    <section class="cont_inner">
        <table style="margin-top: 30px;">
        <colgroup>
        <col style="width: 100px;">
        <col style="width: 100px;">
        <col style="width: 150px;">
        <col style="width: 120px;">
        <col style="width: 50px;">
        <col style="width: 200px;">
        </colgroup>
         <tbody>
             <tr>
             <th >공지노출 구분</th><!-- colspan 뒤에 붙는 숫자는 테이블의 항목수입니다 -->
             <td v-if= "'1'=== items.topsetting" colspan="7">중요공지</td><!-- ex> colspan5는 5개가 (항목이)합쳐진 크기라고 보면됨  -->
             <td v-else colspan="7">일반공지</td>
             </tr>
             <tr>
             <th>제목</th>
             <td colspan="7">{{items.title}}</td>
             </tr>
             <tr>
             <th>등록일시</th>
             <td colspan="2">{{items.createat}}</td>
             <th>수정일시</th>
             <td colspan="2">{{items.updateat}}</td>
             <th>조회수</th>
             <td colspan="1">{{items.viewcount}}</td>
             </tr>
             <tr>
             <th>내용</th><!--  vertical-align 이친구가 내용을 위로 정렬해 줍니다  -->
             <td
             v-html="hypercontent"
             class="scroll"
             style="width:1340px; height:500px; vertical-align: top;"
             colspan="7"
             >
             </td>
             </tr>
         </tbody>
        </table><!--  padding이 내용과 버튼 사이간격을 벌려줍니다.  -->
        <div style="padding-top: 30px">
          <button class="leftbutton" @click="back">목록</button>
        </div>
    </section>
    </div>
</template>

<script>
export default
{
  mounted () {
    // 조회수 증가시키기
    this.$axios.get('http://localhost:9000/api/userplusviewcount', {params: {postindex: this.$route.query.index}})
      .then(res => {
        if (res.data === 'ok') {
        } else {
          console.log('조회수 오류 다시 설정 해주세요')
        }
      })
    // 게시글 가져오기
    this.$axios.get('http://localhost:9000/api/detail', {params: {postindex: this.$route.query.index}})
      .then((res) => {
        this.items = res.data
        this.postindex = this.$route.query.index
        this.hypercontent = res.data.content
        this.hypercontent = this.test(this.hypercontent)
        this.testcontent = res.data.content
        this.result = this.testcontent.match(this.hyperlink)
        console.log(this.items)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  data () {
    return {
      testcontent: '',
      items: [],
      postindex: '',
      hypercontent: '', // 본문 복사
      splittext: '',
      hyperlink: /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi, // url 정규식
      result: [], // 링크를 담은 배열
      maintext: [] // 본문을 담은 배열
    }
  },
  methods: {
    test (str) {
      return str.replaceAll('\n', '<br/>')
    },
    back () {
      this.$router.push('/notice')
    }
  }
}
</script>

<style scoped>
#content table tr { /* pointer라고 손가락 모양 나옴 default라고 해서 변화없는 모양 나옴*/
 cursor:default;
}
.btn {
  height: 50px; /* 테이블과 버튼 간격 */
}
.leftbutton {
  width: 100px;
  height: 30px;
}
#content table td {
    text-align: left;/* items 내용들 왼쪽 정렬 */
}
#content > .cont_inner {
    position: relative;
    min-height: calc(100% - 164px);
    margin-top: 20px;
    padding: 20px 30px 30px;/* 위아래 여백을 만들기 위해 앞에 20px 추가함 */
    background: #fff;
    border-radius: 5px;
}
.scroll {
  overflow: scroll;
  background: #fff;
}
</style>
