<template>
  <div class="left">
    <ul ref="menu">
      <li>
        <router-link to="/student/personalCenter">个人资料</router-link>
      </li>
      <li>
        <router-link to="/student/personalCourse">课程管理</router-link>
      </li>
      <li>
        <router-link to="/student/personalFav">收藏管理</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    'index': Number
  },
  name: 'PersonalMenu',
  mounted: function () {
    let Lis = this.$refs.menu.children
    for (let i = 0; i < Lis.length; i++) {
      if (i === this.index) {
        Lis[i].className = 'active'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .active
    background: #fff
    border-left: 2px solid #717171
  .left
    width: 210px
    float: left
    background: #f8f8f8
    border: 1px solid #eaeaea
    overflow: hidden
  ul
    li
      width: 100%
      height: 60px
      line-height: 60px
      font-size: 16px
      border-bottom: 1px solid #eaeaea
      &:hover
        background: #fff
        border-left: 2px solid #717171
      a
        text-decoration none
        width: 90%;
        margin: 0 5%;
        height: 100%;
        display: block;
        color: #3a3a3a;
</style>
