<template>
  <div>
    <!-- 顶栏 -->
    <Topbar></Topbar>
    <!-- 侧栏 -->
    <Sidebar style="position:absolute;top: -2.1vh" :which="3"></Sidebar>

    <!-- 页面内容 -->
    <div>
      <el-card style="
        position: absolute;
        top: 13vh;
        left: 17.3vw;
        width: 80vw;
        height: 81vh;
        padding-bottom: 0;
      ">
        <!-- 页面标题 -->
        <div class="title-bar">
          <div class="title">
            历史工单
            <img
              src="../assets/guestOrder/history.svg"
              width="24"
              style="
                position: absolute;
                top: 1.1vh;
                left: 6vw;
              "
            />
          </div>
          <div class="new-button"  @click="newRepair()">
            <i class="el-icon-plus"></i>
            新建维修申请
          </div>
          <!-- <div class="select">
            <el-select v-model="value" placeholder="全部">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div> -->
        </div>

        <!-- 订单表头 -->
        <div class="list-title">
          <div style="position: absolute; left: 0%">工单编号</div>
          <div style="position: absolute; left: 9.2%">问题描述</div>
          <div style="position: absolute; left: 30.1%">报修房间号</div>
          <div style="position: absolute; left: 43%">联系人姓名</div>
          <div style="position: absolute; left: 57.1%">联系人号码</div>
          <div style="position: absolute; left: 73.6%">报修时间</div>
          <div style="position: absolute; left: 90.0%">状态</div>
        </div>

        <!-- 订单列表 -->
        <div class="list">
          <div v-for="(order, index) in orders" :key="index" class="order" @click="openDetail(index)">
            <div style="position: absolute; left: 3%">{{ order.id }}</div>
            <div style="position: absolute; left: 12%;width: 15vw;text-align: left;  overflow: hidden; white-space: nowrap;text-overflow: ellipsis;">{{ order.detail }}</div>
            <div style="position: absolute; left: 32.5%">{{ order.room }}</div>
            <div style="position: absolute; left: 45.1%">{{ order.name }}</div>
            <div style="position: absolute; left: 58.5%">{{ order.phone }}</div>
            <div style="position: absolute; left: 74.5%">
              <img
                src="../assets/guestOrder/date.svg"
                style="width: 15px; height: 15px; position: absolute; top: 9px"
              />
              <div style="position: absolute; top: -1.3vh; left: 20px; width: 90px;font-size: 15px"> {{ order.date }} </div>
            </div>
            <div style="position: absolute; left: 74.5%; top: 2.6vh">
              <img
                src="../assets/guestOrder/time.svg"
                style="width: 18px; height: 18px; position: absolute; top: 1.5vh; left: -2px;"
              />
              <div style="position: absolute; top: -7px; left: 9px; width: 90px;font-size: 15px"> {{ order.time }} </div>
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
        <!-- <input class="input-box" type="text" placeholder="维修房间号" v-model="register.room"> -->
        <div class="time-box">
          <el-select v-model="register.room" placeholder="维修房间号" @change="handleSelectChange">
            <el-option
              v-for="item in room_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <img
          src="../assets/guestOrder/submit-room.svg"
          style="
          width: 25px;
          height: 25px;
          position: absolute;
          top: 0.5vh;
          right: 25px;
        ">
        <div style="height: 7vh;"></div>
        <div class="time-box">
          <el-date-picker
            v-model="register.time"
            type="datetime"
            :placeholder= "defaultDate"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            :default-value = 'defaultTime'>
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
        <input class="input-box"  style="margin-top: 7vh;" type="text" placeholder="联系人姓名" v-model="register.name">
        <img
          src="../assets/guestOrder/submit-name.svg"
          style="
          width: 25px;
          height: 25px;
          position: absolute;
          top: 15vh;
          right: 25px;
        ">
        <input class="input-box" type="text" placeholder="联系人手机号码" v-model="register.phone">
        <img
          src="../assets/guestOrder/submit-phone.svg"
          style="
          width: 23px;
          height: 23px;
          position: absolute;
          top: 22vh;
          right: 25px;
        ">
        <textarea class="detail-box" type="text" placeholder="请输入具体问题描述" v-model="register.detail"></textarea>
      </div>


      <div class="submit-button" @click="submitReg()">
        提交申请 &nbsp;&nbsp;
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
</template>

