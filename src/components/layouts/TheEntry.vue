<template>
  <div class="navbar-right">
    <el-dropdown v-if="user">
      <span class="el-dropdown-link">
        <img class="avatar" :src="user.userInfo.avatar">
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="center" >个人中心</el-dropdown-item>
        <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div v-else class="lrbtn">
        <el-button round @click="login">登 录</el-button>
        <el-button round @click="register">注 册</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { MessageBox, Message } from 'element-ui'
export default {
  data () {
    return {
    }
  },
  name: 'TheEntry',
  computed: {
    ...mapState(['user'])
  },
  // 添加 methods 选项，并添加 logout 方法
  methods: {
    login () {
      this.$store.commit('setLoginDialogVisible', true)
    },
    register () {
      this.$store.commit('setRegisterDialogVisible', true)
    },
    center () {
      this.$router.push('/student/personalCenter')
    },
    logout () {
      MessageBox.confirm('是否执行退出操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('logOut')
        if (this.$route.fullPath.includes('student')) {
          this.$router.push('/')
        }
        Message.success('成功退出!')
      }).catch(() => {
        Message.info('已取消退出')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .navbar-right
    height 100%
    .lrbtn
      margin-top 10px
    .avatar
      width: 30px;
      height: 30px;
      margin-right: 5px;
      margin-top: 12px;
      border: 1px solid #fff;
      border-radius: 50%;
      cursor pointer
</style>
