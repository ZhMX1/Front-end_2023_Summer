<template>
  <div class="order-left-list-total">
    <div class="order-left-list-box" v-for="(item,index) in orderlist" :key="item.ischose">
      <div class="order-left-list">
        <div class="order-left-list-company-name-box">
          <img src="../assets/orderlist/company-name.png" class="order-left-list-company-name-img">
          <div class="order-left-list-company-name">
            {{ item.report_company_name }}
          </div>
        </div>
        <div class="order-left-list-order-number-box">
          <img src="../assets/orderlist/pin.png" class="order-left-list-pin-img">
          <div class="order-left-list-order-number">
            工单编号 :{{item.uuidshort}}
          </div>
        </div>
        <div class="order-left-list-room-number-box">
          <img src="../assets/orderlist/room-number.png" class="order-left-list-room-number-img">
          <div class="order-left-list-room-number">
            房间号: {{ item.report_room }}
          </div>
<!--          <img src="../assets/orderlist/tool-type.png" class="order-left-list-tool-type-img">-->
<!--          <div class="order-left-list-tool-type">-->
<!--            维修类型: {{ item.repair_type }}-->
<!--          </div>-->
        </div>
        <div class="order-left-list-appointment-date-box">
          <img src="../assets/orderlist/appointment-date.png" class="order-left-list-appointment-date-img">
          <div class="order-left-list-appointment-date">
            预约时间: {{item.appoint_time.substring(0,4)}}年{{ item.appoint_time.substring(5,7)}}月{{ item.appoint_time.substring(8,10)}}日
            &nbsp; {{ item.appoint_time_stage}}
          </div>
        </div>
        <div class="order-left-list-contact-box">
          <img src="../assets/orderlist/contacts.png" class="order-left-list-contacts-img">
          <div class="order-left-list-contact">
            联系人: {{ item.report_person }}
          </div>
          <img src="../assets/orderlist/phone.png" class="order-left-list-phone-img">
          <div class="order-left-list-phone">
            联系电话: {{ item.report_phone }}
          </div>
        </div>
        <div v-bind:class="{'OrderLeftListDetailButton':selectDetail!==index,'OrderLeftListDetailButtonChose':selectDetail===index}"  @click="changeDetail(item,index)">
          <div class="order-left-list-detail-text">查看详情</div>
          <img src="../assets/orderlist/detail-button.png" class="order-left-detail-button-img">
        </div>
      </div>
    </div>

  </div>
</template>

<script>


export default {
  name: "OrderList",
  mounted() {
    // this.$emit('ifchose',this.chosen)
    this.$axios(
        {
          method:'GET',
          url:'/worksheet/get',
          params:{
            type:'1'
          }
        }
    ).then((res)=>{
      console.log(res.data.data);
      this.orderlist=res.data.data;
      let i;
      for(i in this.orderlist){
        this.orderlist[i].uuidshort=this.orderlist[i].uuid.slice(0,6)
        this.orderlist[i].ischose=false
      }
      this.nowchose=0
      this.orderlist[0].ischose=true
      this.$emit('sendDetail',JSON.stringify(this.orderlist[0]))
      //this.res_admin_list = res.data.data;
      //console.log(this.res_admin_list);
    })
  },
  data(){
    return{
      orderlist:[],
      nowchose:'',
      lastchose:'',
      selectDetail:0,
    }
  },
  methods:{
    changeDetail(item,index){
      // this.chosen=true
      // this.$emit('ifchose',this.chosen)
      this.$emit('sendDetail',JSON.stringify(item))
      if(this.selectDetail===index){
        this.selectDetail=-1;
      }else{
        this.selectDetail=index;
      }
      // this.orderlist[this.nowchose].ischose=false
      // this.nowchose=index
      // item.ischose=true
      // item.report_room=item.report_room++
      // this.$set(this.orderlist,this.nowchose,{ischose:false})
      // console.log(this.orderlist[this.nowchose].ischose)
      // this.nowchose=index
      // this.$set(this.orderlist,index,{ischose:true})
      // console.log(this.orderlist[index].ischose)
      // this.$forceUpdate()
      // window.location.reload()
    }
  }

}
</script>

