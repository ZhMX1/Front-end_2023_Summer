<template>
  <div class="orderDetail">
    <topbar></topbar>
    <sidebar style="position: absolute;top:-4vh" :which="1"></sidebar>
    <div class="orderDetails">
      <div class="orderCard1">
        <div class="details">
          <div class="orderDetailTitle">
            <i class="el-icon-companyInfo" />
            公司订单详情
          </div>
          <el-button class="back2user2" type="primary" @click="toUserDetail">
            <i class="el-icon-back" />
            返回公司信息详情
          </el-button>
        </div>
        <el-descriptions class="margin-top" :column="1" :size="size">
          <el-descriptions-item label="租赁房间号" style="height:30px">
            <div v-show="!edit">{{orderInfo.rooms}}</div>
            <el-input v-model="orderInfo.rooms" v-show="edit" class="editInput"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="租赁起止时间">
            <div v-show="!edit">{{orderInfo.start_time!=null?orderInfo.start_time.substring(0,10): orderInfo.start_time }} - {{orderInfo.end_time!=null?orderInfo.end_time.substring(0,10): orderInfo.end_time}}</div>
            <el-col :span="11" v-show="edit">
              <el-date-picker
                  v-model="orderInfo.start_time"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择开始时间"
                  style="width: 100%;">
              </el-date-picker>
            </el-col>
            <el-col v-show="edit" class="line" :span="2">-</el-col>
            <el-col :span="11" v-show="edit">
              <el-date-picker
                  v-model="orderInfo.end_time"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择结束时间"
                  style="width: 100%;">
              </el-date-picker>
            </el-col>
          </el-descriptions-item>
          <el-descriptions-item label="签约时间">
            <div v-show="!edit">{{orderInfo.signing_time!=null?orderInfo.signing_time.substring(0,10): orderInfo.signing_time}}</div>
            <el-input v-model="orderInfo.signed_time" v-show="edit" class="editInput"></el-input>
          </el-descriptions-item>
        </el-descriptions>
<!--        <el-button class="editBtn" @click="editOrderInfo">-->
<!--          <i class="el-icon-edit" />-->
<!--          修改信息-->
<!--        </el-button>-->
      </div>
      <div class="orderCard2">
        <div class="details">
          <div class="orderDetailTitle">
            <i class="el-icon-companyInfo" />
            物业费缴纳信息
          </div>
        </div>
        <div class="orders">
          <div class="orderItem" v-for="(item, index) in payLists" :key="index">
            <span class="payInfos"><i class="el-icon-rentRoom"></i>年份：{{ item.year }}</span>
            <span class="payInfos"><i class="el-icon-rentTime"></i>法人名称： {{ item.legal_person }}</span>
            <span v-if="item.status === true" class="payInfos" style="color: #3FB89C;"><i class="el-icon-yes"></i>已缴费</span>
            <span v-else class="payInfos" style="color: #e04410;"><i class="el-icon-circle-close"></i>未缴费</span>
            <span v-if="item.status === true" class="payInfos"><i class="el-icon-rentTime"></i>缴费时间： {{ item.payment_time }}</span>
            <span v-if="item.status === false" class="payInfos"><i class="el-icon-rentTime"></i>缴费时间： ------</span>
            <span>
              <el-button @click="getEdit(item)" class="changPayBtn">
                更新信息
              </el-button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog class="orderDialog" title="" :visible.sync="payShow" width="30%">
      <div class="order-detail-allot-allocate-dialog-title">
        更新缴费信息
      </div>
      <el-form style="margin-top: 5vh">
        <el-form-item label="缴费时间">
          <el-col :span="20">
            <el-date-picker
                v-model="payDate"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择缴费时间"
                style="width: 100%;">
            </el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <div>
        <el-button style="background-color: #3FB89C;color: white;margin-top: 3vh" @click="editOrder">确认添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import sidebar from "@/zbh/sidebar.vue";
import topbar from "@/zbh/topbar.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "orderManage",
  components: {topbar, sidebar},
  data(){
    return{
      payShow: false,
      size: '',
      edit: false,
      payDate: "",
      orderInfo: {
      },
      addPay: {
      },
      payLists: [],
      editone: {}
    }
  },
  mounted() {
    this.orderInfo = JSON.parse(localStorage.getItem('tmpOrder'));
    console.log(this.orderInfo);
    console.log("获取订单信息", this.orderInfo.uuid);
    this.getPayList();
  },
  methods: {
    getEdit(item) {
      this.editone = item;
      this.payShow = true
    },
    toUserDetail() {
      this.$router.push('/userdetail')
    },
    editOrder() {
      let that = this;
      console.log("更新订单信息", this.payDate);
      that.$axios({
        method: 'post',
        url: '/company/lease-order/property-order',
        params: {
          uuid: this.editone.uuid,
          payTime: this.payDate
        }
      }).then((res) => {
        console.log("更新订单信息", res);
        if(res.status === 200) {
          this.$message.success(res.data.msg);
        }
        this.getPayList();
        this.payShow = false;
      }).catch(error=> {
            console.log("error", error);
          }
      )
      this.payShow = false;
    },
    getPayList() {
      let that = this;
      that.$axios({
        method: 'get',
        url: '/company/lease-order/property-order',
        params: {
          uuid: that.orderInfo.uuid,
        }
      }).then((res) => {
        console.log("获取订单及缴费信息", res.data);
        this.payLists = res.data.data;
        if(res.data.status === 200) {
          this.$message.success(res.data.msg);
        }
      }).catch(error=> {
            console.log("error", error);
          }
      )
    },
  }
}
</script>

