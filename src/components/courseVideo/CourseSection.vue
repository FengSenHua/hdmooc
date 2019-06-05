<template>
    <div class="mod-chapters">
      <div class="chapter chapter-active" v-for="(item,index) in course" :key="index" >
        <h3>
          <strong>{{item.name}}</strong>
        </h3>
        <ul class="video" v-for="(video,index) in item.video" :key="index">
          <li>
            <a target="_blank" :data-video="video.url">
             {{video.name}}
            </a>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'courseSection',
  props: ['course']
}
</script>

<style lang="stylus" scoped>
  .mod-chapters
    .chapter
      padding: 9px 0
      border-bottom: 1px solid #edf1f2
      .video
       display block
       li
         height: 40px
         line-height: 40px
         padding-left: 20px
         margin: 5px 0
         &:hover
           background-color #edf1f2
         a
           color: #787d82
           display: block
           cursor pointer
           overflow: hidden
           padding: 0 0 0 20px
           word-break: break-all
           text-decoration none
           &:hover
             color black
</style>
