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
        overflow: auto;
      ">
        <!-- 页面标题 -->
        <div class="title-bar">
          <div class="title">
            访客申请列表
            <img
              src="../assets/guestOrder/title.svg"
              style="

                position: absolute;
                top: 1.55vh;
                left: 9vw;
              "
            />
          </div>
          <div class="new-button"  @click="newVisitor()">
            <i class="el-icon-plus"></i>
            新建访客邀请
          </div>
          <div class="select">
            <el-select v-model="value" placeholder="请选择" @change="handleSelectChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>

        <!-- 订单表头 -->
        <div class="list-title">
          <div style="position: absolute; left: 0%">申请编号</div>
          <div style="position: absolute; left: 14%">访客姓名</div>
          <div style="position: absolute; left: 29.8%">访客身份证号</div>
          <div style="position: absolute; left: 51.4%">联系号码</div>
          <div style="position: absolute; left: 71%">到访时间</div>
          <div style="position: absolute; left: 87.4%">访客状态</div>
        </div>

        <!-- 订单列表 -->
        <div class="list">
          <div v-for="(order, index) in orders" :key="index" class="order" @click="openDetail(index)">
            <div style="position: absolute; left: 3%">{{ order.id }}</div>
            <div style="position: absolute; left: 17%">{{ order.name }}</div>
            <div style="position: absolute; left: 32%">{{ order.certificate }}</div>
            <div style="position: absolute; left: 53%">{{ order.phone }}</div>
            <div style="position: absolute; left: 72%">
              <img
                src="../assets/guestOrder/date.svg"
                style="width: 15px; height: 15px; position: absolute; top: 9px"
              />
              <div style="position: absolute; top: -1.4vh; left: 20px; width: 90px;font-size: 15px"> {{ order.date }} </div>
            </div>
            <div style="position: absolute; left: 72%; top: 2.6vh">
              <img
                src="../assets/guestOrder/time.svg"
                style="width: 18px; height: 18px; position: absolute; top: 1.5vh; left: -2px;"
              />
              <div style="position: absolute; top: -7px; left: 9px; width: 90px;font-size: 15px"> {{ order.time }} </div>
            </div>
            <div style="position: absolute; left: 88%">
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
              <div v-show="order.status === 1" style="color: #3fb89c">
                <img
                  src="../assets/guestOrder/visiting.svg"
                  style="
                    width: 18px;
                    height: 18px;
                    position: absolute;
                    top: 18px;
                  "
                />
                <p style="position: absolute; top: -15px; left: 24px; width: 50px;"> {{ statusCode[1] }} </p>
              </div>
              <div v-show="order.status === 2" style="color: #e04410">
                <img
                  src="../assets/guestOrder/visited.svg"
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
<!--        <div class="page">-->
<!--          <el-pagination-->
<!--            layout="prev, pager, next"-->
<!--            :total="this.total"-->
<!--            :page-size="6"-->
<!--            @current-change="handlechange"-->
<!--            :current-page="this.now_page"-->
<!--            background-->
<!--          >-->
<!--          </el-pagination>-->
<!--        </div>-->

      </el-card>
    </div>


    <el-dialog
      :visible.sync="newVisible"
      width="25%">
      <div class="submit-title" style="position: absolute; left: 20px; top: 40px;">外来访客申请</div>
      <div class="submit-subtitle" style="position: absolute; left: 27px; top: 85px;">External Visitors <Ri:art></Ri:art>egister</div>
      <div style="position: absolute; top: 130px;">
        <input class="input-box" type="text" placeholder="输入访客姓名" v-model="register.name">
        <img
          src="../assets/guestOrder/submit-name.svg"
          style="
          width: 25px;
          height: 25px;
          position: absolute;
          top: 0.5vh;
          right: 25px;
        ">
        <input class="input-box"  type="text" placeholder="输入访客身份证号" v-model="register.certificate">
        <img
          src="../assets/guestOrder/submit-room.svg"
          style="
          width: 25px;
          height: 25px;
          position: absolute;
          top: 8vh;
          right: 25px;
        ">
        <div class="time-box">
          <el-date-picker
            v-model="register.time"
            type="datetime"
            placeholder="选择访客到访时间"
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
          top: 16vh;
          right: 27px;
        ">

        <input class="input-box" style="margin-top: 7vh;"  type="text" placeholder="输入访客手机号码" v-model="register.phone">
        <img
          src="../assets/guestOrder/submit-phone.svg"
          style="
          width: 23px;
          height: 23px;
          position: absolute;
          top: 22vh;
          right: 25px;
        ">
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

  </div>
</template>

