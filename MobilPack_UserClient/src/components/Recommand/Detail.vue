<template>
  <div id="center">
    <div class="title">
      <h1>| 추천장소 상세</h1>
      <h3>HOME > 추천장소 > 추천장소상세</h3>
    </div>
    <div class="cont_inner">
      <table>
        <colgroup>
          <col width="10%">
          <col width="40%">
          <col width="10%">
          <col width="40%">
          <col width="10%">
          <col width="40%">
        </colgroup>
        <tr>
          <th>장소명</th>
          <td colspan='5'>{{post.title}}</td>
        </tr>
        <tr>
          <th>주소</th>
          <td>{{post.address}}</td>
          <th>연락처</th>
          <td colspan='3'>{{post.phone}}</td>
        </tr>
        <tr>
          <th>운영시간</th>
          <td>{{runningdate}} {{post.opentime}}~{{post.closetime}}</td>
          <th>입장마감</th>
          <td>{{post.endtime}}</td>
          <th>휴무일</th>
          <td>{{pausedate}}</td>
        </tr>
        <tr class="map">
          <th>위치</th>
          <td colspan='5' style="item-align: center;">
            <naver-maps
              :mapOptions="mapOptions"
              :initLayers="initLayers"
              @load="onLoad"
              style="margin: 0 auto">
              <naver-marker :lat="mapOptions.lat" :lng="mapOptions.lng" @load="onMarkerLoaded"/>
              <!-- 네이버 지도에서 마커를 찍는다 -->
            </naver-maps>
          </td>
        </tr>
        <tr>
          <td style="border-bottom: none; padding: 20px" colspan="6" v-text="post.tag"></td>
        </tr>
        <tr>
          <td colspan='6' class="content">
            <span  v-text="post.content" style="white-space:pre-line;"></span>
            <div v-for="i of files" :key="i" >
              <img :src="i" alt="img" style="width: 20%;"/>
            </div>
          </td>
        </tr>
      </table>
      <div class="commentsBox">
        <h3>| 리뷰</h3>
        <div class="input_comments">
          <input type="text" class="input_text" placeholder="내용을 입력해주세요" v-model="review">
          <button @click="putUserReview">리뷰 작성</button>
        </div>
        <div class="comments">
          <ul>
            <li v-for="(i,index) in comments" :key="index">
              <div class="comment">
                <span class="name">{{i.name}}</span>
                <span class="content">{{i.content}}</span>
                <span class="date">
                  {{i.createat.split(' ')[0]}} {{i.createat.split(' ')[1].split(':')[0]}}:{{i.createat.split(' ')[1].split(':')[1]}}
                </span>
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
  updated () {
    this.map.setCenter({lat: parseFloat(this.location[0]), lng: parseFloat(this.location[1])})
    this.marker.setPosition({lat: parseFloat(this.location[0]), lng: parseFloat(this.location[1])})
  },
  watch: {
    review () {
      if (this.review.length > 100) {
        alert('리뷰는 100자까지 등록가능합니다.')
        this.review = this.review.substr(0, 100)
      }
    }
  },
  data () {
    return {
      post: '',
      comments: '',
      files: '',
      review: '',
      runningdate: null,
      pausedate: null,
      location: null,
      map: null, /* 지도를 사용하기 위해 map 객체를 생성 */
      marker: null, /* 마커를 조작하기 위해 marker 객체를 생성 */
      mapOptions: { /* 제주 시청을 기본값으로 설정함 */
        lat: 33.49959,
        lng: 126.53126,
        zoom: 16,
        zoomControl: false,
        mapTypeControl: false,
        draggable: false,
        pinchZoom: false,
        scrollWheel: false,
        keyboardShortcuts: false,
        disableDoubleTapZoom: true,
        disableDoubleClickZoom: true,
        disableTwoFingerTapZoom: true
      },
      initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH', 'CHINESE', 'JAPANESE']
    }
  },
  methods: {
    getPost () {
      this.$axios.get('http://localhost:9000/api/post/' + this.$route.params.index)
        .then((res) => {
          this.post = res.data.post
          /* 휴대폰 번호 정규식 */
          this.post.phone = this.post.phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3')
          /* 휴무일, 운영일 요일 구하기 */
          let runningDateBit = parseInt(res.data.post.openday, 10).toString(2).split('')
          /* 2진수 7자리 비트 맞추기 */
          for (let index = runningDateBit.length; index < 7; index++) {
            runningDateBit.unshift('0')
          }
          this.pausedate = []
          for (let bit of runningDateBit) {
            this.pausedate.push((bit === '1' ? '0' : '1'))
          }
          this.pausedate = this.getRunningDate(this.pausedate).join('')
          this.runningdate = this.getRunningDate(runningDateBit).join('')
          /* 댓글, file List 부여 */
          this.comments = res.data.comments
          this.files = res.data.files
          /* 네이버 지도 설정 */
          this.location = res.data.post.location.split(',')
          this.mapOptions.lat = parseFloat(this.location[0])
          this.mapOptions.lng = parseFloat(this.location[1])
        })
    },
    getRunningDate (runningDateBit) {
      let result = []
      let countinueDay = false
      /* 연속된 요일인지 아닌지 추가 */
      for (let index in runningDateBit) {
        if (countinueDay && runningDateBit[index] === '1') {
          if (result[result.length - 1] !== '~') {
            result.push('~')
          }
          if (index === (runningDateBit.length - 1).toString()) {
            result.push(this.getDay(index))
          }
        } else if (countinueDay && runningDateBit[index] === '0' && result[result.length - 1] === '~') {
          result.push(this.getDay(index - 1))
          countinueDay = false
        } else if (countinueDay && runningDateBit[index] === '0') {
          countinueDay = false
        } else if (!countinueDay && runningDateBit[index] === '1') {
          result.push(this.getDay(index))
          countinueDay = true
        }
        if (!countinueDay && result[result.length - 1] !== ', ' && result.length !== 0) {
          result.push(', ')
        }
      }
      /* 마지막 작업이 , 이면 제거하고 역순으로 리턴 */
      if (result[result.length - 1] === ', ') {
        result = result.splice(0, result.length - 1).reverse()
      } else {
        result = result.reverse()
      }
      /* 단일 요일일 경우 풀네임으로 적용 */
      console.log(result.length)
      for (let i in result) {
        if (result[parseInt(i) + 1] === ', ' || (parseInt(i) === result.length - 1 && result[parseInt(i) - 1] === ', ')) {
          result[i] = result[i] + '요일'
        }
      }
      return result
    },
    getDay (index) {
      let result = {
        0: '일',
        1: '토',
        2: '금',
        3: '목',
        4: '수',
        5: '화',
        6: '월'
      }
      return result[parseInt(index)]
    },
    putUserReview () {
      this.$axios.put('http://localhost:9000/api/post/' + this.$route.params.index + '?content=' + this.review)
        .then((res) => {
          if (res.data.status === true) {
            this.getPost()
            this.review = ''
          }
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
    onMarkerLoaded (vue) { /** 마커를 이용하기 위해 마커 객체 생성 */
      this.marker = vue.marker
    },
    onLoad (vue) { /* 네이버 지도 api 사용을 위해 객체 생성 */
      this.map = vue
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
#center table td {
  text-align: left;
}
#center table td.content {
  padding: 20px;
}
#center table tr.map {
  height: 500px;
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
  position: absolute;
  left: 100px;
}
div.comment span.date {
  position: absolute;
  right: 10px;
  width: fit-content;
}
div#vue-naver-maps {
  width: 100%;
  height: 100%;
}
</style>