<script>
import Topbar from "../zbh/topbar.vue";
import Sidebar from "../zbh/sidebar.vue";
import Detailbar from "../components/guest_OrderDetail.vue";
export default {
  components: { Topbar, Sidebar, Detailbar},
  data() {
    return {
      defaultTime: new Date(), //当前时间
      uid: localStorage.getItem("uid"),
      companyInfo: {
        contact_person: "",
        contact_phone: "",
      },
      orders: [
        // {
          // id: 1111,
          // detail: "空调声音异常，且无制热...",
          // room: "6F-507",
          // name: "Rmakant",
          // phone: "+91 52345 64545",
          // date: "2023/05/13",
          // time: "15:30:32",
          // status: 0, //0待处理，1维修中 2已完成
          // appoint_time: "16:00:00",
          // worker_name: "张三",
          // worker_phone: "+91 52345 64545",
        // },
        // {
          // id: 1112,
          // detail: "空调声音异常，且无制热...",
          // room: "6F-507",
          // name: "Rmakant",
          // phone: "+91 52345 64545",
          // date: "2023/05/13",
          // time: "15:30:32",
          // status: 1, //0待处理，1维修中 2已完成
          // appoint_time: "16:00:00",
          // worker_name: "张三",
          // worker_phone: "+91 52345 64545",
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
        //   appoint_time: "16:00:00",
        //   worker_name: "张三",
        //   worker_phone: "+91 52345 64545",
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
        //   appoint_time: "16:00:00",
        //   worker_name: "张三",
        //   worker_phone: "+91 52345 64545",
        // },
        // {},
        // {},
      ],
      statusCode: ["待处理", "已受理", "已完成"],
      value:'',
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
      roomList:'',
      room_value:'',
      room_options: [
        // {
        //   value: 0,
        //   label: "全部",
        // },
        // {
        //   value: 0,
        //   label: "全部",
        // },
        // {
        //   value: 0,
        //   label: "全部",
        // }
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
      defaultDate: "",
      checkID:0,
      checkItem:'',
      now_page:1,
      page:1,
      total:0,
    };
  },
  methods: {
    newRepair(){
      this.getNowTime();
      // this.getCompanyById(this.uid);
      // console.log("get company info")
      this.getCompanyRentInfo();
      this.register.name = this.companyInfo.contact_person;
      this.register.phone = this.companyInfo.contact_phone;
      this.newVisible = true;
    },
    submitReg(){
      if(typeof(this.register.time)=="undefined"){
        this.register.time=this.defaultDate.toString();
      }
      // console.log("info", this.register);
      this.$axios({
        method: 'post',
        url: '/worksheet/create',
        data: {
          appoint_time: this.register.time.substring(0, 10)+" "+this.register.time.substring(11, 16)+":00",
          description: this.register.detail,
          report_company_uuid: this.uid,
          report_person: this.register.name,
          report_phone: this.register.phone,
          report_room: this.room_options[this.register.room].label,
        }
      }).then(
          response => {
            console.log(response);
            console.log(response.data.msg);
            if (response.data.code === 200){
              this.$message({
                message: '维修申请成功',
                type: 'success'
              });
              this.newVisible = false;
              console.log("成功提交维修申请");
              this.getlist(1);
            }
            else if (response.data.code === 400) {
              this.$message.error(response.data.msg);
            }
            else if (response.data.code === 404) {
              this.$message.error(response.data.msg);
            }
          }
      ).catch(
        (error)=> {
          console.log(error.response.status);
        })
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
    },
    getNowTime() {
       var now = new Date();
       var year = now.getFullYear(); //得到年份
       var month = now.getMonth(); //得到月份
       var date = now.getDate(); //得到日期
       var hour = now.getHours();
       var min = now.getMinutes();
      //  var sec = now.getMinutes();
       month = month + 1;
       month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");
       hour = hour.toString().padStart(2, "0");
       min = min.toString().padStart(2, "0");
       this.defaultDate = `${year}-${month}-${date} ${hour}:${min}`;
      //  console.log(this.defaultDate);
      //  this.register.time = this.defaultDate;
      //  this.register.time = "";
    },
    getlist(page){
      this.$axios({
      method: 'get',
      url: '/worksheet/get',
      params: {
        type: 4,
        uuid: this.uid,
        page:page,
        page_size:6
      }
    }).then(
        response => {
          console.log("获取列表ing",response.data);
          console.log(response.status);
          this.orders = response.data.data;
          this.total=response.data.total
          console.log(this.total)
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
                this.orders[i].id = "# "+this.orders[i].id.substring(0,6);
              }

              this.orders[i].detail = response.data.data[i].description;
              if(this.orders[i].detail.length>20){//处理一下过长的描述
                this.orders[i].detail = this.orders[i].detail.substring(0,20)+"...";
              }
              this.orders[i].room = response.data.data[i].report_room;
              this.orders[i].name = response.data.data[i].report_person;
              this.orders[i].phone = response.data.data[i].report_phone;
              this.orders[i].date = response.data.data[i].appoint_time.substring(0,10);
              this.orders[i].time = response.data.data[i].appoint_time.substring(11,19);
              this.orders[i].status = response.data.data[i].status;

              this.orders[i].worker_name = response.data.data[i].worker_name;
              this.orders[i].appoint_time = response.data.data[i].appoint_time;
              this.orders[i].worker_phone = response.data.data[i].worker_phone;
            }
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
    },
    getCompanyById(id) {
      let that = this;
      that.$axios({
        method: 'get',
        url: '/company',
        params:{
          uuid: id
        }
      }).then((res) => {
        console.log("获取公司信息", res.data);
        this.companyInfo = res.data.data;
        this.register.name = this.companyInfo.contact_person;
        this.register.phone = this.companyInfo.contact_phone;
        // console.log("getCompanyById", this.register)
        // this.$message.success(res.data.msg);
      }).catch(error=> {
            console.log("error", error);
          }
      )
    },
    getCompanyRentInfo() {
      let that = this;
      that.$axios({
        method: 'get',
        url: '/worksheet/checkRoom',
        params:{
          uuid: this.uid
        }
      }).then((response) => {
        console.log("获取公司租赁订单", response.data.data);
        this.roomList=[];
        this.room_options=[];
        var len = 0;
        len = response.data.data.length;
        console.log("len "+len);

        for(var i = 0; i < len; i++){
          this.roomList += response.data.data[i];
          this.roomList += ","
        }
        console.log("roomList "+this.roomList);

        var rooms = this.roomList.split(",");
        console.log("rooms "+rooms);
        len = rooms.length - 1;
        for(var j=0; j<len;  j++){
          var op={value:j, label:rooms[j]}
          this.room_options.push(op);
        }
        // console.log("room_options "+this.room_options[0]);
      }).catch(error=> {
            console.log("error", error);
          }
      )
    },
  },
  mounted(){
    this.uid = localStorage.getItem("uid");
    this.getCompanyById(this.uid);
    // console.log("company info", this.companyInfo);
    // var checkjump = localStorage.getItem("visible");
    // if(checkjump == 1){
    //   this.newVisible = true;
    //   this.getCompanyById(this.uid);
    //   localStorage.setItem('visible', 0);
    //   this.newRepair();
    // }
    // this.getCompanyRentInfo();
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

  font-family: "Heiti-lighter";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 40px;
  color: #202020;
}
.new-button {
  position: absolute;
  right: 3vw;

  width: 150px;
  height: 40px;
  border-radius: 10px;

  color: white;
  line-height: 40px;
  text-align: center;

  font-family: Heiti-lighter;
  font-style: Medium;
  font-size: 16px;
  background: #e04410;
  cursor: pointer;
}
.select {
  position: absolute;
  right: 7vw;
  width: 100px;
}
.list-title {
  position: relative;
  margin-top: 3vh;
  margin-left: 3%;
  font-family: "Heiti-lighter";
  font-weight: 800;
  font-size: 16px;
  line-height: 20px;
  line-height: 100%;
}
.list {
  position: relative;
  top: 35px;

  font-family: "Heiti-lighter";
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
  box-shadow: 0 1px 8px rgba(0,0,0,0.1);
}
.page {
  position: absolute;
  z-index: 5;
  bottom: 15px;
  padding-top: 6vh;
  width: 100%;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #E04410;
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
  font-family: "Heiti-lighter";
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

  cursor: pointer;
}
</style>
