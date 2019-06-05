<template>
  <div class="video-wrap" @setVideoUrl="setVideoUrl">
    <d-player @play="play" :options="options" class="video" ref="player"></d-player>
  </div>
</template>

<script>
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'
import {mapState} from 'vuex'
export default {
  name: 'courseHeader',
  data () {
    return {
      player: null,
      options: {
        video: {
          url: ''
        }
      },
      courseInfos: {
        backgroundColor: 'rgba(0,0,0,1)'
      }
    }
  },
  computed: mapState({
    Token: (state) => state.user.token
  }),
  components: {
    'd-player': VueDPlayer
  },
  methods: {
    play () {
      if (this.Token) {
        let config = {
          headers: {
            Authorization: 'Token ' + this.Token
          }
        }
        let params = {
          course_id: this.$route.params.id
        }
        this.$api.addStudentCourse(JSON.stringify(params), config)
      } else {
        this.$store.commit('setLoginDialogVisible', true)
        this.player.pause()
      }
    },
    setVideoUrl (url) {
      this.player.switchVideo({
        url: url
      })
      this.player.play()
    }
  },
  mounted () {
    this.player = this.$refs.player.dp
  }
}
</script>

<style lang="stylus" scoped>
 .video-wrap
   background: #1c1f21;
   height 432px
   overflow hidden
   .video
     height 412px
     margin 10px 40px 10px 40px
</style>
