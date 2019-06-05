<template>
    <div class="right">
      <el-dialog
        :lock-scroll="lockScroll"
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <el-form :model="ruleForm" status-icon :rules="rules" ref="updateForms">
          <el-form-item  prop="password">
            <el-input type="text" v-model="ruleForm.password" autocomplete="off" placeholder="新密码"></el-input>
          </el-form-item>
          <el-form-item  prop="repeat">
            <el-input type="text" v-model="ruleForm.repeat" autocomplete="off" placeholder="重复密码"></el-input>
          </el-form-item>
        </el-form>
   <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('updateForms')">确 定</el-button>
  </span>
      </el-dialog>
      <div class="head">
        <h1>个人信息</h1>
      </div>
      <div class="info">
        <div class="left l_border">
          <div class="text-center card">
            <img v-if="userAvatar" :src="userAvatar" alt="头像" class="avatar">
            <div class="card-img-overlay">
              <button id="pick-avatar" class="el-button el-button--primary">修改图像</button>
            </div>
            <avatar-cropper
              @error="uploadedError"
              @uploaded="handleUploaded"
              upload-form-name="avatar"
              :upload-headers="upload_headers"
              trigger="#pick-avatar"
              mimes="image/png,image/jpeg"
              upload-url="http://localhost:8080/v1/student/upload/avatar" />
          </div>
          <div  class="update">
            <div class="button_group">
              <el-button type="primary" @click="deleteUser">注销账号</el-button>
              <el-button type="primary" @click="dialogVisible = true">修改密码</el-button>
            </div>
          </div>
        </div>
        <div class="left">
          <div class="left">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
              <el-form-item label="昵称" prop="name">
                <el-input type="text" v-model="ruleForm.name" autocomplete="off" :disabled="!edit"></el-input>
              </el-form-item>
              <el-form-item label="学校">
                <el-input type="text" v-model="ruleForm.school" autocomplete="off" :disabled="!edit"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-edit" circle @click="editMessage" ></el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" :disabled="!edit">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import AvatarCropper from 'vue-avatar-cropper'
import { MessageBox, Message } from 'element-ui'
export default {
  components: {AvatarCropper},
  name: 'PersonalMessage',
  data () {
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
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let checkname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('昵称不能为空'))
      } else {
        callback()
      }
    }
    return {
      lockScroll: false,
      upload_headers: {
        Authorization: 'Token ' + this.$store.state.user.token
      },
      dialogVisible: false,
      edit: false,
      ruleForm: {
        name: '',
        school: '',
        password: '',
        checkPass: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        repeat: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        name: [
          {validator: checkname, trigger: 'blur'}
        ]
      },
      userAvatar: this.$store.state.user.userInfo.avatar
    }
  },
  methods: {
    deleteUser () {
      MessageBox.confirm('是否执行注销操作', '提示', {
        lockScroll: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let config = {
          headers: {
            'Authorization': 'Token ' + this.$store.state.user.token
          }
        }
        this.$api.deleteUser(null, config).then(res => {
          Message.success('注销成功')
          setTimeout(() => {
            this.$store.commit('logOut')
            this.$router.push('/')
          }, 1000)
        }).catch(err => {
          this.error401(err)
        })
      }).catch(() => {
        Message.info('已取消退出')
      })
    },
    error401 (err) {
      if (err.response.status === 401) {
        MessageBox.alert('登录过期需要重新登录', '提示', {
          lockScroll: false,
          confirmButtonText: '确定',
          callback: action => {
            this.$store.commit('logOut')
            this.$router.push('/')
          }
        })
      }
    },
    handleUploaded (resp) {
      if (resp.msg === '修改成功') {
        Message.success('修改成功')
        this.userAvatar = resp.avatar
        this.$store.commit('updateUserInfo', {'avatar': this.userAvatar})
      } else {
        Message.success(resp.msg)
      }
    },
    uploadedError (resp, type, context) {
      if (context.status === 401) {
        Message.error('登录已过期')
      } else {
        Message.error(context.status + ' ' + context.statusText)
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let config = {
            headers: {
              'Authorization': 'Token ' + this.$store.state.user.token
            }
          }
          if (formName === 'updateForms') {
            let params = {
              'Password': this.ruleForm.password
            }
            this.$api.updatePassword(JSON.stringify(params), config).then(res => {
              if (res.msg === '修改成功') {
                Message.success('修改成功')
                this.dialogVisible = false
              } else {
                this.$store.commit('logOut')
                this.$router.push('/')
              }
            }).catch(err => {
              this.error401(err)
            })
          } else {
            let params = {
              'username': this.ruleForm.name,
              'school': this.ruleForm.school
            }
            this.$api.updateUserInfo(JSON.stringify(params), config).then(res => {
              if (res.msg === '修改成功') {
                this.edit = false
                Message.success('保存成功')
                this.$store.commit('updateUserInfo', params)
              } else {
                this.$store.commit('logOut')
                this.$router.push('/')
              }
            }).catch(err => {
              this.error401(err)
            })
          }
        } else {
          return false
        }
      })
    },
    editMessage () {
      this.edit = !this.edit
    }
  },
  created: function () {
    if (!this.$store.state.user) {
      this.$router.push('/')
    } else {
      let userInfo = this.$store.state.user.userInfo
      this.ruleForm.name = userInfo.username
      this.ruleForm.school = userInfo.school
    }
  }
}
</script>

<style lang="stylus" scoped>
  .left
    float left
  .right
    width: 945px
    float: right
    overflow: hidden
    .head
      border:1px solid #eaeaea
      color: #333
      height: 50px
      line-height: 50px
      text-indent: 20px
      font-size: 14px
      background-color #f8f8f8
    .info
      overflow hidden
      border-right 1px solid #eaeaea
      border-bottom 1px solid #eaeaea
      border-left 1px solid #eaeaea
      .l_border
        border-right 1px solid #eaeaea
  .avatar
    width: 160px
    border-radius: 6px
    display: block
    margin: 20px auto
  .card-img-overlay
    display: none
    transition: all 0.5s
    button
      margin-top: 20px
  .card:hover .card-img-overlay
    display: block
  .text-center
    position relative
    .card-img-overlay
      position absolute
      top 50%
      left 50%
      transform translate(-50%,-50%)
  .update
    border-top:1px solid #eaeaea
    margin-top:30px
    .button_group
      margin 50px
  .ruleForm
    margin-top 20px
</style>
