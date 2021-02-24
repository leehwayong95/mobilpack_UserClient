import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import Signin from '@/components/Login/Signin'
import topbar from '@/components/topbar'
import Notice from '@/components/Notice/Notice'
import Details from '@/components/Notice/Details'
import recommands from '@/components/Recommand/List'
import recommandDetail from '@/components/Recommand/Detail'
import infoedit from '@/components/My/info'
import Qna from '@/components/Qna/QnaList'
import WriteQna from '@/components/Qna/WriteQna'
import QnaViewer from '@/components/Qna/QnaViewer'

import VueCookie from 'vue-cookie'
import axios from 'axios'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/main',
      name: 'admin',
      components: {
        top: topbar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/notice',
      name: 'Notice',
      components: {
        default: Notice,
        top: topbar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/details',
      name: 'Details',
      components: {
        default: Details,
        top: topbar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/recommands',
      name: 'recommands',
      components: {
        default: recommands,
        top: topbar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/recommands/:index',
      name: 'recommandsDetail',
      components: {
        default: recommandDetail,
        top: topbar
      },
      pros: true,
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/qna',
      name: 'Qna',
      components: {
        default: Qna,
        top: topbar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/qna/:index',
      name: 'QnaViewer',
      components: {
        default: QnaViewer,
        top: topbar
      },
      pros: true,
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/write',
      name: 'writeQna',
      components: {
        default: WriteQna,
        top: topbar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/edit/:index',
      name: 'editQna',
      components: {
        default: WriteQna,
        top: topbar
      },
      pros: true,
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      components: {
        default: infoedit,
        top: topbar
      },
      beforeEnter: (to, from, next) => {
        checklogin(to, from, next)
      }
    }
  ]
})

function checklogin (to, from, next) {
  let token = VueCookie.get('Authorization')
  if (token === '' || token === null) {
    alert('로그인이 필요한 기능입니다.')
    next('/')
  } else {
    axios.defaults.headers.common['Authorization'] = token
    next()
  }
}

export default router
