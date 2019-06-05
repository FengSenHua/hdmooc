<template>
  <div class="container">
    <index-swiper :banner="banner"></index-swiper>
    <index-list :hnf="hnf"></index-list>
  </div>
</template>

<script>
import IndexSwiper from '@/components/index/IndexSwiper'
import IndexList from '@/components/index/IndexList'
export default {
  name: 'index',
  components: {
    IndexSwiper,
    IndexList
  },
  data () {
    return {
      banner: [],
      hnf: []
    }
  },
  methods: {
    getMessage () {
      this.$api.getBanner().then(res => {
        this.banner = res.res
      })
      this.$api.getHnfList().then(res => {
        this.hnf = res.res
      })
    }
  },
  mounted () {
    this.getMessage()
  }
}
</script>

<style lang="stylus" scoped>
.container
  width: 1200px
  margin: 0 auto
</style>
