<template>
  <div class="wrap">
    <div class="container">
      <div class="logo">
        <router-link to="/" class="navbar-brand">
          <span class="title">{{ logo.title }}</span>
          <img :src="logo.src" :alt="logo.title">
        </router-link>
      </div>
      <div class="item">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item :index="item.id" v-for="item in navList" :key="item.id">
                 {{item.val}}
          </el-menu-item>
        </el-menu>
      </div>
      <div class="">
        <!-- 入口组件 -->
        <TheEntry/>
      </div>
    </div>
  </div>
</template>

<script>
import TheEntry from '@/components/layouts/TheEntry'
export default {
  data () {
    return {
      activeIndex: '1',
      logo: {
        src: require('@/assets/image/logo.png'),
        title: 'HDMOOC'
      },
      navList: [{id: '1', val: '首页'}, {id: '2', val: '课程'}]
    }
  },
  name: 'TheHeader',
  components: {
    TheEntry
  },
  methods: {
    handleSelect (key, keyPath) {
      switch (key[0]) {
        case '1': this.$router.push('/'); break
        case '2': this.$router.push('/course'); break
        case '3': this.$router.push('/course/video'); break
      }
    }
  },
  mounted () {
    try {
      if (this.$route.name.toLowerCase().includes('course')) {
        this.activeIndex = '2'
      } else if (this.$route.name.toLowerCase().includes('forum')) {
        this.activeIndex = '3'
      } else {
        this.activeIndex = '1'
      }
    } catch (e) {
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrap
    box-shadow: 0 4px 8px 0 rgba(7,17,27,.1)
    width:100%
    background-color: #fff
    .container
      display flex
      width: 1200px
      height: 60px
      padding 0 10px
      background-color: #fff
      margin: 0 auto
      overflow hidden
      .item
        flex 1
      .logo
        position relative
        z-index 20
        height 60px
        overflow hidden
        .navbar-brand
          width 68px
          height 100%
          display block
          overflow hidden
          .title
            display none
          img
            width auto
            height 50px
            margin-top 5px
</style>
