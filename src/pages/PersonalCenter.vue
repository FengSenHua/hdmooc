<template>
  <div class="container">
    <el-card class="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>个人资料</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <div class="clearfix">
      <personal-menu v-bind:index="0"></personal-menu>
      <personal-message></personal-message>
    </div>
  </div>
</template>

<script>
import PersonalMenu from '@/components/personal/PersonalMenu'
import PersonalMessage from '@/components/personal/PersonalMessage'
export default {
  name: 'PersonalCenter',
  components: {
    PersonalMenu,
    PersonalMessage
  }
}
</script>

<style lang="stylus" scoped>
.container
  width 1200px!important
  margin 0 auto!important
  .top
    margin 10px 0 20px 0
.clearfix
  &:before,&:after
    display: table
    content: ""
  &:after
    clear: both
</style>
