<template>
  <div class="order-detail-allot-total">
    <div class="order-detail-allot-pin-box">
      <img src="../assets/orderdetail/pin.png" class="order-detail-allot-pin-img">
      <div class="order-detail-allot-pin">
        订单编号：{{info.id}}
      </div>
    </div>
    <div class="order-detail-allot">
      <div class="order-detail-allot-company-name-title-box">
        <img src="../assets/guestOrder/detail/company-name.png" class="order-detail-allot-company-name-img">
        <div class="order-detail-allot-company-name-title">
          公司名称
        </div>
      </div>
      <div class="order-detail-allot-company-name">
        <!-- 报修公司 -->
        {{info.name}}
      </div>
      <div class="order-detail-allot-room-number-title-box">
        <img src="../assets/guestOrder/detail/room-number.png" class="order-detail-allot-room-number-img">
        <div class="order-detail-allot-room-number-title">
          房间号
        </div>
      </div>
      <div class="order-detail-allot-room-number">
        <!-- 301 -->
        {{info.room}}
      </div>
      <div class="order-detail-allot-appointment-date-title-box">
        <img src="../assets/guestOrder/detail/appointment-date.png" class="order-detail-allot-appointment-date-img">
        <div class="order-detail-allot-appointment-date-title">
          预约时间
        </div>
      </div>
      <div class="order-detail-allot-appointment-date">
        <!-- 2023年6月8日    12：30 -->
        {{info.date.substring(0,4)}}年{{info.date.substring(5,7)}}月{{info.date.substring(8,10)}}日
        &nbsp; {{info.time}}
      </div>
      <div class="order-detail-allot-contact-title-box">
        <img src="../assets/guestOrder/detail/contact.png" class="order-detail-allot-contact-img">
        <div class="order-detail-allot-contact-title">
          联系人
        </div>
        <div class="order-detail-allot-phone-title-box">
          <img src="../assets/guestOrder/detail/phone.png" class="order-detail-allot-phone-img">
          <div class="order-detail-allot-phone-title">
            联系电话
          </div>
        </div>
      </div>
      <div class="order-detail-allot-contact-box">
        <div class="order-detail-allot-contact">
          <!-- 林广艳 -->
          {{info.name}}
        </div>
        <div class="order-detail-allot-phone">
          <!-- +91 1234567890 -->
          {{info.phone}}
        </div>
      </div>
      <div class="order-detail-allot-question-title-box">
        <img src="../assets/guestOrder/detail/question.png" class="order-detail-allot-question-img">
        <div class="order-detail-allot-question-title">
          问题描述
        </div>
      </div>
      <div class="order-detail-allot-question">
          <div class="order-detail-allot-question-detail">
            <!-- 水管堵住了。 -->
            {{info.detail}}
          </div>
      </div>
      <div class="order-detail-allot-review-title-box">
        <img src="../assets/guestOrder/detail/question.png" class="order-detail-allot-question-img">
        <div class="order-detail-allot-review-title">
          初步反馈意见
        </div>
      </div>
      <div class="order-detail-allot-review">
        <div class="order-detail-allot-review-detail" v-show="info.worker_name=== ''">
          等待管理端分配维修人员...
        </div>
        <div class="order-detail-allot-review-detail" v-show="info.worker_name!== ''">
          已派遣维修人员{{info.worker_name}}于
          {{info.appoint_time.substring(0,4)}}年{{info.appoint_time.substring(5,7)}}月{{info.appoint_time.substring(8,10)}}日
          &nbsp; {{info.appoint_time.substring(11,19)}}
          上门服务。
          联系电话{{ info.worker_phone }}。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "guest_OrderDetail",
  props:{
    info: {
      type: Array,
      require: false,
    }
  },
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.order-detail-allot{
  position: absolute;
  top:45px;
  width: 550px;
  height: 700px;

  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}
