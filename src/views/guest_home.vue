<template>
  <div style="width:100%;height:100%;overflow: hidden">
    <!-- 顶栏 -->
    <Topbar></Topbar>
    <!-- 侧栏 -->
    <Sidebar style="position:absolute;top: -2.1vh" :which="3"></Sidebar>

    <!-- 跳转部分 -->
    <el-card style="
      position: absolute;
      top: 13vh;
      left: 17.3vw;
      width: 58vw;
      height: 34vh;
    ">
      <div class="visitor" @click="jpInvite()">
        <div class="ch-title">访客申请</div>
        <div class="eng-title">Visitor Request</div>
        <img src="../assets/guestOrder/home/invite.png" width="140" class="jump-img" style="top:7vh;right: 0vw">
      </div>
      <div class="repair" @click="jpRepair()">
        <div class="ch-title">维修申请</div>
        <div class="eng-title">Service Request</div>
        <img src="../assets/guestOrder/home/repair.png" width="140" class="jump-img">
      </div>
    </el-card>
    <el-card style=" position: absolute;
      overflow: auto;
      top: 49.9vh;
      left: 17.3vw;
      width: 58vw;
      height: 44.2vh;"
    >
        <div style="font-size: 18px;font-family: Heiti-lighter;font-weight: 700;position: absolute;top:2.6vh;left:2vw">本公司租单</div>
      <img src="../assets/guestHome/company.svg" width="23" style="position: absolute;top:2.8vh;left: 8.4vw">
      <div style="position: absolute;width: 54vw;height: 33.6vh;top:7.8vh;left:2.2vw;overflow: auto">
      <div v-for="item in orderList" :key="item.uuid" class="rent_order">
        <div style="line-height: 48px;position: absolute;width: 100%">
        <img src="../assets/guestHome/room.svg" width="22" style="position: absolute;left: 1vw;line-height: 48px;top:13px">
              <div style="text-align: left;position: absolute;left: 2.8vw;width: 20vw;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Heiti-lighter"><b>&nbsp;房间号</b>&nbsp;&nbsp;&nbsp;&nbsp;{{item.rooms}}</div>
          <img src="../assets/guestHome/time.svg" width="21" style="position: absolute;left: 22vw;line-height: 48px;top:14px">
              <div  style="text-align: left;position: absolute;left: 23.8vw;width: 13vw;font-family: Heiti-lighter"><b>&nbsp;开始时间</b>&nbsp;&nbsp;&nbsp;&nbsp;{{item.start_time}}</div>
          <img src="../assets/guestHome/time.svg" width="21" style="position: absolute;left: 38vw;line-height: 48px;top:14px">
              <div  style="text-align: left;position: absolute;left: 39.8vw;width: 13vw;font-family: Heiti-lighter"><b>&nbsp;结束时间</b>&nbsp;&nbsp;&nbsp;&nbsp;{{item.end_time}}</div>
        </div>
      </div>
      </div>
    </el-card>
    <!-- 右侧消息栏 -->
    <el-card style="
      position: absolute;
      top: 13vh;
      right: 2vw;
      width: 20vw;
      height: 81vh;
      overflow: hidden;
    ">
