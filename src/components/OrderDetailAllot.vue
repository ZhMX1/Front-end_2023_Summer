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
          预约时间
        </div>
      </div>
      <div class="order-detail-allot-appointment-date">
        {{ this.orderdetail.appoint_time.substring(0,4)}}年{{ this.orderdetail.appoint_time.substring(5,7)}}月{{ this.orderdetail.appoint_time.substring(8,10)}}日
        &nbsp; {{ this.orderdetail.appoint_time_stage}}
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
      <div class="order-detail-allot-allocate-button" @click="allotOrder();dialogVisible=true">
        <div class="order-detail-allot-allocate-title">
          分配订单
        </div>
        <img src="../assets/orderdetail/allocate.png" class="order-detail-allot-allocate-button-img">
      </div>
    </div>
    <div class="order-detail-allot-dialog-box">
      <el-dialog
          title=""
          :visible.sync="dialogVisible"
          width="460px"
          class="order-detail-allot-dialog"
      >
        <div class="order-detail-allot-allocate-dialog-inside-box">
          <div class="order-detail-allot-allocate-dialog-title-box">
            <div class="order-detail-allot-allocate-dialog-title">
              工单分配
            </div>
            <img src="../assets/orderdetail/dialog-allocate.png" class="order-detail-allot-allocate-dialog-allocate-button-img">
          </div>
          <div class="order-detail-allot-dialog-repair-time-box">
            <img src="../assets/orderdetail/repair-time.png" class="order-detail-allot-allocate-dialog-repair-time-img">
            <div class="order-detail-allot-dialog-repair-time-title">指定维修时间</div>
            <div class="order-detail-allot-dialog-repair-time">
              <el-date-picker
                  v-model="check_time"
                  type="date"
                  placeholder="选择日期时间"
                  @change="ChangeTime()"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  class="date-input"
                  :picker-options="pickerOptions"
              >
              </el-date-picker>
              <el-select v-model="datetime" placeholder="请选择"  class="time-input">
                <el-option
                    v-for="item in times"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="order-detail-allot-allocate-dialog-allocate-repairman">
          分配维修人员
        </div>
        <img src="../assets/orderdetail/allocate-repairman.png" class="order-detail-allot-allocate-dialog-allocate-repairman-img">
        <div class="order-detail-allot-dialog-select">
          <el-cascader
              v-model="repairman"
              :options="options"
              @change="ChangeWorker()">
          </el-cascader>
        </div>
        <div class="order-detail-allot-dialog-allocate-box">
          <img src="../assets/orderdetail/repairman.png" class="order-detail-allot-allocate-dialog-repairman-img">
          <div class="order-detail-allot-dialog-allocate-title">维修人员:</div>
          <div class="order-detail-allot-dialog-allocate">{{ this.repair_name }}</div>
        </div>
        <div class="order-detail-allot-dialog-phone-box">
          <img src="../assets/orderdetail/dialog-phone.png" class="order-detail-allot-allocate-dialog-phone-img">
          <div class="order-detail-allot-dialog-phone-title">联系电话:</div>
          <div class="order-detail-allot-dialog-phone">{{ this.repair_phone }}</div>
        </div>
        <div class="order-detail-allot-dialog-submit-button" @click="SubmitAllot()">
          <div class="order-detail-allot-dialog-submit">确定</div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>


export default {
  name: "OrderDetailAllot",
  mounted() {

  },
  props: {
    orderdetail:{
      type:Array,
      require:false,
    },
    // ifchose:{
    //   type:Boolean,
    //   require:true
    // }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          //此条为设置禁止用户选择今天之前的日期，包含今天。
          // return time.getTime() <= (Date.now());
          //此条为设置禁止用户选择今天之前的日期，不包含今天。
          return time.getTime() < (Date.now()-(24 * 60 * 60 * 1000));
        }
      },
      dialogVisible: false,
      times: [{
        value: '9:00:00',
        label: '上午'
      }, {
        value: '14:00:00',
        label: '下午'
      }, {
        value: '20:00:00',
        label: '晚上'
      }],
      datetime:'14:00:00',
      options: [{
        value: '11',
        label: '指南',
        children: [{
          value: '1',
          label: '设计原则'},{
          value: '2',
          label: '设计原则'}]}
      ],
      value: '',
      value1:'',
      check_time:'',
      repairman:["11","1"],
      repair_phone:'',
      repair_name:'',
      worker_uuid:'',
      worksheet_uuid:this.orderdetail.uuid,
      ifdetail:'',
      search:[],
      default_time:'',
      recommend_person:''
    };
  },
  methods: {
    allotOrder(){

      if(this.orderdetail.appoint_time_stage==='上午'){
        this.datetime='9:00:00'
      }else if(this.orderdetail.appoint_time_stage==='下午'){
        this.datetime='14:00:00'
      }else{
        this.datetime='20:00:00'
      }
      this.check_time=this.orderdetail.appoint_time.substring(0,4)+"-"+this.orderdetail.appoint_time.substring(5,7)+"-"+ this.orderdetail.appoint_time.substring(8,10)
      this.default_time=this.orderdetail.appoint_time.substring(0,4)+"-"+this.orderdetail.appoint_time.substring(5,7)+"-"+ this.orderdetail.appoint_time.substring(8,10)+" "+this.datetime
      this.$axios(
          {
            method:'GET',
            url:'/worksheet/check',
            params:{
              check_time:this.default_time,
              description:this.orderdetail.description
            }
          }
      ).then((res)=>{
        console.log(res.data);
        if(res.data.period==="1"){
          this.datetime='9:00:00'
        }else if(res.data.period==="2"){
          this.datetime='14:00:00'
        }else if(res.data.period==="3"){
          this.datetime='20:00:00'
        }
        this.options=res.data.option;
        this.search=res.data.option;
        if(res.data.is_recommend===true){
          this.recommend_person=res.data.recommend_person
          this.repairman=[];
          this.repairman.push(this.recommend_person.value)
          this.repairman.push(this.recommend_person.repair_man)
          this.ChangeWorker();
        }else{
          this.repairman=[];
          this.repair_phone="";
          this.repair_name="";
        }

        //console.log(this.options)
        //this.res_admin_list = res.data.data;
        //console.log(this.res_admin_list);
      })
    },
    ChangeTime(){
      console.log(this.check_time)
        this.$axios(
            {
              method:'GET',
              url:'/worksheet/check',
              params:{
                check_time:this.check_time+" "+this.datetime
              }
            }
        ).then((res)=>{
           console.log(res.data);
           this.options=res.data.option;
           this.search=res.data.option;
           console.log(this.options)
          //this.res_admin_list = res.data.data;
          //console.log(this.res_admin_list);
        })
      },
      ChangeWorker(){

        let i;
        let arr=this.options[this.repairman[0]-1].children;
        console.log(this.repairman)
        for(i in arr){
          console.log(arr[i])
            if(arr[i].value === this.repairman[1]){
              this.repair_phone=arr[i].phone;
              this.repair_name=arr[i].label;
            }
        }
        this.worker_uuid=this.repairman[1];
      },
      SubmitAllot(){
        console.log(this.check_time)
        console.log(this.worker_uuid)
        console.log("uuid为："+this.orderdetail.uuid)
        this.$axios(
            {
              method:'POST',
              url:'/worksheet/assign',
              data:{
                assign_time: this.check_time+" "+this.datetime,
                worker_uuid: this.worker_uuid,
                worksheet_uuid: this.orderdetail.uuid
              }
            }
        ).then((res)=>{
          console.log(res.data);
          if(res.data.code===200){
            this.$message.success('成功提交！')
          }else{
            this.$message.error('提交失败！')
          }
          this.dialogVisible=false;
          window.location.reload()
          //this.res_admin_list = res.data.data;
          //console.log(this.res_admin_list);
        })
      },
  },
}
</script>

