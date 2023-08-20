<template>
  <div class="bg">
    <!-- 顶栏 -->
    <Topbar></Topbar>
    <!-- 侧栏 -->
    <Sidebar style="top: -12vh" :which="2"></Sidebar>
  <div>
    <div class="total">
      

      <!-- 页面内容 -->
      <div>
        <el-card style="
        position: absolute;
        top: 13vh;
        left: 17.3vw;
        width: 80vw;
        height: 80vh;
        padding-bottom: 0;
      ">
          <!-- 页面标题 -->
          <div class="title-bar">
            <div class="title">
              历史工单
              <img
                  src="../assets/guestOrder/title.svg"
                  style="
                width: 25px;
                height: 25px;
                position: absolute;
                top: 1vh;
                left: 7vw;
              "
              />
            </div>
            <!--          <div class="new-button"  @click="newVisible = true">-->
            <!--            <i class="el-icon-plus"></i>-->
            <!--            新建维修申请-->
            <!--          </div>-->
            <!--          <div class="select">-->
            <!--            <el-select v-model="value" placeholder="全部">-->
            <!--              <el-option-->
            <!--                v-for="item in options"-->
            <!--                :key="item.value"-->
            <!--                :label="item.label"-->
            <!--                :value="item.value"-->
            <!--              >-->
            <!--              </el-option>-->
            <!--            </el-select>-->
            <!--          </div>-->
          </div>

          <!-- 订单表头 -->
          <div class="list-title">
            <div style="position: absolute; left: 0%">工单编号</div>
            <div style="position: absolute; left: 10%">问题描述</div>
            <div style="position: absolute; left: 30%">报修房间号</div>
            <div style="position: absolute; left: 43%">联系人姓名</div>
            <div style="position: absolute; left: 57.5%">联系人号码</div>
            <div style="position: absolute; left: 75%">解决时间</div>
            <div style="position: absolute; left: 91.5%">状态</div>
          </div>

          <!-- 订单列表 -->
          <div class="list">
            <div v-for="(order, index) in orders" :key="index" class="order" @click="openDetail(index)">
              <div style="position: absolute; left: 3%">{{ order.id }}</div>
              <div style="position: absolute; left: 12%">{{ order.detail }}</div>
              <div style="position: absolute; left: 34%">{{ order.room }}</div>
              <div style="position: absolute; left: 47%">{{ order.name }}</div>
              <div style="position: absolute; left: 59%">{{ order.phone }}</div>
              <div style="position: absolute; left: 74.5%">
                <img
                    src="../assets/guestOrder/date.svg"
                    style="width: 15px; height: 15px; position: absolute; top: 10px"
                />
                <div style="position: absolute; top: -1.3vh; left: 20px; width: 90px;"> {{ order.date }} </div>
              </div>
              <div style="position: absolute; left: 74.5%; top: 3vh">
                <img
                    src="../assets/guestOrder/time.svg"
                    style="width: 18px; height: 18px; position: absolute; top: 1.5vh; left: -2px;"
                />
                <div style="position: absolute; top: -7px; left: 18px; width: 90px;"> {{ order.time }} </div>
              </div>
              <div style="position: absolute; left: 90%">
                <div v-show="order.status === 0" style="color: #202020">
                  <img
                      src="../assets/guestOrder/waiting.svg"
                      style="
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    top: 18px;
                  "
                  />
                  <p style="position: absolute; top: -15px; left: 24px; width: 50px;"> {{ statusCode[0] }} </p>
                </div>
                <div v-show="order.status === 1" style="color: #e04410">
                  <img
                      src="../assets/guestOrder/doing.svg"
                      style="
                    width: 18px;
                    height: 18px;
                    position: absolute;
                    top: 18px;
                  "
                  />
                  <p style="position: absolute; top: -15px; left: 24px; width: 50px;"> {{ statusCode[1] }} </p>
                </div>
                <div v-show="order.status === 2" style="color: #3fb89c">
                  <img
                      src="../assets/guestOrder/finish.svg"
                      style="
                    width: 18px;
                    height: 18px;
                    position: absolute;
                    top: 18px;
                  "
                  />
                  <p style="position: absolute; top: -15px; left: 24px; width: 50px;"> {{ statusCode[2] }} </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 翻页符 -->
          <div class="page">
            <el-pagination
                layout="prev, pager, next"
                :total="this.total"
                :page-size="6"
                @current-change="handlechange"
                :current-page="this.now_page"
                background
            >
            </el-pagination>
          </div>
        </el-card>
      </div>


      <el-dialog
          :visible.sync="newVisible"
          width="25%">
        <div class="submit-title" style="position: absolute; left: 20px; top: 40px;">维修申请</div>
        <div class="submit-subtitle" style="position: absolute; left: 27px; top: 85px;">Repair Register</div>
        <div style="position: absolute; top: 130px;">
          <input class="input-box" type="text" placeholder="维修房间号" ref="register.room">
          <img
              src="../assets/guestOrder/submit-room.svg"
              style="
          width: 25px;
          height: 25px;
          position: absolute;
          top: 0.5vh;
          right: 25px;
        ">
          <div class="time-box">
            <el-date-picker
                v-model="register.time"
                type="datetime"
                placeholder="预定维修时间">
            </el-date-picker>
          </div>
          <img
              src="../assets/guestOrder/submit-time.svg"
              style="
          width: 20px;
          height: 20px;
          position: absolute;
          top: 8vh;
          right: 27px;
        ">
          <input class="input-box"  style="margin-top: 7vh;" type="text" placeholder="联系人姓名" ref="register.name">
          <img
              src="../assets/guestOrder/submit-name.svg"
              style="
          width: 25px;
          height: 25px;
          position: absolute;
          top: 15vh;
          right: 25px;
        ">
          <input class="input-box" type="text" placeholder="联系人手机号码" ref="register.phone">
          <img
              src="../assets/guestOrder/submit-phone.svg"
              style="
          width: 23px;
          height: 23px;
          position: absolute;
          top: 22vh;
          right: 25px;
        ">
          <textarea class="detail-box" type="text" placeholder="请输入具体问题描述" ref="register.detail"></textarea>
        </div>


        <div class="submit-button" @click="submitReg()">
          提交申请 &nbsp;&nbsp;&nbsp;&nbsp;
          <img
              src="../assets/guestOrder/submit.svg"
              style="
          width: 23px;
          height: 23px;
          position: absolute;
          top: 10px;
        ">
        </div>
      </el-dialog>

      <el-drawer
          :visible.sync="detailVisible"
          :with-header="false"
          direction="rtl"
          size="35%">
        <Detailbar :info="this.checkItem"></Detailbar>
      </el-drawer>
    </div>
  </div>
  </div>
