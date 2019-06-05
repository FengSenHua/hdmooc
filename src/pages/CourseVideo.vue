<template>
  <div>
    <course-header ref="courseH"></course-header>
    <div class="wrap">
      <course-main :courseLesson="courseLesson" @setVideoUrl="setVideoUrl"></course-main>
      <course-aside class="aside" :asideData="asideData" :fav="fav" @handleFav="handleFav"> </course-aside>
    </div>
  </div>
</template>

<script>
import CourseHeader from '@/components/courseVideo/CourseHeader'
import CourseMain from '@/components/courseVideo/CourseMain'
import CourseAside from '@/components/courseVideo/CourseAside'
import {secondFormat} from '@/utils/index'
import {mapState} from 'vuex'
export default {
  name: 'courseVideo',
  components: {
    CourseHeader,
    CourseMain,
    CourseAside
  },
  data () {
    return {
      courseId: '',
      page: {
        FirstPage: true,
        LastPage: true,
        List: [],
        PageNo: 1,
        PageSize: 10,
        TotalCount: 10,
        TotalPage: 1
      },
      fav: false,
      asideData: {
        teacher: '',
        degree: '',
        learnTimes: '',
        students: '',
        desc: '',
        notice: '',
        courseID: ''
      },
      courseLesson: [
        {
          name: '',
          video: [
            {
              name: '',
              url: ''
            }
          ]
        }
      ]
    }
  },
  computed: mapState({
    token: (state) => state.user.token
  }),
  methods: {
    setVideoUrl (url) {
      console.log(url)
      this.$refs.courseH.setVideoUrl(url)
    },
    getCourseDetail (id) {
      this.$api.getCourseDetail({id: id}).then(res => {
        this.asideData = {
          teacher: res.res.teacher,
          degree: res.res.degree,
          learnTimes: secondFormat(res.res.learnTimes),
          students: res.res.students,
          desc: res.res.desc,
          notice: res.res.notice,
          courseID: this.courseId
        }
        this.courseLesson = res.res.lesson
        try {
          this.setVideoUrl(this.courseLesson[0].video[0].url)
        } catch (e) {
          console.log('空url')
        }
      })
    },
    getIsFav (id) {
      if (this.token) {
        let params = {
          Authorization: 'Token ' + this.token
        }
        this.$api.getFav({id: id}, params).then(res => {
          this.fav = res.ok
        })
      }
    },
    handleFav (fav) {
      this.fav = fav
    }
  },
  created () {
    this.courseId = this.$route.params.id
    this.getCourseDetail(this.courseId)
    this.getIsFav(this.courseId)
    this.$store.dispatch('getComment', {'id': this.courseId, 'pageNo': 1})
  }
}
</script>

<style lang="stylus" scoped>
  .wrap
    width 1200px
    margin 0 auto
    display flex
    justify-content space-between
    .aside
      width 320px
      box-sizing border-box
      position: relative;
      margin-right 20px
</style>
