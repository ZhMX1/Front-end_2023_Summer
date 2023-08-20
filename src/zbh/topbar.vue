<template>
<div>
    <div style="margin-top: 0vh;">
    <el-card class="card" style="height: 10vh;">
        <img src="../zbh/img/logo.svg" style="float: left;width: 2vw;height: 4vh" >
        <div style="float: left;font-family: 'Adobe 宋体 Std L',serif;font-size: x-large;margin-left: 1vw"><b>致真大厦物业管理系统</b></div>

      <el-popover
          placement="bottom"
          trigger="hover"
          width="56"
      style="float: right">
        <div style="width: 50px">
          <el-button @click="logout" style="border: none">退出</el-button>
        </div>
        <el-button slot="reference" style="background-color: transparent; border: none; font-family: Heiti-lighter;font-size: 16px">你好，{{this.username}}
          <i class="el-icon-arrow-down"></i>
        </el-button>
      </el-popover>
      <router-link to="/RepairmanTimetable"><img src="../zbh/img/calendar.svg"  style="float: right;width: 6vh;height: 6vh" v-if="this.usertype==='3'" ></router-link>
      <!--        <img src="../zbh/img/profile.svg"  style="float: right;width: 6vh;height: 6vh">-->
<!--        <img src="../zbh/img/logout.svg"  style="float: right;width: 3vh;height: 3vh;cursor: pointer;margin-right: 1vw;margin-top: 1vh" @click="logout">-->
<!--        <img src="../zbh/img/Vector.svg"  style="float: right;width: 2.5vh;height: 2.5vh;margin-right: -5vw;margin-top: 1.5vh">-->
    </el-card>
    </div>
</div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "topbar",
    data(){
        return{
            usertype:'',
            username: ''
        }
    },
    methods:{
        logout(){
            this.$router.push('./')
        }
    },
    created() {
        this.usertype = localStorage.getItem('usertype');
        this.username= localStorage.getItem('username');
    }
}
</script>

<style>
.el-popover {
  min-width: 50px;
  padding-bottom: 0px;
  padding-left: 0;
  padding-top: 0;
}
</style>
