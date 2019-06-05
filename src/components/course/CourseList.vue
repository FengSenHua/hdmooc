<template>
  <div class="container">
    <div class="content">
      <div class="items">
        <el-card class="box-card" v-for="(item,index) in page.List" :key="index">
          <router-link :to="{name:'courseVideo',params:{id:item.uid}}">
            <div class="card-top">
              <img :src="item.image">
            </div>
            <div class="card-content">
              <h3 class="course-card-name">{{item.name}}</h3>
              <div class="course-card-info">
                <span>{{item.degree}}</span>
                <span class="iconfont">&#xe61f;{{item.students}}</span>
                <span class="iconfont">&#xe60c;{{item.fav_numbers}}</span>
              </div>
            </div>
          </router-link>
        </el-card>
      </div>
      <el-pagination
        :page-size="page.PageSize"
        :pager-count='7'
        layout="prev, pager, next"
        :total="page.TotalCount"
        :current-page="page.PageNo"
        @current-change="handleCurrentChange"
        class="pagination">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import 'styles/iconfont/iconfont.js'
import {mapState} from 'vuex'
export default {
  computed: mapState({
    page: (state) => state.courseList
  }),
  methods: {
    handleCurrentChange (val) {
      this.$store.dispatch('searchCourse', {'pageNo': val})
    }
  }
}
</script>
<style lang="stylus" scoped>
  .container
    width: 1200px
    margin: 0 auto
    .content
      padding: 36px 0 48px
      .pagination
        margin-top 20px
        text-align center
      .items
        display flex
        flex-wrap wrap
        .box-card
          margin 0 2px
          width 234px
          a
            text-decoration none
            cursor pointer
            .card-top
              height 133px
              overflow hidden
              img
                width 100%
            .card-content
              padding 10px 5px
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
</style>