<!--      <div class="msg-title">消息列表</div>-->
        <el-card style="height: 24vh;background:linear-gradient(138deg, #55CABA 0%, rgba(119, 207, 168, 0.86) 66.98%, #B8D990 100%);border-radius: 4px">
            <div style="width: 7vw;height: 14vh;background-color: white;float: left; border-radius: 5px;">
                <img src="../zbh/img/typcn_user.png" alt="" style="margin-top: 1vh">
            </div>
            <div style="float: left;font-size: 26px;color: #FFFFFF;margin-left: 1.5vw;margin-top: 4vh;font-family: Heiti-lighter"><b>{{this.name}}</b></div>
            <div class="welcome" style="float: left;font-size: 15px;color: #FFFFFF;margin-top: 2.3vh;margin-left: 3vw;font-family: Heiti-lighter;letter-spacing: 2px">欢迎您使用本系统！</div>
        </el-card>
        <div class="summary_block" style="top:31vh" >
          <img src="../assets/guestHome/daichuli.svg" width="20" style="position: absolute;left: 2vw;top:2.7vh">
            <div style="" @click="this.togongdan" >待处理工单数&nbsp;&nbsp;</div>
          <div class="summary_data" ><b>{{this.num_daichuli}}</b></div>
        </div>
        <div class="summary_block" style="top:41vh">
          <img src="../assets/guestHome/weishouli.svg" width="20" style="position: absolute;left: 2vw;top:2.7vh">
            <div style="" @click="this.togongdan">已受理工单数&nbsp;</div>
          <div class="summary_data" style="color: #FFD176"><b>{{this.num_yishouli}}</b></div>
        </div>
        <div class="summary_block" style="top:51vh">
          <img src="../assets/guestHome/yichuli.svg" width="20" style="position: absolute;left: 2vw;top:2.7vh">
            <div style="" @click="this.togongdan">已完成工单数&nbsp;</div>
          <div class="summary_data" style="color: #4FCCA9"><b>{{this.num_yiwancheng}}</b></div>
        </div>
        <div class="summary_block" style="top:61vh">
          <img src="../assets/guestHome/history.svg" width="20" style="position: absolute;left: 2vw;top:2.7vh">
            <div style="" @click="this.tofangke">历史访客人数&nbsp;&nbsp;</div>
          <div class="summary_data" style="color: #1E2355"><b>{{this.num_fangke}}</b></div>
        </div>

    </el-card>
  </div>
</template>

<script>
import Topbar from "../zbh/topbar.vue";
import Sidebar from "../zbh/sidebar.vue";
export default {
  components: { Topbar, Sidebar},
  data() {
    return {
        uid:'',
        name:'',
        total:0,
        orders:[],
        num_daichuli:0,
        num_yishouli:0,
        num_yiwancheng:0,
        num_fangke:0,
        orderList: [],
    };
  },
  methods: {
    togongdan(){
      this.$router.push('/guestOrder')
        localStorage.setItem('side_bar_status','3')
    },
    tofangke(){
        this.$router.push('/guestInvite')
        localStorage.setItem('side_bar_status','2')
    },
    jpInvite(){
      localStorage.setItem('side_bar_status','2')
      localStorage.setItem('visible', 1)
      this.$router.push('/guestInvite')
    },
    jpRepair(){
      localStorage.setItem('side_bar_status','3')
      localStorage.setItem('visible', 1)
      this.$router.push('/guestOrder')
    }
  },
  mounted() {
      this.uid = localStorage.getItem("uid");
      console.log("主页获取uid"+this.uid);
      //获取用户名
      this.$axios({
          method: 'get',
          url: '/company',
          params:{
              uuid: this.uid
          }
      }).then((res) => {
          console.log("获取公司联系人", res.data.data.contact_person);
          this.name = res.data.data.contact_person;
          // this.$message.success(res.data.msg);
      }).catch(error=> {
              console.log("error", error);
          }
      )
      //获取用户工单数目
      this.$axios({
          method: 'get',
          url: '/worksheet/get',
          params: {
              type: 4,
              uuid: this.uid,
              page:1,
              page_size:100
          }
      }).then(
          response => {
              console.log("获取列表ing",response.data);
              console.log(response.status);
              this.orders = response.data.data;
              var i;
              for(i=0;i<this.orders.length;i++){
                  console.log(this.orders[i].status)
                  if(this.orders[i].status===0){
                      this.num_daichuli++;
                  }
                  else if(this.orders[i].status===1){
                      this.num_yishouli++;
                  }
                  else{
                      this.num_yiwancheng++;
                  }
              }
              console.log("工单"+this.num_daichuli+" "+this.num_yishouli+" "+this.num_yiwancheng)
              this.total=response.data.total
              console.log("工单总数为"+this.total)
              if (response.status === 200){
                  console.log("成功获取维修工单列表", this.orders);
              }
              else if (response.status === 404) {
                  this.$message.error('公司不存在');
              }
          }
      ).catch(
          ()=> {
              // console.log(error.response.status);
          })
      this.$axios({
          method: 'post',
          url: '/visitor/list',
          data: {
              "company_uuid": this.uid,
              "status": 3, //0:未到访 1:正在访问 2:结束访问 3:所有访客
          }
      }).then(
          response => {
              console.log("获取访客列表",response.data.visitor_list.length);
              this.num_fangke = response.data.visitor_list.length
          }
      ).catch(
          ()=> {
              // console.log(error.response.status);
          })
      this.$axios({
          method: 'get',
          url: '/company/lease-order',
          params:{
              uuid: this.uid
          }
      }).then((res) => {
          this.orderList = res.data.data;
          console.log("获取公司租赁订单", this.orderList);
          var i;
          for(i=0;i<this.orderList.length;i++){
              this.orderList[i].start_time = this.orderList[i].start_time.substring(0,10)
              this.orderList[i].end_time = this.orderList[i].end_time.substring(0,10)
              console.log(this.orderList[i].start_time)
          }
          if (res.data.status === 200) {
              this.$message.success(res.data.msg)
          }
      }).catch(error=> {
              console.log("error", error);
          }
      )
  }
};
</script>

