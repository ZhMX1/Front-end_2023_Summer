import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=>import('../views/ImageSlideTest.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/heat',
    name:'heat',
    component: () => import(/* webpackChunkName: "about" */ '../zbh/heat.vue')
  },{
    path:'/testheat',
    name:'testheat',
    component: ()=>import('../zbh/test_heat.vue')
  },
  {
    path: '/usermanage',
    name: 'userManage',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserManage/UserManage.vue')
  },
  {
    path: '/userdetail',
    name: 'userDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserManage/UserDetail.vue')
  },{
    path:'/orderdetail',
    name:'orderDetail',
    component: ()=>import('../views/UserManage/OrderDetail.vue')
  },
  {
    path:'/room_details',
    name:'room_details',
    component: ()=>import('../zbh/room_details.vue')
  },{
    path:'/side_bar',
    name:'side_bar',
    component: ()=>import('../zbh/sidebar.vue')
  },
  {
    path:'/top_bar',
    name:'top_bar',
    component: ()=>import('../zbh/topbar.vue')
  },
  {
    path:'/client_list',
    name:'client_list',
    component: ()=>import('../zbh/client_list.vue')
  },{
    path:'/test',
    name:'ImageSlideTest2',
    component: HomeView
  }
  ,
  {
    path: '/addcompany',
    name:'addcompany',
    component: ()=>import('../zbh/AddCompany.vue')
  },{
    path: '/addorder',
    name:'addorder',
    component: ()=>import('../views/UserManage/addOrder.vue')
  },
  {
    path:'/orderlist',
    name:'OrderList',
    component: ()=>import('../components/OrderList.vue')
  },
  {
    path:'/orderdetailallot',
    name:'OrderDetailAllot',
    component: ()=>import('../components/OrderDetailAllot.vue')
  },
  {
    path:'/AllocateOrder',
    name:'AllocateOrder',
    component: ()=>import('../views/AllocateOrder.vue')
  },
  {
    path:'/guestOrder',
    name:'guestOrder',
    component: ()=>import('../views/guest_order.vue')
  },
  {
    path:'/guestOrderDetail',
    name:'guestOrderDetail',
    component: ()=>import('../components/guest_OrderDetail.vue')
  },
  {
    path:'/filter_page',
    name:'filterpage',
    component:()=>import('../zbh/filter_page.vue')
  },
  {
    path:'/guestInvite',
    name:'guestInvite',
    component: ()=>import('../views/guest_invite.vue')
  },
  {
    path:'/RepairHistory',
    name:'RepairHistory',
    component: ()=>import('../views/repairman_history_order.vue')
  },
  {
    path:'/guestHome',
    name:'guestHome',
    component: ()=>import('../views/guest_home.vue')
  },
  {
    path:'/manageHome',
    name:'manageHome',
    component: ()=>import('../views/ManageHome.vue')
  },
  {
    path:'/repairmanSchedule',
    name:'repairmanSchedule',
    component: ()=>import('../components/repairmanSchedule.vue')
  },
  {
    path:'/RepairmanTimetable',
    name:'RepairmanTimetable',
    component: ()=>import('../views/RepairmanTimetable.vue')
  }
]

const router = new VueRouter({
  mode : 'history',
  routes
})

export default router