.order-detail-allot-company-name-img{
  position: absolute;
  width: 24px;
  height: 24px;
  left: 0px;
  top:0px;
}
.order-detail-allot-pin-img{
  position: absolute;
  width: 10px;
  height: 18px;
  left: 0px;
  top:0px;
}
.order-detail-allot-room-number-img{
  position: absolute;
  width: 20px;
  height: 20px;
  left: 1px;
  top:2px;
}
.order-detail-allot-appointment-date-img{
  position: absolute;
  width: 20px;
  height: 20px;
  left: 0px;
  top:2px;
}
.order-detail-allot-contact-img{
  position: absolute;
  width: 20px;
  height: 20px;
  left: 0px;
  top:3px;
}
.order-detail-allot-phone-img{
  position: absolute;
  width: 21px;
  height: 21px;
  left: 0px;
  top:2px;
}
.order-detail-allot-question-img{
  position: absolute;
  width: 22px;
  height: 22px;
  left: 0px;
  top:2px;
}
.order-detail-allot-company-name-title-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 20px;
  top:11px;
}
.order-detail-allot-pin-box{
  position: absolute;
  width: 140px;
  height: 36px;
  left: 380px;
  top:25px;
  z-index: 1000;
}
.order-detail-allot-room-number-title-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 20px;
  top:100px;
}
.order-detail-allot-appointment-date-title-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 20px;
  top:162px;
}
.order-detail-allot-contact-title-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 20px;
  top:223px;
}
.order-detail-allot-phone-title-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 250px;
  top:0px;
}
.order-detail-allot-contact-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 0px;
  top:251px;
}
.order-detail-allot-question-title-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 20px;
  top:284px;
}
.order-detail-allot-review-title-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 20px;
  top:460px;
}
.order-detail-allot-company-name-title{
  position: absolute;
  left:30px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #E04410;

}
.order-detail-allot-pin{
  position: absolute;
  left: 18px;
  text-align: left;
  width: 170px;
  top: -2px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height */

  color: #202020;

}
.order-detail-allot-room-number-title{
  position: absolute;
  left:30px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #E04410;
}
.order-detail-allot-appointment-date-title{
  position: absolute;
  left:30px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #E04410;
}
.order-detail-allot-contact-title{
  position: absolute;
  left:30px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #E04410;
}
.order-detail-allot-phone-title{
  position: absolute;
  left:30px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #E04410;
}
.order-detail-allot-question-title{
  position: absolute;
  left:30px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #E04410;
}
.order-detail-allot-review-title{
  position: absolute;
  left:30px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #E04410;
}
.order-detail-allot-company-name{
  position: absolute;
  left: 36px;
  top: 35px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 34px;
  line-height: 59px;
  /* identical to box height */


  color: #202020;
}
.order-detail-allot-room-number{
  position: absolute;
  left: 50px;
  top: 128px;
  font-family: 'Roboto Light';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;

  color: #202020;
}
.order-detail-allot-appointment-date{
  position: absolute;
  left: 50px;
  top: 189px;

  font-family: 'Heiti-lighter Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;

  color: #202020;
}
.order-detail-allot-contact{
  position: absolute;
  left: 50px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;

  color: #202020;
}
.order-detail-allot-phone{
  position: absolute;
  left: 265px;
  top: 0px;
  width: 200px;
  font-family: 'Roboto Light';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;

  color: #202020;
}
.order-detail-allot-question{
  position: absolute;
  width: 480px;
  height: 130px;
  left: 50%;
  margin-left: -246px;
  top: 318px;
  background: #F5F6FA;
  border-radius: 10px;
}
.order-detail-allot-question-detail{
  position: absolute;
  left: 25px;
  top: 10px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 29px;

  color: #202020;
}
.order-detail-allot-review{
  position: absolute;
  width: 480px;
  height: calc(100% - 554px);
  left: 50%;
  margin-left: -246px;
  top: 498px;
  background: #F5F6FA;
  border-radius: 10px;
}
.order-detail-allot-review-detail{
  position: absolute;
  left: 25px;
  top: 10px;
  text-align: left;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 29px;

  color: #202020;
}
</style>

