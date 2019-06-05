<template>
  <div class="right">
    <div class="head">
      <h1>课程管理</h1>
    </div>
    <div class="content">
      <div class="items">
        <el-card class="box-card" v-for="(item,index) in courseList.List" :key="index">
          <router-link :to="{name:'courseVideo',params:{id:item.Course__Uid}}">
            <div class="card-main">
              <img :src="item.Course__Image">
              <div class="card-content">
                <h3 class="course-card-name">{{item.Course__Name}}</h3>
                <div class="course-card-info">
                  <span>{{item.Course__Degree}}</span>
                  <span class="iconfont">&#xe61f;{{item.Course__Students}}</span>
                  <span class="iconfont">&#xe60c;{{item.Course__FavNumbers}}</span>
                </div>
              </div>
            </div>
          </router-link>
        </el-card>
      </div>
      <el-pagination
        :page-size="courseList.PageSize"
        :pager-count='7'
        layout="prev, pager, next"
        :total="courseList.TotalCount"
        :current-page="courseList.PageNo"
        @current-change="handleCurrentChange"
        class="pagination">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'FavCourseManger',
  data () {
    return {
      courseList: {
        FirstPage: true,
        LastPage: true,
        List: [],
        PageNo: 1,
        PageSize: 5,
        TotalCount: 0,
        TotalPage: 1
      }
    }
  },
  computed: mapState({
    token: (state) => state.user.token
  }),
  methods: {
    handleCurrentChange (val) {
      this.getMessage(val)
    },
    getMessage (pageNo) {
      let params = {
        pageNo: pageNo
      }
      let headers = {
        Authorization: 'Token ' + this.token
      }
      this.$api.getUserFav(params, headers).then(res => {
        this.courseList = res.res
      })
    }
  },
  mounted () {
    this.getMessage(1)
  }
}
</script>

<style lang="stylus" scoped>
  .content
    padding: 0 0 48px
    .pagination
      margin-top 20px
      text-align center
    .items
      display flex
      flex-wrap wrap
      .box-card
        margin 10px 2px
        width 100%
        a
          text-decoration none
          cursor pointer
          .card-main
            display flex
            height 113px
            overflow hidden
            img
              width 200px
              height 113px
            .progress
              width 100%
              display flex
              justify-content right
          .card-content
            width 400px
            padding 10px 10px
            .course-card-name
              font-size: 16px
              color: #07111b
              line-height: 24px
              word-wrap: break-word
              overflow: hidden
              text-overflow: ellipsis
              display -webkit-box
              -webkit-line-clamp: 2
              -webkit-box-orient: vertical
              max-height: 46px
              transition: all .3s
              &:hover
                color crimson
            .course-card-info
              font-size: 12px
              color: #93999f
              line-height: 24px
              margin-top: 8px
              font-weight: 400
              span
                display: inline-block
                margin-right: 12px
  .left
    float left
  .right
    width: 945px
    float: right
    overflow: hidden
    .head
      border:1px solid #eaeaea
      color: #333
      height: 50px
      line-height: 50px
      text-indent: 20px
      font-size: 14px
      background-color #f8f8f8
    .info
      overflow hidden
      border-right 1px solid #eaeaea
      border-bottom 1px solid #eaeaea
      border-left 1px solid #eaeaea
      .l_border
        border-right 1px solid #eaeaea
  .avatar
    width: 160px
    border-radius: 6px
    display: block
    margin: 20px auto
  .card-img-overlay
    display: none
    transition: all 0.5s
    button
      margin-top: 20px
  .card:hover .card-img-overlay
    display: block
  .text-center
    position relative
    .card-img-overlay
      position absolute
      top 50%
      left 50%
      transform translate(-50%,-50%)
  .update_password
    border-top:1px solid #eaeaea
    margin-top:30px
  .update_button
    margin: 80px
  .ruleForm
    margin-top 20px
</style>
