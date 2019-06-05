// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'styles/reset.css'
import 'styles/iconfont.css'
import 'swiper/dist/css/swiper.css'
import 'element-ui/lib/theme-chalk/index.css'
import fastClick from 'fastclick'
import store from './store'
import api from './api/api'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Button,
  Card,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Dialog,
  Form,
  FormItem,
  Input,
  Autocomplete,
  Pagination,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabPane,
  Steps,
  Step,
  Progress
} from 'element-ui'

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper/* { default global options } */)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Button)
Vue.use(Card)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Autocomplete)
Vue.use(Pagination)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Progress)
Vue.prototype.$api = api
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
