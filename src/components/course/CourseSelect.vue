<template>
 <div class="container">
   <div class="m-nav">
     <el-card class="box-card">
       <div slot="header" class="box-header">
         <div class="courseLogo"><img src="~@/assets/image/logo-course.png"></div>
         <div class="search">
           <el-input
             placeholder="请输入内容"
             v-model="query">
             <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
           </el-input>
         </div>
       </div>
       <div class="course-nav-box">
         <div class="course-nav-row clearfix">
           <span class="hd l">方向:</span>
           <div class="bd">
             <ul @click="handleDirection">
               <li :class="[index===activity_d?activeClass:'',defaultClass]" v-for="(item, index) in direction" :key="index" :data-index="index">
                     {{item}}
               </li>
             </ul>
           </div>
         </div>
         <div class="course-nav-row clearfix">
           <span class="hd l">分类:</span>
           <div class="bd">
             <ul @click="handleClassify">
               <li :class="[index===activity_c?activeClass:'',defaultClass]" v-for="(item, index) in classifies" :key="index" :data-index="index" >
                      {{item}}
               </li>
             </ul>
           </div>
         </div>
         <div class="course-nav-row clearfix">
           <span class="hd l">难度:</span>
           <div class="bd">
             <ul @click="handleDegree">
               <li :class="[index===activity_degree?activeClass:'',defaultClass]" v-for="(item, index) in difficulty" :key="index" :data-index="index">
                    {{item}}
               </li>
             </ul>
           </div>
         </div>
       </div>
     </el-card>
   </div>
 </div>
</template>

<script>
export default {
  name: 'CourseSelect',
  props: {
    tags: {
      tags: Array,
      required: true
    }
  },
  data () {
    return {
      query: '',
      defaultClass: 'course-nav-item',
      activeClass: 'activity',
      activity_d: 0,
      activity_c: 0,
      activity_degree: 0,
      difficulty: ['全部', '初级', '中级', '高级']
    }
  },
  computed: {
    direction () {
      return this.tags.map(item => {
        return item.name
      })
    },
    classifies () {
      let c = []
      if (this.tags.length > 0) {
        c = this.tags[this.activity_d].classifies
      }
      return c
    }
  },
  methods: {
    search () {
      let params = {
        'query': this.query,
        'd': this.activity_d === 0 ? '' : this.direction[this.activity_d],
        'c': this.activity_c === 0 ? '' : this.classifies[this.activity_c],
        'degree': this.activity_degree === 0 ? '' : this.difficulty[this.activity_degree],
        'pageNo': 1
      }
      this.$store.dispatch('searchCourse', params)
    },
    handleDirection (e) {
      if (e.target.tagName.toLowerCase() === 'li') {
        this.activity_d = parseInt(e.target.dataset['index'])
        this.activity_c = 0
        let params = {
          'query': this.query,
          'd': this.activity_d === 0 ? '' : this.direction[this.activity_d],
          'c': this.activity_c === 0 ? '' : this.classifies[this.activity_c],
          'degree': this.activity_degree === 0 ? '' : this.difficulty[this.activity_degree],
          'pageNo': 1
        }
        this.$store.dispatch('searchCourse', params)
      }
    },
    handleClassify (e) {
      if (e.target.tagName.toLowerCase() === 'li') {
        this.activity_c = parseInt(e.target.dataset['index'])
        let params = {
          'query': this.query,
          'd': this.activity_d === 0 ? '' : this.direction[this.activity_d],
          'c': this.activity_c === 0 ? '' : this.classifies[this.activity_c],
          'degree': this.activity_degree === 0 ? '' : this.difficulty[this.activity_degree],
          'pageNo': 1
        }
        console.log(params.c)
        this.$store.dispatch('searchCourse', params)
      }
    },
    handleDegree (e) {
      if (e.target.tagName.toLowerCase() === 'li') {
        this.activity_degree = parseInt(e.target.dataset['index'])
        let params = {
          'query': this.query,
          'd': this.activity_d === 0 ? '' : this.direction[this.activity_d],
          'c': this.activity_c === 0 ? '' : this.classifies[this.activity_c],
          'degree': this.activity_degree === 0 ? '' : this.difficulty[this.activity_degree],
          'pageNo': 1
        }
        console.log(params.c)
        this.$store.dispatch('searchCourse', params)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-icon-search
    cursor pointer
  .container
    width 100%
    margin 10px 0
    .m-nav
      font-size 14px
      .box-card
        .box-header
          overflow hidden
  .search
    float right
  .courseLogo
    width 106px
    overflow hidden
    float left
    img
      width 100%
  .clearfix
    &:before,&:after
      display: table
      content: ""
    &:after
      clear: both
  .course-nav-box
     .course-nav-row
       position: relative
       padding: 16px 0 5px
       border-bottom: 1px solid #edf1f2
       .hd
        width: 52px
        height: 20px
        line-height: 30px
        font-weight: 700
        font-size: 14px
        color: #07111b
        text-align: left
       .bd
        overflow hidden
       .l
        float left
  .course-nav-item
    display: inline-block
    margin: 0 4px
    cursor: pointer
    line-height: 14px
    margin-bottom: 10px
    padding: 10px
    font-size: 14px
    color: #1c1f21
    text-decoration none
    &:hover
        color crimson
  .activity
        color crimson
</style>
