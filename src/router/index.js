import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Course from '@/pages/Course'
import CourseVideo from '@/pages/CourseVideo'
import ForgetPassword from '@/pages/Forget'
import PersonalCenter from '@/pages/PersonalCenter'
import PersonalCourse from '@/pages/PersonalCourse'
import PersonalFav from '@/pages/PersonalFav'
import UserInterceptor from './interceptors/user'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/course',
      name: 'course',
      component: Course
    },
    {
      path: '/course/video/:id',
      name: 'courseVideo',
      component: CourseVideo
    },
    {
      path: '/student/forget',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path: '/student/personalCenter',
      name: 'PersonalCenter',
      meta: {
        requiresUser: true
      },
      component: PersonalCenter
    },
    {
      path: '/student/personalCourse',
      name: 'PersonalCourse',
      meta: {
        requiresUser: true
      },
      component: PersonalCourse
    },
    {
      path: '/student/personalFav',
      name: 'PersonalFav',
      meta: {
        requiresUser: true
      },
      component: PersonalFav
    }
  ]
})
router.beforeEach(UserInterceptor)
export default router