<style scoped>
.order-detail-allot-total{
  position: absolute;
  right: 1vh;
  top:12vh;
  height: calc(100% - 15vh);
  overflow: hidden;
  box-shadow: -4px 0px 20px rgba(0, 0, 0, 0.2);
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
  top:11px;
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
  top:100px;
}
.order-detail-allot-appointment-date-title-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 20px;
  top:160px;
}
.order-detail-allot-contact-title-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 20px;
  top:220px;
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
  top:248px;
}
.order-detail-allot-question-title-box{
  position: absolute;
  width: 189px;
  height: 36px;
  left: 20px;
  top:280px;
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
  top: 35px;
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
  top:126px;
}
.order-detail-allot-appointment-date{
  position: absolute;
  left: 47px;
  top: 185px;

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
  height: calc(150px);
  left: 20px;
  top: 320px;

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
  bottom: 40px;
  width: 160px;
  height: 45px;
  background: #3FB89C;
  border-radius: 4px;
}
.order-detail-allot-allocate-button:hover{
  box-shadow: 0px 1px 12px rgba(63, 184, 156, 0.38);
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
  background: #FFFFFF;
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
  width: 30px;
  height: 30px;
  left: 20px;
  top: 42px;
}
.order-detail-allot-dialog{

}
.order-detail-allot-allocate-dialog-allocate-repairman{
  position: absolute;
  width: 168px;
  height: 29px;
  left: 30px;
  top: 200px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 29px;

  color: #202020;
}
.order-detail-allot-allocate-dialog-allocate-repairman-img{
  position: absolute;
  width: 22px;
  height: 22px;
  left: 30px;
  top: 203px;
}
.order-detail-allot-allocate-dialog-repairman-img{
  position: absolute;
  width: 18px;
  height: 16px;
  left: -6px;
  top: 8px;
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
  top:239px;
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
  border-radius: 0px;
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
  top: 290px;
  left: 40px;
}
.order-detail-allot-dialog-phone-box{
  position: absolute;
  width: 400px;
  top: 330px;
  left: 40px;
}
.order-detail-allot-dialog-repair-time-box{
  position: absolute;
  width: 400px;
  top: 107px;
  left: 40px;
}
.order-detail-allot-dialog-allocate-title{
  position: absolute;
  width: 168px;
  height: 29px;
  left: -31px;
  top: 3px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 29px;

  color: #202020;
}
.order-detail-allot-dialog-phone-title{
  position: absolute;
  width: 168px;
  height: 29px;
  left: -31px;
  top: -4px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
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
  left: 50%;
  margin-left: -65px;
  margin-top: 10px;
  bottom: 40px;
  background: #3FB89C;
  border-radius: 5px;
  text-align: center;
}
.order-detail-allot-dialog-submit-button:hover{
  box-shadow: 0px 1px 12px rgba(63, 184, 156, 0.38);
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
.date-input{
  position: absolute;
  left: 0px;
}
.time-input{
  position: absolute;
  left: 250px;
}
</style>
<style>
.order-detail-allot-dialog  .el-dialog__header{
  padding:0.5px 1px 10px !important;
  background-color: #3FB89C !important;
}
.el-input__inner{
  border: none;
  background-color: #F5F6FA;
}
.date-input .el-input__inner{
  width: 220px !important;
}
.time-input .el-input__inner{
  width:100px !important;
}
/deep/.el-input__inner{
  color: black;
}
</style>
