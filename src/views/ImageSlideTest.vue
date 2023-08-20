<template>
  <div style="height: 100%;width: 100%;overflow: hidden">
  <div class="banner" style="height: 100%;width: 100%;overflow: hidden">
    <div class="banner-slide" style="height: 100%;width: 100%;overflow: hidden">
      <img :src="nextBanner.image" width="100%" height="100%" alt="Next Banner Image" class="animate__animated" :class="classname_next" />
      <img :src="activeBanner.image" width="100%" height="100%" alt="Active Banner Image" class="animate__animated" :class="classname_active" />
    </div>
    <div class="mask"></div>
    <div class="home_head">
      <div class="head_title_box">
        <div style="color: #FFFFFF;font-size: 64px;letter-spacing: 0.13em;position: absolute;top:50%;transform: translateY(-61%);left: 26px">致真</div>
        <div style="color: #FFFFFF;font-size: 18px;font-family: 'Heiti-lighter';font-weight:100;position: absolute;top:29%;left: 180px">大厦</div>
        <div style="color: #FFFFFF;font-size: 18px;font-family: 'Heiti-lighter';font-weight:100;position: absolute;top:42%;left: 180px">物业管理系统</div>
        <img src="../assets/HomeView/icon_menu_line.svg" width="60" style="position: absolute;top:32%;left: 490px">
      </div>
      <div class="login_box">
        <div class="login_button" v-on:click="LoginIn">
          <img src="../assets/HomeView/arrow_right_up_line.svg" width="24px" style="position: absolute;top:50%;transform: translateY(-50%);left: 20px">
          <div style="font-family: 'Heiti-lighter';font-weight:200;color: #FFFFFF;font-size: 20px;position: absolute;top:52%;transform: translateY(-55%);left: 55px">从此登录</div>
        </div>
      </div>
    </div>
  </div>
    <div class="slogan_box" >
      <transition name="translate" appear>
        <img :src="activeSlogan.image" height="200" alt="Active Slogan" style="position: absolute;left: 140px" :class="classname_slogan_active"  />
      </transition>
      <transition name="translate" appear>
        <img :src="nextSlogan.image" height="200" alt="Next Slogan" style="position: absolute;left: 1280px;opacity: 0"  :class="classname_slogan_next_opacity"  />
      </transition>
      <transition name="translate" appear>
        <img :src="nextSlogan_block.image" height="200" alt="Next Slogan_block" style="position: absolute;left: 1280px;"  :class="classname_slogan_next"  />
      </transition>
      <transition name="translate" appear>
        <img :src="readySlogan.image" height="200" alt="Ready Slogan" style="position: absolute;left: 2420px"  :class="classname_slogan_ready"  />
      </transition>
    </div>
    <div class="mask" v-if="isLogin" style="z-index: 50;opacity: 0.3"></div>
    <div v-if="isLogin" class="login_shell ">
      <img src="../assets/HomeView/close_line.svg" v-on:click="CancelLogin" width="24" style="position: absolute;top: 26px;right: 26px;cursor: pointer">
      <div style="position: absolute;left: 35px;top:45px;font-family: 'heiti';font-style: normal;font-size: 32px;letter-spacing: 0.01em;color: #000000;">用户登录</div>
      <div style="position: absolute;left: 36px;top:80px;font-family: 'Roboto';font-weight:300;font-style: normal;font-size: 28px;letter-spacing: 0.02em;color: #000000;">LOGIN IN</div>
      <img src="../assets/HomeView/leftBottom_arrow.svg" width="56" style="position: absolute;left: 328px;top:50px">
      <div class="login_text" style="top:170px" :style="{borderColor:username_color,color:username_color}">
        <input class="i_input" v-model="username" :style="{color: username_color}" v-on:focus="username_focus" v-on:blur="username_blur">
        <div class="text_title" style="width: 80px">用户账号</div>
      </div>
      <div class="login_text" style="top:260px" :style="{borderColor:password_color,color: password_color}">
        <input class="i_input" v-model="password" type="password" :style="{color: password_color}" v-on:focus="password_focus" v-on:blur="password_blur">
        <div class="text_title" style="width: 50px">密码</div>
      </div>
      <div class="identity_choose" style="top: 350px;">
        <img :src="AnimisterUrl" style="position:absolute;left: 0;cursor: pointer" v-on:click="changeAnimister">
        <div class="identity_text" v-on:click="changeAnimister">我是管理员</div>
      </div>
      <div class="identity_choose" style="top: 385px;">
        <img :src="RepairmanUrl" style="position:absolute;left: 0;cursor: pointer" v-on:click="changeRepairman">
        <div class="identity_text" v-on:click="changeRepairman">我是维修人员</div>
      </div>
      <div class="loginIn_button" @click="login()">登 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</div>
      <div class="login_error" v-if="isError">
        <img src="../assets/HomeView/error_raise.svg" width="16" style="position: absolute;left: 10px;top:1px">
        <div style="position: absolute;left: 33px">{{ ErrorText }}</div>
      </div>
      <div class="error_warning">
        <img src="../assets/HomeView/error_warning.svg" width="18" style="position:absolute;left: 0">
        <div class="warning_text" style="font-weight: 700">遇到问题？</div>
        <div class="warning_text" style="left: 98px">联系电话 +86-13333333333</div>
      </div>
    </div>

  </div>
