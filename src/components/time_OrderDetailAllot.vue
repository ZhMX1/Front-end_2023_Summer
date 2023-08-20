<template>
    <div class="order-detail-allot-total">
        <div class="order-detail-allot">
          <div class="order-detail-allot-pin-box">
            <img src="../assets/orderdetail/pin.png" class="order-detail-allot-pin-img">
            <div class="order-detail-allot-pin">
          订单编号:{{ this.orderdetail.uuidshort }}
            </div>
          </div>
          <div style="position: absolute;top: 2vh;width: 100%;" class="other_detail">
            <div class="order-detail-allot-company-name-title-box">
                <img src="../assets/orderdetail/company-name.png" class="order-detail-allot-company-name-img">
                <div class="order-detail-allot-company-name-title">
                    公司名称
                </div>
            </div>

            <div class="order-detail-allot-company-name">
              {{ this.orderdetail.report_company_name }}
            </div>
            <div class="order-detail-allot-room-number-title-box">
                <img src="../assets/orderdetail/room-number.png" class="order-detail-allot-room-number-img">
                <div class="order-detail-allot-room-number-title">
                    房间号
                </div>
<!--        <div class="order-detail-allot-repair-type-title-box">-->
<!--          <img src="../assets/orderdetail/repair-type.png" class="order-detail-repair-type-img">-->
<!--          <div class="order-detail-repair-type-title">-->
<!--            维修类型-->
<!--          </div>-->
<!--        </div>-->
            </div>
          <div class="order-detail-allot-room-number-box">
            <div class="order-detail-allot-room-number">
          {{ this.orderdetail.report_room}}
            </div>
<!--        <div class="order-detail-repair-type">-->
<!--          水-->
<!--        </div>-->
          </div>
            <div class="order-detail-allot-appointment-date-title-box">
                <img src="../assets/orderdetail/appointment-date.png" class="order-detail-allot-appointment-date-img">
                <div class="order-detail-allot-appointment-date-title">
                    任务时间
                </div>
            </div>
            <div class="order-detail-allot-appointment-date">
              {{ this.orderdetail.assign_time.substring(0,4)}}年{{ this.orderdetail.assign_time.substring(5,7)}}月{{ this.orderdetail.assign_time.substring(8,10)}}日
              &nbsp; {{ this.orderdetail.assign_time_stage}}
            </div>
            <div class="order-detail-allot-contact-title-box">
                <img src="../assets/orderdetail/contact.png" class="order-detail-allot-contact-img">
                <div class="order-detail-allot-contact-title">
                    联系人
                </div>
                <div class="order-detail-allot-phone-title-box">
                    <img src="../assets/orderdetail/phone.png" class="order-detail-allot-phone-img">
                    <div class="order-detail-allot-phone-title">
                        联系电话
                    </div>
                </div>
            </div>
            <div class="order-detail-allot-contact-box">
                <div class="order-detail-allot-contact">
          {{ this.orderdetail.report_person }}
                </div>
                <div class="order-detail-allot-phone">
          {{ this.orderdetail.report_phone }}
                </div>
            </div>
            <div class="order-detail-allot-question-title-box">
                <img src="../assets/orderdetail/question.png" class="order-detail-allot-question-img">
                <div class="order-detail-allot-question-title">
                    问题描述
                </div>
            </div>
            <div class="order-detail-allot-question">
                <div class="order-detail-allot-question-detail">
            {{ this.orderdetail.description }}
                </div>
            </div>
          </div>
            <div class="order-detail-allot-allocate-button" @click="dialogVisible=true" v-if="this.orderdetail.status===1">
                <div class="order-detail-allot-allocate-title">
                    订单反馈
                </div>
                <img src="../assets/orderdetail/allocate.png" class="order-detail-allot-allocate-button-img">

            </div>
        </div>
        <div class="order-detail-allot-dialog-box" style="position: absolute;width: 100%;height: 100%;" v-if="dialogVisible===true">
            <div
                    title=""
                    style="height:500px;position: absolute;background-color:#FFFFFF;z-index: 1000;width: 480px;left: 50%;margin-left: -240px;top:140px;box-shadow:-1px 2px 7px rgba(0, 0, 0, 0.25);"

            >
                <div class="order-detail-allot-allocate-dialog-inside-box">
                    <div class="order-detail-allot-allocate-dialog-title-box">
                        <div class="order-detail-allot-allocate-dialog-title">
                            工单反馈
                        </div>
                        <img src="../zbh/img/gongdanfankui.png" class="order-detail-allot-allocate-dialog-allocate-button-img">
                    </div>
                    <div class="order-detail-allot-allocate-dialog-allocate-repairman">
                        解决人员
                    </div>
                  <div class="order-detail-allot-allocate-dialog-allocate-repairman-name">
                   {{this.orderdetail.worker_name}}
                  </div>
                    <img src="../zbh/img/解决人员.png" class="order-detail-allot-allocate-dialog-allocate-repairman-img">
                </div>
