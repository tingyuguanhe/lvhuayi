import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/noticeManage/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/noticeManage/index'),
        meta: { title: '公告设置', icon: 'form' }
      }
    ]
  },

  {
    path: '/noticeManage',
    component: Layout,
    meta: {title: '', icon: 'form'},
    children: [
      {
        path: 'index',
        name: 'Notice',
        component: () => import('@/views/noticeManage/index'),
        meta: { title: '公告配置', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'createNotice',
        hidden: true,
        component: () => import('@/views/noticeManage/edit'),
        meta: { title: '新建公告', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: 'editNotice',
        hidden: true,
        component: () => import('@/views/noticeManage/edit'),
        meta: { title: '编辑公告', icon: 'form' }
      }
    ]
  },
  {
    path: '/customerServiceManage',
    component: Layout,
    meta: {title: '', icon: 'form'},
    children: [
      {
        path: 'index',
        name: 'customerServiceManage',
        component: () => import('@/views/customerServiceManage/index'),
        meta: { title: '客服管理', icon: 'form' }
      },
      {
        path: 'qsTypeManage',
        name: 'qsTypeManage',
        hidden: true,
        component: () => import('@/views/customerServiceManage/qsTypeManage/index'),
        meta: { title: '问题类型管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/guideSetting',
    component: Layout,
    meta: {title: '', icon: 'form'},
    children: [
      {
        path: 'index',
        name: 'guideSetting',
        component: () => import('@/views/guideSetting/index'),
        meta: { title: '指引配置', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'addGuide',
        hidden: true,
        component: () => import('@/views/guideSetting/edit'),
        meta: { title: '新建指引', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: 'editGuide',
        hidden: true,
        component: () => import('@/views/guideSetting/edit'),
        meta: { title: '编辑指引', icon: 'form' }
      }
    ]
  },
  {
    path: '/zhengwuSetting',
    component: Layout,
    meta: {title: '', icon: 'form'},
    children: [
      {
        path: 'index',
        name: 'zhengwuSetting',
        component: () => import('@/views/zhengwuSetting/index'),
        meta: { title: '政务配置', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'editZhengwu',
        hidden: true,
        component: () => import('@/views/zhengwuSetting/edit'),
        meta: { title: '编辑政务', icon: 'form' }
      }
    ]
  },
  {
    path: '/newsPublish',
    component: Layout,
    meta: {title: '', icon: 'form'},
    children: [
      {
        path: 'index',
        name: 'newsPublish',
        component: () => import('@/views/newsPublish/index'),
        meta: { title: '新闻下发', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'createNews',
        hidden: true,
        component: () => import('@/views/newsPublish/edit'),
        meta: { title: '新建新闻', icon: 'form' }
      },
      {
        path: 'edit/:id/:type',
        name: 'editNews',
        hidden: true,
        component: () => import('@/views/newsPublish/edit'),
        meta: { title: '编辑新闻', icon: 'form' }
      }
    ]
  },
  {
    path: '/videoManage',
    component: Layout,
    meta: {title: '', icon: 'form'},
    children: [
      {
        path: 'index',
        name: 'videoManage',
        component: () => import('@/views/videoManage/index'),
        meta: { title: '视频管理', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'editVideo',
        hidden: true,
        component: () => import('@/views/videoManage/edit'),
        meta: { title: '编辑视频', icon: 'form' }
      },
      {
        path: 'uploadVideo',
        name: 'uploadVideo',
        hidden: true,
        component: () => import('@/views/videoManage/uploadVideo'),
        meta: { title: '上传视频', icon: 'form' }
      }
    ]
  },
  {
    path: '/activityManage',
    component: Layout,
    meta: {title: '', icon: 'form'},
    children: [
      {
        path: 'index',
        name: 'activityManage',
        component: () => import('@/views/activityManage/index'),
        meta: { title: '活动管理', icon: 'form' }
      },
      {
        path: 'create',
        name: 'createActivity',
        hidden: true,
        component: () => import('@/views/activityManage/edit'),
        meta: { title: '新建活动', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: 'editActivity',
        hidden: true,
        component: () => import('@/views/activityManage/edit'),
        meta: { title: '编辑活动', icon: 'form' }
      }
    ]
  },
  {
    path: '/jingangSetting',
    component: Layout,
    meta: {title: '', icon: 'form'},
    children: [
      {
        path: 'index',
        name: 'jingangSetting',
        component: () => import('@/views/jingangSetting/index'),
        meta: { title: '金刚配置', icon: 'form' }
      }
    ]
  },
  {
    path: '/cipianSetting',
    component: Layout,
    meta: {title: '', icon: 'form'},
    children: [
      {
        path: 'index',
        name: 'cipianSetting',
        component: () => import('@/views/cipianSetting/index'),
        meta: { title: '瓷片配置', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'editCipian',
        hidden: true,
        component: () => import('@/views/cipianSetting/edit'),
        meta: { title: '编辑瓷片', icon: 'form' }
      }
    ]
  },
  {
    path: '/userManage',
    component: Layout,
    meta: {title: '', icon: 'form'},
    children: [
      {
        path: 'index',
        name: 'userManage',
        component: () => import('@/views/userManage/index'),
        meta: { title: '用户管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/userFeedbackManage',
    component: Layout,
    meta: {title: '', icon: 'form'},
    children: [
      {
        path: 'index',
        name: 'userFeedbackManage',
        component: () => import('@/views/userFeedbackManage/index'),
        meta: { title: '用户反馈', icon: 'form' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    meta: {title: '', icon: 'form'},
    children: [
      {
        path: 'index',
        name: 'setting',
        component: () => import('@/views/setting/index'),
        meta: { title: '设置', icon: 'form' }
      }
    ]
  },



  

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