</template>

<script>
import 'animate.css';
export default {
  data() {
    return {
      testUrl:require("../assets/HomeView/home1.jpg"),
      testSlogan:require("../assets/HomeView/slogan2.svg"),
      classname_active:null,
      classname_next:null,
      classname_slogan_active:null,
      classname_slogan_next:null,
      classname_slogan_next_opacity:null,
      classname_slogan_ready:null,
      activeBanner: null,
      nextBanner: null,
      activeSlogan:null,
      nextSlogan:null,
      nextSlogan_block:null,
      readySlogan:null,
      isLogin:false,
      isError:false,
      ErrorText:"密码不能为空",
      AnimisterUrl:require("../assets/HomeView/unchecked.svg"),
      isAnimister:false,
      RepairmanUrl:require("../assets/HomeView/unchecked.svg"),
      isRepairman:false,
      userType:0,
      username:'',
      password:'',
      username_color:'#7D7D7D',
      password_color:'#7D7D7D',
      banners: [
        // Add your banner objects here
        { image: require("../assets/HomeView/home1.jpg")},
        { image: require("../assets/HomeView/home2.jpg") },
        { image: require("../assets/HomeView/home3.jpg") }
      ],
      slogans:[
        { image: require("../assets/HomeView/slogan1.svg")},
        { image: require("../assets/HomeView/slogan2.svg") },
        { image: require("../assets/HomeView/slogan3.svg") }
      ],
      slogans_block:[
        { image: require("../assets/HomeView/slogan1_block.svg")},
        { image: require("../assets/HomeView/slogan2_block.svg") },
        { image: require("../assets/HomeView/slogan3_block.svg") }
      ],
      currentIndex: 0
    };
  },
  created() {
    this.startBannerRotation();
  },
  methods: {
    login(){
      if(this.username===""){
        this.isError=true;
        this.ErrorText="用户名不能为空！";
      }else if(this.password===""){
        this.isError=true;
        this.ErrorText="密码不能为空！";
      }else {
        this.isError=false;
        if(this.isAnimister===true){
          this.userType=2;
        }
        else if(this.isRepairman===true){
          this.userType=3;
        }
        else{
          this.userType=1;
        }
        localStorage.setItem('usertype',this.userType)
        this.$axios({
          method: 'post',
          url: '/login',
          params: {
            type: this.userType,
            account_number: this.username,
            password: this.password
          }
        }).then(
            response => {
              console.log(this.userType+" "+this.username+" "+this.password)
              console.log(response.data.data.uuid)
              window.localStorage.setItem("uid",response.data.data.uuid);
              window.localStorage.setItem("username",response.data.data.name)
              console.log("localstorage"+window.localStorage.getItem('uid'));
              if(this.isAnimister===true){
                  localStorage.setItem('side_bar_status',5)
                this.$router.push('/manageHome')
              }
              else if(this.isRepairman===true){
                  localStorage.setItem('side_bar_status',1)
                this.$router.push('/filter_page')
              }
              else{
                this.$router.push('/guestHome')
                  localStorage.setItem('side_bar_status',1)
              }
            }
        ).catch(
            (error)=> {
              console.log(error.response.status);
              if (error.response.status === 401) {
                this.isError = true;
                this.ErrorText = "密码错误！"
              } else if (error.response.status === 404) {
                this.isError = true;
                this.ErrorText = "账户不存在！"
              }
            })
      }



    } ,
    startBannerRotation() {
      this.activeBanner = this.banners[this.currentIndex];
      this.nextBanner = this.banners[this.currentIndex];
      this.activeSlogan = this.slogans[this.currentIndex];
      this.nextSlogan = this.slogans[1];
      this.nextSlogan_block=this.slogans_block[1];
      this.readySlogan=this.slogans_block[2];
      this.classname_active='';
      this.classname_slogan_active='';
      this.classname_slogan_next='';
      this.classname_slogan_next_opacity='',
      this.classname_slogan_ready='';
      this.rotateBanner();
    },
    rotateBanner() {
      setInterval(() => {
        this.activeBanner = this.nextBanner;
        this.classname_active='';
        this.classname_next = 'animate__fadeIn';
        this.currentIndex = (this.currentIndex + 1) % this.banners.length;
        this.nextBanner = this.banners[this.currentIndex];
        this.nextSlogan = this.slogans[this.currentIndex];
        this.nextSlogan_block=this.slogans_block[this.currentIndex];
        this.readySlogan=this.slogans_block[(this.currentIndex + 1) % this.banners.length];
        this.classname_active='animate__fadeOut';
        this.classname_next='';
        this.classname_slogan_active='translate-animation_out';
        this.classname_slogan_next='translate-animation_out';
        this.classname_slogan_next_opacity='translate-animation_opacity';
        this.classname_slogan_ready='translate-animation_out';
        //this.banners[this.currentIndex].opacity = 0;
        this.fadeAnimation();
      }, 3000); // Change slide every 5 seconds (adjust as needed)
    },
    fadeAnimation() {
      setTimeout(() => {
        this.activeBanner=this.nextBanner;
        this.activeSlogan=this.nextSlogan;
        this.nextSlogan=this.slogans[(this.currentIndex+1)%this.slogans.length];
        this.nextSlogan_block=this.slogans_block[(this.currentIndex+1)%this.slogans.length];
        this.readySlogan=this.slogans_block[(this.currentIndex + 1) % this.banners.length];
        this.classname_active='';
        this.classname_next = '';
        this.classname_slogan_active='';
        this.classname_slogan_next='';
        this.classname_slogan_next_opacity='';
        this.classname_slogan_ready='';
      }, 1000); // Duration of fade animation (adjust as needed)
    },
    LoginIn(){
      this.isLogin=true;
    },
    CancelLogin(){
      this.isLogin=false;
    },
    changeAnimister(){
      if(this.isAnimister){
        this.isAnimister=false;
        this.AnimisterUrl=require("../assets/HomeView/unchecked.svg");
      }
      else if (!this.isRepairman){
        this.isAnimister=true;
        this.AnimisterUrl=require("../assets/HomeView/checked.svg");
      }
      else {
        this.isAnimister=true;
        this.AnimisterUrl=require("../assets/HomeView/checked.svg");
        this.isRepairman=false;
        this.RepairmanUrl=require("../assets/HomeView/unchecked.svg");
      }
    },
    changeRepairman(){
      if(this.isRepairman){
        this.isRepairman=false;
        this.RepairmanUrl=require("../assets/HomeView/unchecked.svg");
      }
      else if (!this.isAnimister){
        this.isRepairman=true;
        this.RepairmanUrl=require("../assets/HomeView/checked.svg");
      }
      else {
        this.isRepairman=true;
        this.RepairmanUrl=require("../assets/HomeView/checked.svg");
        this.isAnimister=false;
        this.AnimisterUrl=require("../assets/HomeView/unchecked.svg");
      }
    },
    username_focus(){
      this.username_color='#000000';
      this.password_color='#7D7D7D'
    },
    username_blur(){
      this.username_color='#7D7D7D';
    },
    password_focus(){
      this.username_color='#7D7D7D';
      this.password_color='#000000'
    },
    password_blur(){
      this.password_color='#7D7D7D';
    }
  },

};
</script>