</template>

<script>
import Topbar from "../zbh/topbar.vue";
import Sidebar from "../zbh/sidebar.vue";
import Detailbar from "../components/history_OrderDetail.vue";
export default {
  components: { Topbar, Sidebar, Detailbar},
  data() {
    return {
      uid: localStorage.getItem("uid"),
      orders: [
        // {
        //   id: 1111,
        //   detail: "空调声音异常，且无制热...",
        //   room: "6F-507",
        //   name: "Rmakant",
        //   phone: "+91 52345 64545",
        //   date: "2023/05/13",
        //   time: "15:30:32",
        //   status: 0, //0待处理，1维修中 2已完成
        // },
        // {
        //   id: 1112,
        //   detail: "空调声音异常，且无制热...",
        //   room: "6F-507",
        //   name: "Rmakant",
        //   phone: "+91 52345 64545",
        //   date: "2023/05/13",
        //   time: "15:30:32",
        //   status: 1, //0待处理，1维修中 2已完成
        // },
        // {
        //   id: 1113,
        //   detail: "空调声音异常，且无制热...",
        //   room: "6F-507",
        //   name: "Rmakant",
        //   phone: "+91 52345 64545",
        //   date: "2023/05/13",
        //   time: "15:30:32",
        //   status: 2, //0待处理，1维修中 2已完成
        // },
        // {
        //   id: 1114,
        //   detail: "空调声音异常，且无制热...",
        //   room: "6F-507",
        //   name: "Rmakant",
        //   phone: "+91 52345 64545",
        //   date: "2023/05/13",
        //   time: "15:30:32",
        //   status: 0, //0待处理，1维修中 2已完成
        // },{},{},
      ],
      statusCode: ["待处理", "已受理", "已完成"],
      options: [
        {
          value: "选项1",
          label: "全部",
        },
        {
          value: "选项2",
          label: "水",
        },
        {
          value: "选项3",
          label: "电",
        },
        {
          value: "选项4",
          label: "机械",
        },
      ],
      newVisible: false,
      detailVisible: false,
      register: [{
        room: "",
        time: "",
        name: "",
        phone: "",
        detail: "具体描述",
      }],
      checkID:0,
      checkItem:'',
      now_page:1,
      page:1,
      total:1,
    };
  },
  methods: {
    submitReg(){
      this.newVisible = false;
    },
    openDetail(id){
      this.detailVisible = true;
      this.checkItem = JSON.parse(JSON.stringify(this.orders[id]));
    },
    handlechange(val){//处理跳转，page为当前选中的页面
      console.log("dqym:"+val)
      this.now_page = val;
      sessionStorage.setItem('now_page',JSON.stringify(val));
      this.getlist(val);
      //this.openFullScreen2();
    },
    getlist(page){
      this.$axios({
      method: 'get',
      url: '/worksheet/get',
      params: {
        type: 3,
        uuid: this.uid,
        page:page,
        page_size:6
      }
    }).then(
        response => {
          console.log(response);
          console.log(response.data.msg);
          this.orders = response.data.data;
          this.total=response.data.total
          if (response.status === 200){
            // this.$message({
            //   message: '获取订单列表成功',
            //   type: 'success'
            // });
            var len = 0;
            len = response.data.data.length;
            for(var i=0; i<len;  i++){
              //console.log(response.data.data);
              this.orders[i].id = response.data.data[i].uuid;
              if(this.orders[i].id.length>6){//处理一下过长的ID
                this.orders[i].id = this.orders[i].id.substring(0,6);
              }

              this.orders[i].detail = response.data.data[i].description;
              if(this.orders[i].detail.length>20){//处理一下过长的描述
                this.orders[i].detail = this.orders[i].detail.substring(0,20)+"...";
              }
              this.orders[i].room = response.data.data[i].report_room;
              this.orders[i].name = response.data.data[i].report_person;
              this.orders[i].phone = response.data.data[i].report_phone;
              this.orders[i].date = response.data.data[i].end_time.substring(0,10);
              this.orders[i].time = response.data.data[i].end_time.substring(11,19);
              this.orders[i].status = response.data.data[i].status;
            }
            console.log("成功获取订单列表");
          }
          else if (response.status === 404) {
            this.$message.error('公司不存在');
          }
        }
    ).catch(
      ()=> {
        // console.log(error.response.status);
      })
    }
  },
  mounted(){
    this.uid = localStorage.getItem("uid");
    this.getlist(1);
  }
};
</script>

