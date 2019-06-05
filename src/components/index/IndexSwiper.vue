<template>
  <div class="container">
    <div class="wrap">
      <swiper :options="swiperOption" v-if="banner.length>0">
        <!-- slides -->
        <swiper-slide v-for="item of banner" :key="item.Id">
            <router-link :to="item.Url" style="display: block">
              <div class="swiper-img" :style="{ backgroundImage: 'url('+item.Image+')'}"></div>
            </router-link>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexSwiper',
  props: {
    banner: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
        },
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  width: 1200px
  margin: 10px auto
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
  .wrap>>>.swiper-pagination-bullet-active
    background #fff !important
  .wrap
    margin-top 2px
    overflow hidden
    height 0
    padding-bottom 478px
    background-color #eee
  .swiper-img
    background-repeat no-repeat
    background-size 100% 100%
    height 478px
    width 100%
    cursor pointer
</style>