<style>
:root {
  --animate-delay: 3s;
  --animate-duration: 1s;
}
.banner {
  position: absolute;
  width: 100%;
  height: 800px; /* Adjust as needed */
  overflow: hidden;
}

.banner-slide {
  position: fixed;
  width: 100%;
  height: 100%;
}

.banner-slide img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 1s;
}
.mask{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  background-color: #000000;
  opacity: 20%;
  z-index: 1;
}
.home_head{
  width: 86%;
  height: 23%;
  left: 7%;
  position: absolute;
  z-index: 2;
  border-bottom: solid 1px rgba(255,255,255,0.7);
}
.login_box{
  width: 18%;
  height: 80px;
  position: absolute;
  right: 0;
  bottom: 0;
  border-bottom: solid 1px rgba(255,255,255,1);
}
.login_button{
  width: 168px;
  height: 48px;
  border: 1.5px solid #FFFFFF;
  border-radius: 3px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  cursor: pointer;
}
.login_button:hover{
  border: 1.5px solid #E5E5E5;
}
.head_title_box{
  width: 600px;
  height: 200px;
  cursor: default;
}
.slogan_box{
  position: absolute;
  width: 100%;
  height: 280px;
  top: 54%;
  z-index: 5;
  overflow: hidden;
}

.translate-animation_out {
  animation: translateFromRightToLeft 1s ease-in-out;
  animation-fill-mode:forwards;
}
@keyframes translateFromRightToLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-1140px);
  }
}
.translate-animation_opacity {
  animation: translateFromLeftToRight 1s ease-in-out;
  animation-fill-mode:forwards;
}
@keyframes translateFromLeftToRight {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-1140px);
    opacity: 1;
  }
}
.login_shell{
  position: absolute;
  width: 480px;
  height: 600px;
  left: 50%;
  margin-left: -250px;
  top:50%;
  margin-top:-300px ;
  z-index: 100;
  background: #FFFFFF;
  filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.25));
  cursor: default;
  animation: slideInDown; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 0.2s; /* don't forget to set a duration! */
}
.login_text{
  border: 2px solid;
  border-radius: 3px;
  width: 350px;
  height: 45px;
  position: absolute;
  left: 162px;
  left: 50%;
  margin-left: -175px;
}
.text_title{
  font-size: 16px;
  letter-spacing: 0.02em;
  font-family: Heiti-lighter;
  background-color: #FFFFFF;
  position: absolute;
  left: 12px;
  top:-13px;
  text-align: center;
}
.identity_choose{
  position: absolute;
  height: 30px;
  width: 350px;
  left: 67px;
}
.identity_text{
  font-size: 14px;
  color: black;
  font-family: Heiti-lighter;
  position: absolute;
  top: -1px;
  left:25px;
  cursor: pointer;
}
.loginIn_button{
  background-color: black;
  width: 350px;
  height: 44px;
  position: absolute;
  top:430px;
  border-radius: 2px;
  left: 50%;
  margin-left: -175px;
  cursor: pointer;
  text-align: center;
  color: #FFFFFF;
  line-height: 44px;
  font-family: Heiti-lighter;
  font-size: 18px;
  letter-spacing: 0px;
}
.error_warning{
  position: absolute;
  height: 30px;
  width: 350px;
  left: 60px;
  top:516px;
}
.warning_text{
  font-size: 14px;
  color: black;
  font-family: Heiti-lighter;
  position: absolute;
  top: -1px;
  left:28px;
}
.i_input{
  width: 92%;
  height: 100%;
  border:0;
  background-color: transparent;
  margin-left: 1px;
  font-size: 16px;
}
.i_input:focus{
  width: 92%;
  height: 100%;
  border:0;
  outline:none;
  margin-left: 1px;
  background-color: transparent;
}
.login_error{
  position: absolute;
  top:316px;
  left:60px;
  width: 400px;
  font-family: Heiti-lighter;
  font-size: 12px;
  color: #CD5858;
}
</style>
