<template>
  <div class="container">
    <div class="content" v-for="(list,index) in IndexList " :key="index">
      <h3 class="types-title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconxingqiu"></use>
        </svg>
        <em>{{list.title}}</em>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconxingqiu"></use>
        </svg>
      </h3>
      <div class="items">
        <el-card class="box-card" v-for="(item,index) in list.list" :key="index">
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
    </div>
  </div>
</template>

<script>
import 'styles/iconfont/iconfont.js'
export default {
  name: 'IndexList',
  props: {
    hnf: {
      required: true
    }
  },
  computed: {
    IndexList: function () {
      return [{title: '热门推荐', list: this.hnf.hots},
        {title: '新手入门', list: this.hnf.news},
        {title: '前沿科技', list: this.hnf.feature}]
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
  .container
    width: 1200px
    margin: 0 auto
    .content
      padding: 36px 0 48px
      .types-title
        font-size: 14px
        color: #93999f
        letter-spacing: 2.6px
        line-height: 36px
        text-align: center
      .items
        display flex
        .box-card
          margin 0 2px
          flex 1
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
