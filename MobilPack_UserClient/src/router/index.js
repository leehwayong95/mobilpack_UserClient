import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import Signin from '@/components/Login/Signin'
import topbar from '@/components/topbar'
import Notice from '@/components/Notice/Notice'
import recommands from '@/components/Recommand/List'
import infoedit from '@/components/My/info'
import Qna from '@/components/Qna/QnaList'
import WriteQna from '@/components/Qna/WriteQna'
import QnaViewer from '@/components/Qna/QnaViewer'

Vue.use(Router)

export default new Router({
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
