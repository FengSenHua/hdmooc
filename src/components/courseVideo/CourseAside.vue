<template>
    <el-card class="aside">
      <div class="statics clearfix">
        <div class="teacher-info l">
          <a href="#" target="_blank">
            <img class="js-usercard-dialog" :src="asideData.teacher.avatar" width="80" height="80" alt="头像">
          </a>
          <span class="tit">
                <a href="#" target="_blank">{{asideData.teacher.name}}</a>
            </span>
          <span class="job">{{asideData.teacher.work}}</span>
        </div>
        <div class="static-item l">
          <span class="meta">难度 </span><span class="meta-value">{{asideData.degree}}</span>
        </div>
        <div class="static-item l">
          <span class="meta">时长 </span><span class="meta-value">{{asideData.learnTimes}}</span>
        </div>
        <div class="static-item l">
          <span class="meta">学习人数 </span><span class="meta-value js-learn-num">{{asideData.students}}</span>
        </div>
      </div>
      <div>
        <el-button class="coll" @click="handleFav">{{favMessae}}</el-button>
      </div>
      <div class="course-info-tip">
        <dl class="first">
          <dt>课程须知</dt>
          <dd class="autowrap">{{asideData.notice}}</dd>
        </dl>
        <dl>
          <dt>老师告诉你能学到什么？</dt>
          <dd class="autowrap">{{asideData.desc}}</dd>
        </dl>
      </div>
    </el-card>
</template>

<script>
import {mapState} from 'vuex'
import {Message} from 'element-ui'
export default {
  name: 'courseAside',
  props: ['asideData', 'fav'],
  computed: {
    favStatus () {
      return this.fav
    },
    favMessae () {
      return this.favStatus ? '已收藏' : '收藏'
    },
    ...mapState({
      token: (state) => state.user.token
    })
  },
  methods: {
    handleFav () {
      if (this.token) {
        let config = {
          headers: {
            Authorization: 'Token ' + this.token
          }
        }
        let params = {
          course_id: this.asideData.courseID
        }
        this.$api.addFav(JSON.stringify(params), config).then(res => {
          if ((res.msg === '收藏成功') || (res.msg === '取消收藏')) {
            this.$emit('handleFav', !this.fav)
          }
          Message.info(res.msg)
        })
      } else {
        this.$store.commit('setLoginDialogVisible', true)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .aside
    margin-top 35px
  .stu
    width 100%
    background #f20120 !important
    border-color #f20120 !important
    border-radius: 24px !important
    color white
    &:hover
      background #b50210 !important
      border-color #b50210 !important
  .coll
    margin-top 10px
    width 100%
    border-radius: 24px !important
  .course-info-tip
    padding-top: 24px
    dt
      margin-bottom: 6px
      font-weight: 700
      font-size: 14px
    dd
      font-size: 12px
      line-height: 24px
      color: #545c63
      white-space: pre-line
    .first
      margin-bottom: 24px
  .statics
    .teacher-info
      padding-left: 56px
      padding-right: 60px
      .js-usercard-dialog
        margin-left: -56px
        float: left
        width: 48px
        height: 48px
        border-radius: 100%
      .tit
        display: block
        margin-top: 3px
        a
          color black
          &:hover
            text-decoration none
    .static-item
      margin-top 20px
      display: block
      margin-right: 16px
      font-size: 12px
  .hd
    line-height: 40px
    font-weight: 700
    font-size: 32px
    color: white
  .l
    float left
  .clearfix
    &:before,&:after
      display: table
      content: ""
    &:after
      clear: both
</style>