<script>
import Topbar from "../zbh/topbar.vue";
import Sidebar from "../zbh/sidebar.vue";
export default {
  components: { Topbar, Sidebar},
  data() {
    return {
      uid: localStorage.getItem("uid"),
      companyInfo: {
        contact_person: "",
        contact_phone: "",
      },
      orders: [
        // {
        //   id: 1111,name: "Rmakant",
        //   phone: "+91 52345 64545",
        //   certificate: "110xxxxxxxxxxxxxxx",
        //   date: "2023/05/13",
        //   time: "15:30:32",
        //   status: 0,
        // },
        // {
        //   id: 1111,name: "Rmakant",
        //   phone: "+91 52345 64545",
        //   certificate: "110xxxxxxxxxxxxxxx",
        //   date: "2023/05/13",
        //   time: "15:30:32",
        //   status: 1,
        // },
        // {
        //   id: 1111,name: "Rmakant",
        //   phone: "+91 52345 64545",
        //   certificate: "110xxxxxxxxxxxxxxx",
        //   date: "2023/05/13",
        //   time: "15:30:32",
        //   status: 2,
        // },
      ],
      options: [
        {
          value: '3',
          label: "全部",
        },
        {
          value: '0',
          label: "未开始",
        },
        {
          value: '1',
          label: "访问中",
        },
        {
          value: '2',
          label: "已结束",
        },
      ],
      value: '3',
      statusCode: ["未开始", "访问中", "已结束"],
      newVisible: false,
      detailVisible: false,
      register: {
        certificate: "",
        time: "",
        name: "",
        phone: "",
      },
      now_page:1,
      page:1,
      total:0,
      defaultTime: "",
      checkType: 3,
    };
  },
  methods: {
    getNowTime() {
       var now = new Date();
       var year = now.getFullYear(); //得到年份
       var month = now.getMonth(); //得到月份
       var date = now.getDate(); //得到日期
       var hour = now.getHours();
       var min = now.getMinutes();
       var sec = now.getSeconds();
       month = month + 1;
       month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");
       hour = hour.toString().padStart(2, "0");
       min = min.toString().padStart(2, "0");
       sec = sec.toString().padStart(2, "0");
       this.defaultTime = `${year}-${month}-${date} ${hour}:${min}:${sec}`;
      //  this.register.time = defaultTime;
    },
    newVisitor(){
      this.getNowTime();
      this.newVisible = true;
    },
    submitReg(){
      // console.log("info", this.register);

      this.$axios({
        method: 'post',
        url: '/visitor/invite',
        data: {
          arrival_time: this.register.time.substring(0, 10)+"T"+this.register.time.substring(11, 16)+":00Z",
          company_uuid: this.uid,
          identity_number: this.register.certificate,
          invitor_name: this.companyInfo.contact_person,
          phone: this.register.phone,
          visitor_name: this.register.name,
        }
      }).then(
          response => {
            console.log(response);
            if (response.data.code === 200){
              this.$message({
                message: '访客邀请成功',
                type: 'success'
              });
              this.newVisible = false;
              this.getlist(this.checkType);
            }
            else {
              this.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          })
      // ).catch(
      //   (error)=> {
      //     console.log("error",error.response.status);
      //   })
    },
    handlechange(val){//处理跳转，page为当前选中的页面
      console.log("dqym:"+val)
      this.now_page = val;
      sessionStorage.setItem('now_page',JSON.stringify(val));
      this.getlist(val);
      //this.openFullScreen2();
    },
    handleSelectChange(type){  //选择框选中值改变
      switch (type) {
        case '0':
          this.getlist(0);
          this.checkType = 0;
          break;
        case '1':
          this.getlist(1);
          this.checkType = 1;
          break;
        case '2':
          this.getlist(2);
          this.checkType = 2;
          break;
        case '3':
          this.getlist(3);
          this.checkType = 3;
          break;
      }
    },
    getlist(type){
      this.$axios({
        method: 'post',
        url: '/visitor/list',
        data: {
          "company_uuid": this.uid,
          "status": type, //0:未到访 1:正在访问 2:结束访问 3:所有访客
        }
      }).then(
        response => {
          console.log("获取访客列表",response.data);
          this.orders = response.data.visitor_list;
          this.total=response.data.total
          console.log(this.total)
          if (response.status === 200){
            var len = 0;
            len = response.data.visitor_list.length;
            for(var i=0; i<len;  i++){
              this.orders[i].id = response.data.visitor_list[i].uuid;
              if(this.orders[i].id.length>6){//处理一下过长的ID
                this.orders[i].id = "# "+response.data.visitor_list[i].uuid.substring(0,6);
              }

              this.orders[i].name = response.data.visitor_list[i].visitor_name;
              this.orders[i].certificate = response.data.visitor_list[i].identity_number;
              this.orders[i].phone = response.data.visitor_list[i].phone;
              this.orders[i].date = response.data.visitor_list[i].arrival_time.substring(0,10);
              this.orders[i].time = response.data.visitor_list[i].arrival_time.substring(11,19);
              this.orders[i].status = response.data.visitor_list[i].status;
            }
            console.log("成功获取订单列表", this.orders);
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
        // this.$message.success(res.data.msg);
      }).catch(error=> {
            console.log("error", error);
          }
      )
    },
  },
  mounted(){
    this.uid = localStorage.getItem("uid");
    var checkjump = localStorage.getItem("visible");
    if(checkjump == 1){
      this.newVisible = true;
      localStorage.setItem('visible', 0);
    }
    this.getCompanyById(this.uid);
    console.log("getting list")
    this.getlist(3);
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
  right: 17vw;

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
  /* cursor: pointer; */
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
