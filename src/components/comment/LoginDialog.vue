<template>
  <el-dialog
    title="登录"
    :visible.sync="loginDialogVisible"
    width="30%"
    center
    class="wrap"
    :lock-scroll="lock_scroll"
    @open="open"
    :close-on-click-modal="close_on_click_modal"
  >
    <el-form :model="forms" status-icon :rules="rule" ref="loginForms">
      <el-form-item  prop="account">
        <el-input type="text" v-model="forms.account" autocomplete="off" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input show-password v-model="forms.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" v-model="forms.code" autocomplete="off" placeholder="请输入验证码" class="code">
        </el-input>
        <span class="codeimg">
            <img :src="captcha.cpt" @click="refreshCaptcha">
            </span>
      </el-form-item>
      <a href="javascript:void (0)" class="forget" @click="forget">忘了密码?</a>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('loginForms')">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
let timer
export default {
  name: 'LoginDialog',
  data () {
    let validateAccount = (rule, value, callback) => {
      let reg = new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!reg.test(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    let validatePass = (rule, value, callback) => {
      let reg = new RegExp(/^[\w_\\.]{6,16}$/)
      if (value === '') {
        callback(new Error('请输入6-16位密码,区分大小写,不能用空格'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入6-16位密码,区分大小写,不能用空格'))
      } else {
        callback()
      }
    }
    let validateCode = (rule, value, callback) => {
      let reg = new RegExp(/^[\w]{4}$/)
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (!reg.test(value)) {
        callback(new Error('验证码错误'))
      } else {
        callback()
      }
    }
    return {
      Visible: false,
      close_on_click_modal: false,
      lock_scroll: false,
      captcha: {
        captcha_id: '',
        cpt: ''
      },
      forms: {
        account: '',
        password: '',
        code: ''
      },
      rule: {
        account: [{ validator: validateAccount, trigger: ['blur', 'change'] }],
        password: [{ validator: validatePass, trigger: ['blur', 'change'] }],
        code: [{ validator: validateCode, trigger: ['blur', 'change'] }]
      }
    }
  },
  computed: {
    loginDialogVisible: {
      get: function () {
        return this.$store.state.loginDialogVisible
      },
      set: function (value) {
        this.$store.commit('setLoginDialogVisible', value)
      }
    }
  },
  methods: {
    open () {
      this.$api.getCaptcha().then(res => {
        this.captcha = res
      }).catch(err => {
        console.log(err)
      })
    },
    forget () {
      this.$store.commit('setLoginDialogVisible', false)
      this.$router.push('/student/forget')
    },
    submitForm (forms) {
      this.$refs[forms].validate((valid) => {
        if (valid) {
          let param = {
            'Email': this.forms.account,
            'Password': this.forms.password,
            'Captcha': this.forms.code,
            'Captcha_id': this.captcha.captcha_id
          }
          this.$api.login(JSON.stringify(param)).then(res => {
            if (res.msg === 'ok') {
              this.$store.commit('setUserAndToken', {'token': res.token, 'userInfo': res.user})
              if (this.$route.fullPath.includes('forget')) {
                this.$router.push('/')
              }
              this.$store.commit('setLoginDialogVisible', false)
            } else {
              Message.error(res.msg)
              this.refreshCaptcha()
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    refreshCaptcha () {
      if (timer != null) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        this.$api.getCaptcha().then(res => {
          this.captcha = res
        }).catch(err => {
          console.log(err)
        })
      }, 200)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .codeimg
    position: relative;
    top: 10px;
    display inline-block
    height 32px
    width 90px
    overflow hidden
    img
      height 32px
      width 90px
  .code
    width 70% !important
</style>
