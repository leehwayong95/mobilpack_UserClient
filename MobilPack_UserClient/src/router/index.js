import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import Signin from '@/components/Login/Signin'
import topbar from '@/components/topbar'
import Notice from '@/components/Notice/Notice'
import Details from '@/components/Notice/Details'
import recommands from '@/components/Recommand/List'
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
      }
    },
    {
      path: '/details',
      name: 'Details',
      components: {
        default: Details,
        top: topbar
      }
    },
    {
      path: '/recommands',
      name: 'recommands',
      components: {
        default: recommands,
        top: topbar
      }
    },
    {
      path: '/qna',
      name: 'Qna',
      components: {
        default: Qna,
        top: topbar
      }
    },
    {
      path: '/qna/:index',
      name: 'QnaViewer',
      components: {
        default: QnaViewer,
        top: topbar
      }
    },
    {
      path: '/write',
      name: 'writeQna',
      components: {
        default: WriteQna,
        top: topbar
      }
    },
    {
      path: '/edit/:index',
      name: 'editQna',
      components: {
        default: WriteQna,
        top: topbar
      },
      pros: true
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      components: {
        default: infoedit,
        top: topbar
      }
    }
  ]
})

function checklogin (to, from, next) {
  let token = VueCookie.get('authorization')
  if (token === '' || token === null) {
    alert('로그인이 필요한 기능입니다.')
    next('/')
  } else {
    axios.defaults.headers.common['authorization'] = token
    next()
  }
}

export default router
