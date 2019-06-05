<template>
  <el-dialog
    title="注册"
    :visible.sync="registerDialogVisible"
    width="30%"
    center
    class="wrap"
    :lock-scroll="lock_scroll"
    :close-on-click-modal="close_on_click_modal"
  >
    <el-form :model="forms" status-icon :rules="rule" ref="registerForms">
      <el-form-item  prop="re_account" :inline="true">
        <el-input type="text" v-model="forms.re_account" autocomplete="off" placeholder="请输入注册邮箱" class="mail"></el-input>
        <el-button @click="MailVerification('registerForms')" :disabled="sendTimeout" class="mailButton" >{{sendMessage}}</el-button>
      </el-form-item>
      <el-form-item  prop="mailCode" :inline="true" label="验证码" v-show="send">
        <el-input type="text" v-model="forms.mailCode" autocomplete="off"  class="mailcode" ></el-input>
      </el-form-item>
      <el-form-item prop="re_password">
        <el-input show-password v-model="forms.re_password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item  prop="checkPass">
        <el-input show-password v-model="forms.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('registerForms')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
let sendTimer = null
export default {
  name: 'RegisterDialog',
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
        callback(new Error('密码格式错误'))
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
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.forms.re_password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      lock_scroll: false,
      close_on_click_modal: false,
      sendTimeout: false,
      sendMessage: '邮箱验证',
      send: false,
      forms: {
        re_account: '',
        re_password: '',
        checkPass: '',
        mailCode: ''
      },
      rule: {
        re_account: [{ validator: validateAccount, trigger: 'blur' }],
        re_password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        mailCode: [{validator: validateCode, trigger: 'blur'}]
      }
    }
  },
  computed: {
    registerDialogVisible: {
      get: function () {
        return this.$store.state.registerDialogVisible
      },
      set: function (value) {
        this.$store.commit('setRegisterDialogVisible', value)
      }
    }
  },
  methods: {
    MailVerification (forms) {
      console.log(1)
      this.$refs[forms].validateField('re_account', (valid) => {
        console.log(2)
        if (!valid) {
          if (this.sendTimer) {
            clearInterval(this.sendTimer)
          }
          this.$api.sendRCodeEmail({'email': this.forms.re_account}).then(res => {
            if (res.msg !== 'ok') {
              Message.error(res.msg)
            } else {
              this.sendTimeout = true
              let time = 120
              this.sendMessage = time.toString() + 's'
              sendTimer = setInterval(() => {
                this.sendMessage = (--time).toString() + 's'
                if (time === 0) {
                  clearInterval(sendTimer)
                  this.sendMessage = '邮箱验证'
                  this.sendTimeout = false
                }
              }, 1000)
              this.send = true
            }
          })
        } else {
          return false
        }
      })
    },
    submitForm (forms) {
      this.$refs[forms].validate((valid) => {
        if (valid) {
          let param = {
            'Email': this.forms.re_account,
            'Password': this.forms.re_password,
            'Code': this.forms.mailCode
          }
          this.$api.register(JSON.stringify(param)).then(res => {
            if (res.msg === 'success') {
              Message.success('注册成功')
              this.$store.commit('setRegisterDialogVisible', false)
              setTimeout(() => {
                this.$store.commit('setLoginDialogVisible', true)
              }, 1000)
            } else {
              Message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .mail
    width 70% !important
  .mailcode
    width 30% !important
  .mailButton
    width 100px
  .forget
    color #3a8ee6
</style>
