<template>
    <div id="app">
      <The-Header/>
      <login-dialog></login-dialog>
      <register-dialog></register-dialog>
      <div id="main-container" class="container main-container">
        <router-view/>
        <router-view name="section"/>
      </div>
    </div>
</template>

<script>
import TheHeader from '@/components/layouts/TheHeader'
import LoginDialog from '@/components/comment/LoginDialog'
import RegisterDialog from '@/components/comment/RegisterDialog'
export default {
  name: 'App',
  components: {
    TheHeader,
    LoginDialog,
    RegisterDialog
  }
}
</script>

<style lang="stylus" scoped>
  .wrap
    overflow hidden
  .wrap>>>.el-dialog
   overflow hidden !important
   width 400px !important
</style>