<style scoped>
.visitor{
  position: absolute;
  top: 13%;
  left: 4.4vw;
  width: 23vw;
  height: 74%;
  border-radius: 8px;
  background: #3FB89C;
  color:white;
  font-family: "Poppins";
  font-style: Light;
  font-size: 26px;
  line-height: 39px;
  line-height: 100%;
  overflow: hidden;
  cursor: pointer;
}
.visitor:hover{
  transition: 0.3s;
  transform-origin: center;
  background-color: #47C9AB;
  box-shadow: 0px 2px 24px 0px rgba(63, 184, 148, 0.45);
}
.repair{
  position: absolute;
  top: 13%;
  right: 4.4vw;
  width: 23vw;
  height: 74%;

  border-radius: 8px;
  background: #E04410;
  overflow: hidden;
  color:white;
  cursor: pointer;
}
.repair:hover{
  transition: 0.3s;
  transform-origin: center;
  background-color: #F65320;
  box-shadow: 0px 2px 24px 0px rgba(246, 83, 32, 0.45);
}
.ch-title{
  position: absolute;
  left: 7%;
  top: 18%;
  font-family: "Heiti-lighter";
  font-size: 32px;
  line-height: 34px;
}
.eng-title{
  position: absolute;
  left: 8%;
  top: 38%;
  font-family: "Roboto Light";
  font-size: 20px;
}
.jump-img{
  position: absolute;
  bottom: 0;
  right: 0;
}
.msg-title{
  position: absolute;
  left: 25px;
  top: 25px;

  font-family: "Montserrat";
  font-style: SemiBold;
  font-size: 20px;
  line-height: 24px;
  line-height: 100%;
}

::-webkit-scrollbar {
   width: 0px;
   height: 0px;
 }
.rent_order {
  background-color: #F5F6FA;
  width: 100%;
  height: 48px;
  border-radius: 3px;
  margin-bottom: 10px;
  cursor: default;
  box-shadow: 0 1px 3px rgba(120, 197, 207, 0.15);
}
.welcome {
  font-family: "Montserrat";
  font-style: Medium;
  /* font-size: 36px; */
  /* line-height: 54px; */
  line-height: 100%;
}
.summary_block{
  height: 8vh;
  background-color: #FFFFFF;
  border-radius: 11px;
  cursor: pointer;
  color: #202020;
  font-weight: 700;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  font-family: Heiti-lighter;
  line-height:8vh;
  padding-left: 3.9vw;
  text-align: left;
  position: absolute;
  width: 65%;
  left: 8%;
  z-index: 5;
}
.summary_block:hover{
  box-shadow: 0 0 16px rgba(0,0,0,0.15);
}
.summary_data{
  position: absolute;
  z-index: 1000;
  left: 13vw;
  top: 0.0vh;
  font-family: "Roboto Light";
  font-size: 24px;
  color: #E9601D;
}
</style>
