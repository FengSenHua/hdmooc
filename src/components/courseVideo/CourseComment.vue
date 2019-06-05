<template>
<div>
  <div class="editor-form">
    <div class="pub-editor-wrap">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="扯淡、吐槽、表扬、鼓励……想说啥就说啥！"
        v-model="textarea">
      </el-input>
    </div>
    <el-button type="primary" @click="handleComment" plain>发表评论</el-button>
  </div>
  <div class="comment">
    <ul class="mod-post">
      <li class="post-row" v-for="(item,index) in page.List" :key="index">
        <div class="media">
          <span target="_blank"><img :src="item.User__Avatar" width="40" height="40" alt="头像"></span>
        </div>
        <div class="bd">
          <div class="tit">
            <span target="_blank">{{item.User__Nick_name}}</span>
          </div>
          <p class="cnt">{{item.Comments}}</p>
          <div class="footer clearfix">
            <span title="创建时间" class="l timeago">{{item.Created}}</span>
          </div>
        </div>
      </li>
    </ul>
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
import {mapState} from 'vuex'
import {Message} from 'element-ui'
export default {
  name: 'courseComment',
  data () {
    return {
      courseId: '',
      textarea: ''
    }
  },
  computed: mapState({
    page: (state) => state.commentList
  }),
  methods: {
    handleCurrentChange (val) {
      this.$store.dispatch('getComment', {'id': this.courseId, 'pageNo': val})
    },
    handleComment () {
      if (this.textarea.length > 4) {
        let params = {
          id: this.courseId,
          data: this.textarea
        }
        let config = {
          headers: {
            'Authorization': 'Token ' + this.$store.state.user.token
          }
        }
        this.$api.addComment(JSON.stringify(params), config).then(res => {
          if (res.ok) {
            Message.success('发表成功')
            this.$store.dispatch('getComment', {'id': this.courseId, 'pageNo': 1})
          } else {
            Message.error('发表失败')
          }
        })
      } else {
        Message.info('发表内容太短了')
      }
    }
  },
  created () {
    this.courseId = this.$route.params.id
  }
}
</script>

<style lang="stylus" scoped>
.editor-form
  margin 10px 0
  .pub-editor-wrap
    width: 720px
    margin-bottom 20px
  .pub-editor-wrap>>>textarea
      resize none
.comment
  .pagination
    margin 20px 0
    text-align center
  .mod-post
    .post-row
      border-bottom: 1px solid #d9dde1
      overflow: hidden
      padding: 24px 0 16px 24px
      .media
        float: left
        width: 40px
        margin-right: 10px
        img
          display: block
          border-radius: 20px
      .bd
        margin-left: 60px
        margin-right: 20px
        .tit
          line-height: 1.2
          margin-bottom: 8px
        .cnt
          margin-top: 3px
          font-size: 14px
          line-height: 24px
          color: #303538
          word-break: break-all
          word-wrap: break-word
        .footer
          color: #93999f
          font-size: 12px
          margin-top: 15px
</style>
