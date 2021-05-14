<template>
  <div>
    <nav class="nav nav-top">
      <div class="nav-header">
        <div class="logo-wrapper clearfix">
          <router-link :to="{ name: 'index'}" class="logo">博客</router-link>
        </div>
      </div>
    </nav>
    <div class="signUp-container">
      <div class="signUp-box">
        <div class="signUp-title">
          <h2>dwj-vBlog 注册平台</h2>
          <p>基于element-ui的极致体验</p>
        </div>
        <div class="avatar">
          <img :src="signUpForm.avatarUrl"/>
        </div>
        <div class="signUp-form-wrapper">
          <form>
            <el-form ref="signUpForm" :model="signUpForm" :rules="rules">
              <el-form-item prop="userName">
                <el-input
                  class="signUp-input"
                  placeholder="用户名"
                  prefix-icon="fa-user fa"
                  v-model="signUpForm.userName">
                </el-input>
              </el-form-item>
              <el-form-item prop="email">
                <el-input
                  type="email"
                  class="signUp-input"
                  placeholder="输入绑定邮箱"
                  prefix-icon="fa-thumb-tack fa"
                  v-model="signUpForm.email">
                </el-input>
              </el-form-item>
              <el-form-item prop="userPassword">
                <el-input
                  type="password"
                  class="signUp-input"
                  placeholder="密码"
                  prefix-icon="fa-lock fa"
                  v-model="signUpForm.userPassword">
                </el-input>
              </el-form-item>
              <el-form-item prop="password1">
                <el-input
                  type="password"
                  class="signUp-input"
                  :class="[isPassVerify? 'red':'']"
                  placeholder="再输入一次密码"
                  :prefix-icon="isPassVerify? 'fa fa-check': 'fa fa-lock'"
                  v-model="signUpForm.password1">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="signUpSystem('signUpForm')" class="signUp-button">Sign up</el-button>
              </el-form-item>
            </el-form>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signUp',
  data () {
    return {
      imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp', 'JPG', 'JPEG', 'GIF', 'PNG', 'BMP', 'WEBP'],
      mageUploadURL: '/api/article/uploadImage',
      signUpUrl: '/user/signUp',
      isPassVerify: false,
      signUpForm: {
        userName: '',
        email: '',
        userPassword: '',
        password1: '',
        avatarUrl: '/static/img/umbrella.3be585d.png'
      },
      rules: {
        userName: [
          { required: true, message: '输入不能为空', trigger: 'change' }
        ],
        email: [
          { required: false, trigger: 'change' }
        ],
        userPassword: [
          { required: true, message: '输入不能为空', trigger: 'change' }
        ],
        password1: [
          { required: true, message: '输入不能为空', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    document.onkeydown = () => {
      if (window.event && window.event.keyCode === 13 && this.$route.name === 'signUp' && this.isPassVerify) {
        this.signUpSystem('signUpForm')
      }
    }
  },
  methods: {
    signUpSystem (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.signUpForm.password1 !== this.signUpForm.userPassword) {
            this.$message.error('两次输入密码不一致')
          } else {
            this.isPassVerify = true
            this.axios.post(this.signUpUrl, this.signUpForm,
              {headers: {'Content-Type': 'application/json'}}).then(response => {
              if (response.data.code === 0) {
                this.$router.push({name: 'login'})
              }
            }).catch(error => {
              if (error.data.code === 1009) {
                this.$message.error('该用户名已存在')
              }
            })
          }
        }
      })
    }
  }
}

</script>

<style scoped lang="less">
  @import '../../../common/css/theme';
  .signUp-container{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    margin-top: 150px;
    display: flex;
    .signUp-box{
      width: 375px;
      margin: 0 auto;
      box-sizing: border-box;
      .avatar{
        display: inline-block;
        height: 100px;
        line-height: 100px;
        margin-left: 100px;
        padding: 8px 38px;
        box-sizing: border-box;
        position: relative;
        img{
          height: 100px;
          line-height: 100px;
          width: 100px;
          border-radius: 50%;
          border: 1px solid #eee;
          transition: box-shadow 0.3s;
          -webkit-transition: box-shadow 0.3s;
        }
      }
      .avatar img:hover{
        box-shadow:5px 5px 10px gray;
      }
      .signUp-title{
        text-align: center;
        h2{
          margin-bottom: 10px;
          font-weight: 300;
          font-size: 30px;
          color: #333;
        }
        p{
          color: #999;
          font-size: 16px;
        }
      }
      .signUp-form-wrapper{
        padding: 20px;
        .signUp-input{
          width: 100%;
        }
        .warn{
          font-color: red;
        }
        .signUp-button{
          color: #FFF;
          background-color: @btn-color;
          border-color: @btn-color;
          opacity: .75;
          &.is-disabled{
            background-color: @btn-disabled-color;
            border-color: @btn-disabled-color;
            opacity: 1;
          }
          width: 100%;
          &:focus{
            background-color: @btn-color;
            border-color: @btn-color;
            opacity: .75;
          }
          &:active{
            background-color: @btn-color;
            border-color: #fb1b1b;
            opacity: 1;
          }
          &:hover{
            background-color: @btn-color;
            border-color: @btn-color;
            opacity: 1;
          }
          &.is-disabled:hover {
            color: #fff;
            background-color: @btn-disabled-color;
            border-color: @btn-disabled-color;
            opacity: 1;
          }
        }
      }
    }
  }
</style>
