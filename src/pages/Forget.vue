<template>
  <div>
    <div class="steps-wrap">
      <el-steps :active="active" finish-status="success" align-center class="steps">
        <el-step title="身份验证"></el-step>
        <el-step title="修改密码"></el-step>
      </el-steps>
    </div>
    <div class="container">
      <div class="main">
        <el-card class="wrap">
          <el-form :model="forms" status-icon :rules="rule" ref="Forget">
            <div v-if="!isOk">
              <el-form-item  prop="account" :inline="true">
                <el-input type="text" v-model="forms.account" autocomplete="off" placeholder="请输入已注册邮箱" class="mail"></el-input>
                <el-button @click="MailVerification('Forget')" :disabled="sendTimeout" class="mailButton" >{{sendMessage}}</el-button>
              </el-form-item>
              <el-form-item  prop="mailCode" :inline="true" label="验证码" >
                <el-input type="text" v-model="forms.mailCode" autocomplete="off"  class="mailcode" ></el-input>
              </el-form-item>
              <span class="footer">
            <el-button type="primary" @click="next('Forget')" :disabled="!disabled">下一步</el-button>
          </span>
            </div>
            <div v-else>
              <el-form-item prop="password">
                <el-input show-password v-model="forms.password" autocomplete="off" placeholder="请输入新密码"></el-input>
              </el-form-item>
              <el-form-item  prop="checkPass">
                <el-input show-password v-model="forms.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
              </el-form-item>
              <span class="footer">
               <el-button v-if="success" @click="pre">返回首页</el-button>
              <el-button type="primary" @click="submitForm('Forget')" :disabled="success">确认</el-button>
          </span>
            </div>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  name: 'Forget',
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
      } else if (value !== this.forms.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      timer: null,
      send: false,
      success: false,
      forms: {
        account: '',
        password: '',
        checkPass: '',
        mailCode: ''
      },
      sendMessage: '邮箱验证',
      sendTimeout: false,
      isOk: false,
      rule: {
        account: [{ validator: validateAccount, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        mailCode: [{validator: validateCode, trigger: 'blur'}]
      }
    }
  },
  methods: {
    MailVerification (forms) {
      this.$refs[forms].validateField('account', (valid) => {
        if (!valid) {
          if (this.timer) {
            clearInterval(this.timer)
          }
          this.$api.sendFCodeEmail({'email': this.forms.account}).then(res => {
            if (res.msg !== 'ok') {
              Message.error(res.msg)
            } else {
              this.sendTimeout = true
              let time = 120
              this.sendMessage = time.toString() + 's'
              this.timer = setInterval(() => {
                this.sendMessage = (--time).toString() + 's'
                if (time === 0) {
                  clearInterval(this.timer)
                  this.sendMessage = '邮箱验证'
                  this.sendTimeout = false
                }
              }, 1000)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    pre () {
      this.$router.push('/')
    },
    next (forms) {
      this.$refs[forms].validate((valid) => {
        if (valid) {
          let params = {
            'Email': this.forms.account,
            'Code': this.forms.mailCode
          }
          this.$api.forgetCheckCode(params).then(res => {
            if (res.msg === 'ok') {
              this.active++
              this.forms.mailCode = res.check
              this.isOk = true
            } else {
              Message.error(res.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    submitForm (forms) {
      this.$refs[forms].validate((valid) => {
        if (valid) {
          if (!this.send) {
            this.send = true
            setTimeout(() => {
              let params = {
                'Email': this.forms.account,
                'Password': this.forms.password,
                'Code': this.forms.mailCode
              }
              this.$api.forgetPassword(JSON.stringify(params)).then(res => {
                this.send = false
                if (res.msg === '修改成功') {
                  this.active++
                  this.success = true
                  Message.success(res.msg)
                } else {
                  Message.error(res.msg)
                }
              }).catch(err => {
                this.send = false
                Message.error(err)
              })
            }, 1000)
          }
        } else {
          return false
        }
      })
    }
  },
  computed: {
    disabled: function () {
      return this.forms.mailCode.length === 4
    }
  },
  created: function () {
    if (this.$store.state.user !== '') {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scoped>
   .steps-wrap
     box-sizing border-box
     height 80px
     background-color #f5f5f5
     padding-top 20px
   .container
     width 1200px
     min-height 380px
     margin 0 auto
     .main
       width 100%
       height 100%
       display flex
       justify-content center
       align-items center
       .wrap
         margin-top 50px
         width 382px
         height 200px
         .mail,.code
            width 70% !important
         .mailcode
            width 30% !important
         .footer
            display block
            text-align  center
</style>
