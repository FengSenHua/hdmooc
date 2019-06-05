<template>
   <div class="container">
     <course-select :tags="tags"></course-select>
     <course-list></course-list>
   </div>
</template>

<script>
import CourseSelect from '@/components/course/CourseSelect'
import CourseList from '@/components/course/CourseList'
export default {
  name: 'Course',
  components: {
    CourseSelect,
    CourseList
  },
  data () {
    return {
      tags: []
    }
  },
  methods: {
    getTags () {
      this.$api.getTagList().then(res => {
        let c = []
        this.tags = res.res.map(item => {
          let data = []
          if (item.classifies) {
            data = item.classifies.map(item => {
              c.push(item.Name)
              return item.Name
            })
          }
          data.unshift('全部')
          return {name: item.Name, classifies: data}
        })
        c.unshift('全部')
        this.tags.unshift({name: '全部', classifies: c})
      })
    }
  },
  mounted () {
    this.getTags()
    this.$store.dispatch('searchCourse', {'pageNo': 1})
  }
}
</script>

<style lang="stylus" scoped>
  .container
    width: 1200px
    margin: 0 auto
</style>