<style scoped>
.title-bar {
  /* position: relative; */
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  /* margin-bottom: -2vh; */

  display: flex;
  /* 挤不下换行 */
  flex-wrap: wrap;
  /* 展开铺满，justify-content:center;则代表居中 */
  justify-content: space-between;
}
.title {
  position: relative;
  left: 1vw;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 40px;
  color: #202020;
}
.list-title {
  position: relative;
  margin-top: 3vh;
  margin-left: 3%;
  font-family: "Montserrat";
  font-style: SemiBold;
  font-size: 16px;
  line-height: 20px;
  line-height: 100%;
}
.list {
  position: relative;
  top: 35px;

  font-family: "Montserrat";
  font-style: "SemiBold";
  font-size: 16px;
  line-height: 20px;
  line-height: 100%;
}
.order {
  position: relative;
  width: 100%;
  height: 55px;

  margin-top: 2vh;
  margin-bottom: 2vh;
  border-radius: 10px;
  background: #f5f6fa;
  line-height: 55px;
  cursor: pointer;
}
.order:hover{
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.page {
  position: absolute;
  z-index: 5;
  bottom: 15px;
  padding-top: 6vh;
  width: 100%;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #3FB89C;
  color: #fff;
}
/deep/ .el-dialog{
  border-radius: 7px;
  height: 70vh;
}
/deep/ .el-dialog__body {
  padding: 20px 0px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
  border-radius: 5px;
}
/deep/ .el-dialog__header {
  padding: 0.5px 1px 15px;
  background: #E04410;
}
.submit-title{
  font-family: "Montserrat";
  font-style: "SemiBold";
  font-size: 32px;
  color: #1E2355;
  line-height: 39px;
  line-height: 100%;
  margin-bottom: 1vh;
  margin-left: 2vh;
}
.submit-subtitle{
  font-family: "Poppins";
  font-style: "Light";
  font-size: 20px;
  line-height: 30px;
  line-height: 100%;
  color: #AEB0C2;
  line-height: 39px;
  line-height: 100%;
  margin: 1vh;
}
.input-box{
  width: 80%;
  height: 4vh;
  margin-bottom: 3vh;
  border: none;
  border-bottom: 2px solid #b8b8b8;

  font-family: "Poppins";
  font-style: Medium;
  font-size: 14px;
}
.input-box:focus{
  outline: none;
  border-bottom: 2px solid black;
}
.time-box{
  position: absolute;
  left: 9%;
  margin-top: -3px;
}
.detail-box{
  width: 80%;
  height: 80px;
  resize: none;
  margin-bottom: 3vh;
  border: 2px solid #b8b8b8;
  border-radius: 3px;
  font-family: "Poppins";
  font-style: Medium;
  font-size: 14px;
}
.submit-button{
  position: absolute;
  bottom: 2vh;
  left: 32px;
  width: 200px;
  height: 40px;
  background: #E04410;
  margin: 1vh auto;

  color: white;
  font-family: Poppins;
  font-style: SemiBold;
  font-size: 22px;
  line-height: 40px;
}
.bg{
  width: 100vw;
  height: 100vh;
  left: 0;
  top:0;
  background-image:url('../assets/bg/Frame 57.svg') ;
  background-size:70% 100%;
  background-position:50px 2000px;
}
</style>