<!--                <div class="order-detail-allot-dialog-select">-->
<!--                    <el-select v-model="value" placeholder="请选择">-->
<!--                        <el-option-->
<!--                                v-for="item in options"-->
<!--                                :key="item.value"-->
<!--                                :label="item.label"-->
<!--                                :value="item.value">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </div>-->
                <div class="order-detail-allot-dialog-allocate-box">
                    <img src="../zbh/img/解决办法.png" class="order-detail-allot-allocate-dialog-repairman-img">
                    <div class="order-detail-allot-dialog-allocate-title">解决办法</div>
                    <div style="position: absolute;top:40px">
                        <el-input
                            type="textarea"
                            :rows="7"
                            placeholder="请输入解决办法"
                            v-model="solutions"
                            class="solution_type"
                        >
                        </el-input>

                    </div>
<!--                    <div class="order-detail-allot-dialog-allocate">林广延</div>-->
                </div>
<!--                <div class="order-detail-allot-dialog-phone-box">-->
<!--                    <img src="../assets/orderdetail/dialog-phone.png" class="order-detail-allot-allocate-dialog-phone-img">-->
<!--                    <div class="order-detail-allot-dialog-phone-title">联系电话:</div>-->
<!--                    <div class="order-detail-allot-dialog-phone">12345678901</div>-->
<!--                </div>-->
<!--                <div class="order-detail-allot-dialog-repair-time-box">-->
<!--                    <img src="../assets/orderdetail/repair-time.png" class="order-detail-allot-allocate-dialog-repair-time-img">-->
<!--                    <div class="order-detail-allot-dialog-repair-time-title">解决时间:</div>-->
<!--                    <div class="order-detail-allot-dialog-repair-time">-->
<!--                        <el-date-picker-->
<!--                                v-model="value1"-->
<!--                                type="datetime"-->
<!--                                placeholder="选择日期时间">-->
<!--                        </el-date-picker>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="order-detail-allot-dialog-submit-button" @click="SubmitOrder();">
                    <div class="order-detail-allot-dialog-submit">确定</div>
                </div>
              <div class="order-detail-allot-dialog-submit-button-2" @click="dialogVisible=false;">
                <div class="order-detail-allot-dialog-submit">返回</div>
              </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "OrderDetailAllot",
  mounted() {
    console.log(this.ifchose)
  },
  props: {
    orderdetail:{
      type:Array,
      require:false,
    }
  },
    data() {
        return {
            solutions:'',
            solver:this.orderdetail.worker_name,
            dialogVisible: false,
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',
            value1:'',
            worksheet_uuid:this.orderdetail.uuid,
        };
    },
    methods: {
        SubmitOrder(){
          console.log(this.worksheet_uuid)
          this.$axios(
              {
                method:'POST',
                url:'/worksheet/finish',
                data:{
                  repair_info:this.solutions,
                  worksheet_uuid:this.orderdetail.uuid
                }
              }
          ).then((res)=>{
            console.log(res.data);
            if(res.data.msg==="维修工单完成"){
              this.$message.success('成功提交！')
            }else{
              this.$message.error('提交失败！')
            }
            this.dialogVisible=false;
            window.location.reload()
            //this.res_admin_list = res.data.data;
            //console.log(this.res_admin_list);
          })
        }
    }
}
</script>