<style scoped>
.order-left-list-box{
  position: relative;
  margin-bottom:30px
}
.order-left-list-total{
  height: calc(100% - 16vh);
  width: calc(100% - 18vw - 530px);
  position: absolute;
  top: calc(12vh);
  left: 16vw;
  overflow:auto;
}
.order-left-list{
  display: flex;
  width: calc(100% - 18px);
  height: 162px;
  margin-top: 20px;
  margin-left: 8px;
  background: #FFFFFF;
  box-shadow: -1px 2px 7px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  cursor: default;
}
.order-left-list:hover{
  box-shadow: -1px 2px 13px rgba(0, 0, 0, 0.25);
}
.order-left-list-company-name-box{
  position: absolute;
  width: 260px;
  height: 36px;
  left: 20px;
  top:15px;
}
.order-left-list-company-name{

  position: absolute;
  left: 36px;
  top: -2px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 29px;

  color: #202020;

}
.order-left-list-company-name-img{
  position: absolute;
  width: 26px;
  height: 26px;
  left: 0px;
  top:0px;
}
.order-left-list-room-number-box{
  position: absolute;
  left: 23px;
  top:56px;
  width: 500px;
  height: 30px;
}
.order-left-list-room-number-img{
  position: absolute;
  width: 17px;
  height: 17px;
  left: 2px;
  top:0px;
}
.order-left-list-room-number{
  position: absolute;
  left: 36px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  /* identical to box height */


  color: #202020;
}
.order-left-list-tool-type-img{
  position: absolute;
  width: 17px;
  height: 17px;
  left: 232px;
  top:1px;
}
.order-left-list-tool-type{
  position: absolute;
  left:262px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  /* identical to box height */


  color: #202020;
}
.order-left-list-appointment-date-box{
  position: absolute;
  left: 23px;
  top:88px;
  width: 500px;
  height: 30px;
}
.order-left-list-appointment-date-img{
  position: absolute;
  width: 16px;
  height: 16px;
  left:2px;
  top:2px;
}
.order-left-list-appointment-date{
  position: absolute;
  left: 36px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  /* identical to box height */


  color: #202020;
}
.order-left-list-contact-box{
  position: absolute;
  left: 23px;
  top:120px;
  width: 500px;
  height: 30px;
}
.order-left-list-contacts-img{
  position: absolute;
  width: 16px;
  height: 16px;
  left:2px;
  top:2px;
}
.order-left-list-contact{
  position: absolute;
  left: 36px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  /* identical to box height */


  color: #202020;
}
.order-left-list-phone-img{
  position: absolute;
  width: 17px;
  height: 17px;
  left: 232px;
  top:2px;
}
.order-left-list-phone{
  position: absolute;
  left:262px;
  top: 0px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  /* identical to box height */


  color: #202020;
}
.OrderLeftListDetailButton{
  position: absolute;
  width: 120px;
  height: 34px;
  right: 40px;
  top: 110px;
  background: #3FB89C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  cursor: pointer;
}
.OrderLeftListDetailButtonChose{
  position: absolute;
  width: 120px;
  height: 34px;
  right: 40px;
  top: 110px;
  background: #AEB0C2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  cursor: pointer;
}
.OrderLeftListDetailButton:hover{
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
.order-left-list-detail-text{
  position: absolute;
  left: 19px;
  top: 6px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 1px;
  line-height: 22px;
  /* identical to box height */


  color: #FFFFFF;
}
.order-left-detail-button-img{
  position: absolute;
  width: 30px;
  height: 30px;
  left: 83px;
  top:1px;
}
.order-left-list-order-number-box{
  position: absolute;
  width: 160px;
  height: 36px;
  right: 20px;
  top:13px;
}
.order-left-list-pin-img{
  position: absolute;
  width: 10px;
  height: 18px;
  right: 138px;
  top:1px;
}
.order-left-list-order-number{
  position: absolute;
  right:15px;
  top: -1px;
  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  /* identical to box height */


  color: #202020;
}

::-webkit-scrollbar
{
  width: 7px;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
  border-radius: 10px;
  background-color: rgba(0,0,0,0.1);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: rgba(0,0,0,0.1);
}


</style>
