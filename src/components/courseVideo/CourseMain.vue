<template>
  <div class="Tabs">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="课程" name="first">
         <course-section :course="courseLesson" @click.native="videoSelect"></course-section>
      </el-tab-pane>
      <el-tab-pane label="评论" name="second">
         <course-comment></course-comment>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CourseSection from '@/components/courseVideo/CourseSection'
import CourseComment from '@/components/courseVideo/CourseComment'
export default {
  name: 'CourseMain',
  props: ['courseLesson'],
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    CourseSection,
    CourseComment
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    videoSelect (e) {
      if (e.target.tagName.toLowerCase() === 'a') {
        this.$emit('setVideoUrl', e.target.dataset['video'])
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .Tabs
   flex 1
   margin-right 10px
</style>