<style scoped>
.order-detail-allot-total{
  position: absolute;
  right: 1vh;
  top:2vh;
  height: 100%;
  overflow: hidden;
  /*box-shadow: -4px 0px 20px rgba(0, 0, 0, 0.2);*/
  width: 35vw;
  border-radius: 5px;
  cursor: default;
}
.order-detail-allot{
  position: absolute;
  width: 35vw;
  height: calc(100%);
  right: 0px;
  top: 0px;
  background: #FFFFFF;
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
  width: 22px;
  height: 22px;
  left: 0px;
  top:0px;
}
.order-detail-allot-appointment-date-img{
  position: absolute;
  width: 22px;
  height: 22px;
  left: 0px;
  top:0px;
}
.order-detail-allot-contact-img{
  position: absolute;
  width: 22px;
  height: 22px;
  left: 0px;
  top:0px;
}
.order-detail-allot-phone-img{
  position: absolute;
  width: 22px;
  height: 22px;
  left: 0px;
  top:0px;
}
.order-detail-repair-type-img{
  position: absolute;
  width: 22px;
  height: 22px;
  left: 0px;
  top:0px;
}
.order-detail-allot-question-img{
  position: absolute;
  width: 22px;
  height: 22px;
  left: 0px;
  top:0px;
}
.order-detail-allot-allocate-button-img{
  position: absolute;
  width: 25px;
  height: 25px;
  left: 110px;
  top:11px;
  cursor: pointer;
}
.order-detail-allot-company-name-title-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 20px;
  top:35px;
}
.order-detail-allot-pin-box{
  position: absolute;
  width: 140px;
  height: 36px;
  left: 390px;
  top:11px;
}
.order-detail-allot-room-number-title-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 20px;
  top:120px;
}
.order-detail-allot-appointment-date-title-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 20px;
  top:180px;
}
.order-detail-allot-contact-title-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 20px;
  top:245px;
}
.order-detail-allot-phone-title-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 250px;
  top:0px;
}
.order-detail-allot-repair-type-title-box{
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
  top:275px;
}
.order-detail-allot-question-title-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 20px;
  top:315px;
}
.order-detail-allot-company-name-title{
  position: absolute;
  left:30px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 800;
  font-size: 17px;
  line-height: 24px;

  color: #3FB89C;

}
.order-detail-allot-pin{
  position: absolute;
  left: 15px;
  top: 0px;
  font-family: 'Heiti-lighter';
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
  font-weight: 800;
  font-size: 17px;
  line-height: 24px;
  color: #3FB89C;
}
.order-detail-allot-appointment-date-title{
  position: absolute;
  left:30px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 800;
  font-size: 17px;
  line-height: 24px;

  color: #3FB89C;
}
.order-detail-allot-contact-title{
  position: absolute;
  left:30px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 800;
  font-size: 17px;
  line-height: 24px;

  color: #3FB89C;
}
.order-detail-allot-phone-title{
  position: absolute;
  left:30px;
  top: 0px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 24px;

  color: #3FB89C;
}
.order-detail-repair-type-title{
  position: absolute;
  left:30px;
  top: 0px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 24px;

  color: #3FB89C;
}
.order-detail-allot-question-title{
  position: absolute;
  left:30px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 800;
  font-size: 17px;
  line-height: 24px;

  color: #3FB89C;
}
.order-detail-allot-company-name{
  position: absolute;
  left: 40px;
  top: 60px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 59px;
  /* identical to box height */


  color: #202020;
}
.order-detail-allot-room-number{
  position: absolute;
  left: 47px;
  top: 0px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;

  color: #202020;
}
.order-detail-allot-room-number-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 0px;
  top:150px;
}
.order-detail-allot-allocate-button:hover{
  box-shadow: 0px 1px 12px rgba(63, 184, 156, 0.38);
}
.order-detail-allot-dialog-submit-button:hover{
  box-shadow: 0px 1px 12px rgba(63, 184, 156, 0.38);
}
.order-detail-allot-appointment-date{
  position: absolute;
  left: 47px;
  top: 210px;

  font-family: 'Heiti-lighter';
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
  left: 299px;
  text-align: left;
  top: 0px;
  width: 200px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;

  color: #202020;
}
.order-detail-repair-type{
  position: absolute;
  left: 210px;
  top: 0px;
  width: 200px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;

  color: #202020;
}
.order-detail-allot-question{
  position: absolute;
  width: 500px;
  height: calc(220px);
  left: 20px;
  top: 360px;

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
  font-size: 17px;
  line-height: 29px;

  color: #202020;
}
.order-detail-allot-allocate-button{
  position: absolute;
  left: 50%;
  margin-left: -80px;
  bottom: 50px;
  width: 160px;
  height: 45px;
  background: #3FB89C;
  border-radius: 4px;
}
.order-detail-allot-allocate-button-2{
  position: absolute;
  left: 30%;
  margin-left: -80px;
  bottom: 50px;
  width: 160px;
  height: 45px;
  background: #3FB89C;
  border-radius: 4px;
}
.order-detail-allot-allocate-title{
  position: absolute;
  left: 22px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 45px;
  letter-spacing: 1px;
  cursor: pointer;
  color: #FFFFFF;

}
.order-detail-allot-dialog-box{

}
.order-detail-allot-allocate-dialog-inside-box{
    height:400px;
}
.order-detail-allot-allocate-dialog-title-box{
    left: -61px;
    top: 42px;
}
.order-detail-allot-allocate-dialog-title{
  position: absolute;
  width: 293px;
  height: 44px;
  left: -40px;
  top: 35px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 44px;
  /* identical to box height */


  color: #202020;
}
.order-detail-allot-allocate-dialog-allocate-button-img{
    position: absolute;
    width: 26px;
    height: 26px;
    left: 24px;
    top: 42px;
}
.order-detail-allot-dialog{
    /*position: absolute;*/
    z-index: 9999;
}
.order-detail-allot-allocate-dialog-allocate-repairman{
  position: absolute;
  width: 168px;
  height: 29px;
  left: 16px;
  top: 107px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 29px;
  color: #202020;
}
.order-detail-allot-allocate-dialog-allocate-repairman-name{
  position: absolute;
  width: 168px;
  height: 29px;
  left: 102px;
  top: 107px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 29px;
  color: #202020;
}
.order-detail-allot-allocate-dialog-allocate-repairman-img{
  position: absolute;
  width: 24px;
  height: 23px;
  left: 30px;
  top: 110px;
}
.order-detail-allot-allocate-dialog-repairman-img{
  position: absolute;
  width: 22px;
  height: 18px;
  left: -8px;
}
.order-detail-allot-allocate-dialog-phone-img{
  position: absolute;
  width: 17px;
  height: 17px;
  left: -5px;
  top: 2px;
}
.order-detail-allot-allocate-dialog-repair-time-img{
  position: absolute;
  width: 22px;
  height: 22px;
  left: -7px;
  top: 6px;
}
.order-detail-allot-dialog-select{
  position: absolute !important;
  top:146px;
  left: 30px;
}
::v-deep .el-dialog.import-dialog{
  height: 426px !important;
}
::v-deep .el-dialog__body{
  height: 426px !important;
}