<style scoped>
.orderDetail {
  position: absolute;
  background: #F5F5F5;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
.orderDetails {
  position: relative;
  width: 83vw;
  margin-left: 16vw;
  margin-top: 1vh;
  margin-right: 153px;
  height: 600px;
//width: 100%;
}
.details {
  height: 40px;
  margin-bottom: 2vh;
}
.orderDetailTitle {
  float: left;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;

  color: #202020;
}
.back2user2 {
  float: right;
  background: #3FB89C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #FFFFFF;
  border: none;
}
.orderCard1 {
  position: relative;
  height: 20vh;

  padding-top: 36px;
  padding-left: 55px;
  padding-right: 90px;
  padding-bottom: 15px;
  background: #FFFFFF;
  border-radius: 10px;
}
.orderCard2 {
  position: relative;
  height: 50vh;
  margin-top: 1vh;

  padding-top: 36px;
  padding-left: 55px;
  padding-right: 90px;
  padding-bottom: 15px;

  background: #FFFFFF;
  border-radius: 10px;
}
.orderInfos {
  display: flex;
  position: relative;
  float: left;
  width: 100%;
  margin-left: 0px;
  margin-bottom: 10px;
}

.orderInfos i {
  margin-right: 5px;
}

.editBtn{
  margin-top: 30px;
  background: #3FB89C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #FFFFFF;
}
.orders {
  margin-top: 21px;
  position: relative;
//padding-left: 22px;
  width: 100%;
  height: 100%;
}
.orderItem {
  height: 50px;
  padding-top: 25px;
  padding-left: 22px;
  margin-bottom: 27px;
  background: #F5F6FA;
  border-radius: 10px;
  font-size: 18px;
}
.payInfos {
  float: left;
  width: auto;
  display: inline-block;
  font-size: 14px;
  position: relative;
  height: 20px;
  margin-right: 6vw;
}

.changPayBtn {
  background: #3FB89C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #ffffff;
  margin-top: -5px;
  border: none;
}
.changPayBtn:hover {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
}
.margin-top {
  font-family: Heiti-lighter;
  font-size: 16px;
}
.payInfos2 {
  float: left;
  width: auto;
  display: inline-block;
  font-size: 14px;
  position: relative;
  height: 20px;
  margin-right: 4vw;
}
.payInfos i {
  margin-right: 5px;
}
.orderDetailBtn {
  height: 32px;
  width: 122px;
  float: right;
  vertical-align: center;
  display: flex;
  margin-right: 0px;
  background: #5D5B5B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #FFFFFF;
  font-size: 14px;
}

.el-icon-userName {
  background: url('../../assets/UserManage/usernameIcon.png') center no-repeat;
  color: #000000;
  background-size: 12px;
}
.el-icon-userName:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-companyName {
  background: url('../../assets/UserManage/companyNameIcon.png') center no-repeat;
  color: #000000;
  background-size: 12px
}
.el-icon-companyName:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-contactName {
  background: url('../../assets/UserManage/contactNameIcon.png') center no-repeat;
  color: #000000;
  background-size: 12px
}
.el-icon-contactName:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-teleNum {
  background: url('../../assets/UserManage/teleNameIcon.png') center no-repeat;
  color: #000000;
  background-size: 12px
}
.el-icon-teleNum:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}

.el-icon-password {
  background: url('../../assets/UserManage/userPasswordIcon.png') center no-repeat;
  background-size: 12px;
}

.el-icon-password:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-rentRoom {
  background: url('../../assets/UserManage/orderRoom.png') center no-repeat;
  background-size: 12px;
  color: #202020;
}

.el-icon-rentRoom :before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-rentTime {
  background: url('../../assets/UserManage/orderTime.png') center no-repeat;
  background-size: 12px;
}

.el-icon-rentTime:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-sigTime {
  background: url('../../assets/UserManage/orderSigTime.png') center no-repeat;
  background-size: 12px;
  color: #000000;
}

.el-icon-asigTime:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-addOrder {
  background: url('../../assets/UserManage/addOrder.png') center no-repeat;
  background-size: 12px;
}

.el-icon-addOrder:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-orderDetail {
  background: url('../../assets/UserManage/orderDetail.png') center no-repeat;
  background-size: 12px;
}

.el-icon-orderDetail:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-back {
  background: url('../../assets/UserManage/backToUser.png') center no-repeat;
  background-size: 12px;
}

.el-icon-back:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-companyInfo {
  background: url('../../assets/UserManage/companyInfoIcon.png') center no-repeat;
  background-size: 16px;
}

.el-icon-companyInfo:before {
  content: "\8d3a";
  font-size: 16px;
  visibility: hidden;
}

.el-icon-edit {
  background: url('../../assets/UserManage/edit.png') center no-repeat;
  background-size: 12px;
}

.el-icon-edit:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-yes {
  background: url('../../assets/UserManage/yes.png') center no-repeat;
  background-size: 12px;
}

.el-icon-yes:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}

.order-detail-allot-allocate-dialog-title{
  position: absolute;
  height: 40px;
  margin-left: 40%;
  left: 0px;
  top: 35px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 44px;
  /* identical to box height */


  color: #202020;
}
</style>
<style>
.orderItem .el-button {
  padding: 8px 20px !important;
}

.orderItem span {
  font-size: 16px!important;
}
.orderDialog .el-dialog__header{
  padding:0.5px 1px 10px !important;
  background-color: #42b983 !important;
}
</style>