/deep/ .el-cascader {
  width: 330px;
  border-radius: 0;
}

.order-detail-allot-dialog-repair-time >>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 330px;
  cursor: pointer;
}
.date-input >>> .el-input__inner {
  width: 330px;
  cursor: pointer;
}
.order-detail-allot-dialog-allocate-box{
    position: absolute;
    width: 400px;
    top: 160px;
    left: 40px;
}
.order-detail-allot-dialog-phone-box{
    position: absolute;
    width: 400px;
    top: 240px;
    left: 40px;
}
.order-detail-allot-dialog-repair-time-box{
    position: absolute;
    width: 400px;
    top: 280px;
    left: 40px;
}
.order-detail-allot-dialog-allocate-title{
  position: absolute;
  width: 168px;
  height: 29px;
  left: -22px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;

  color: #202020;
}
.order-detail-allot-dialog-phone-title{
    position: absolute;
    width: 168px;
    height: 29px;
    left: -23px;
    top: 15px;

    font-family: 'Heiti-lighter';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 29px;

    color: #202020;
}
.order-detail-allot-dialog-allocate{
  position: absolute;
  width: 264px;
  height: 29px;
  left: -20px;
  top: 3px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 29px;

  color: #202020;
}
.order-detail-allot-dialog-phone{
  position: absolute;
  width: 264px;
  height: 29px;
  left: 0px;
  top: -4px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 29px;

  color: #202020;
}
.order-detail-allot-dialog-repair-time-title{
  position: absolute;
  width: 168px;
  height: 29px;
  left: -8px;
  top: 3px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 29px;

  color: #202020;
}
.order-detail-allot-dialog-repair-time{
  position: absolute !important;
  top:42px;
  left:-5px;
}
.order-detail-allot-dialog-submit-button{
   position: absolute;
   width: 130px;
   height: 44px;
   left: 30%;
   margin-left: -65px;
   margin-top: 10px;
   bottom: 40px;
   background: #3FB89C;
   border-radius: 5px;
   text-align: center;
 }
.order-detail-allot-dialog-submit-button-2{
  position: absolute;
  width: 130px;
  height: 44px;
  left: 70%;
  margin-left: -65px;
  margin-top: 10px;
  bottom: 40px;
  background: #3FB89C;
  border-radius: 5px;
  text-align: center;
}
.order-detail-allot-dialog-submit-button:hover{
  cursor: pointer;
}
.order-detail-allot-dialog-submit{
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 44px;
  letter-spacing: 6px;
  cursor: pointer;
  /* identical to box height */
  color: #FFFFFF;
}
.solution_type{
  width: 380px;
  font-family: Heiti-lighter;
}
</style>
<style scoped>
.el-dialog__header{
    padding:0.5px 1px 10px !important;
    background-color: #42b983 !important;
}

.el-input__inner{
    border: none;
    background-color: #F5F6FA;
}

/deep/.el-input__inner{
    color: black;
   font-size: 14px;
  font-family: Heiti-lighter;
}

</style>
