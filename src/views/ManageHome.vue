<template>
<div style="height: 100%;width: 100%;overflow: hidden;">
  <topbar></topbar>
  <sidebar style="position: absolute;top:-4vh" :which="1"></sidebar>
  <div class="orderCount_bar">
    <img src="../assets/manageHome/file-warning-line.svg" width="21.6" style="position: absolute;top: 2.3vh;left: 2vh">
    <div class="bar_title">未完成订单数</div>
    <div class="ordersBlock1" style="left: 146px" v-on:click="toHandle()">
      <div class="block_title">未完成订单数</div>
      <div class="block_count">{{ undoOrder }}</div>
      <img src="../assets/manageHome/entrance.svg" width="20" style="position: absolute;top:40px;left: 20px">
    </div>
    <div class="ordersBlock2" style="left: 436px">
      <div class="block_title">已完成订单数</div>
      <div class="block_count">{{ doneOrder }}</div>
      <img src="../assets/manageHome/complete.svg" width="20" style="position: absolute;top:40px;left: 20px">
    </div>
    <div>
      <img src="../assets/bg/Group 4879.svg" style="float: right;width: 10vw;height: 10vh;margin-right: 4vw;margin-top: 7vh;">
    </div>
  </div>
  <div class="repairCount_bar">
    <img src="../assets/manageHome/Repair.svg" width="17.4" style="position: absolute;top: 2.5vh;left: 2.1vh">
    <div class="bar_title">维修工作统计</div>
    <div style="position:absolute;top:21%;left:5%;height: 72%;width: 390px;border-radius:8px;background-color: #F5F6FA">
      <MonthSelect v-on:change="getMonthCount(temp_uuid,$event)"></MonthSelect>
      <div class="CountTitle">按月统计
        <img src="../assets/manageHome/Count.svg" width="11" style="position: absolute;top: 3px;margin-left: 4px">
      </div>
      <div id="month-pie" style="height: 310px;margin-top: -50px"  v-show="monthFlag"></div>
      <div style="position: absolute;z-index: 1000;left:110px;bottom:25px" v-show="!monthFlag">
        <img src="../assets/manageHome/cat_epte.svg" width="180">
        <div style="font-family: Heiti-lighter;font-size: 14px;margin-top: 10px">本月暂无订单</div>
      </div>
    </div>
    <div style="position:absolute;top:21%;right:5%;height: 72%;width: 390px;border-radius:8px;background-color: #F5F6FA">
      <YearSelect v-on:change="getYearCount(temp_uuid,$event)"></YearSelect>
      <div class="CountTitle">按年统计
        <img src="../assets/manageHome/Count.svg" width="11" style="position: absolute;top: 3px;margin-left: 4px">
      </div>
      <div id="year-pie" style="height: 310px;margin-top: -50px" v-show="yearFlag" ></div>
      <div style="position: absolute;z-index: 1000;left:130px;bottom:25px" v-show="!yearFlag">
        <img src="../assets/manageHome/dog_c7i6.svg" width="150">
        <div style="font-family: Heiti-lighter;font-size: 14px;margin-top: 5px">本年暂无订单</div>
      </div>
    </div>
  </div>
  <div class="visitorCount_bar">
    <img src="../assets/manageHome/visitor.svg" width="17.4" style="position: absolute;top: 2.6vh;left: 2.1vh">
    <div class="bar_title">访客数量统计</div>
    <div style="position:relative;margin-left: 47vw">
      <div class="select_button" @click="flag = !flag;isSelect=!isSelect">
        <div class="month_name">{{ now.name }}</div>
        <img src="../assets/manageHome/select.svg" width="10" style="position: absolute;right:11px;top:10px" alt=""  :class="{ 'arrowTransform': !flag, 'arrowTransformReturn': flag}">
      </div>
      <div class="select_frame" v-if="isSelect" ref="SelectIng">
        <div class="month_select" v-for="item in months" :key="item.value" v-on:click="selectYear(item)">{{ item.name}}</div>
      </div>
    </div>
    <div style="position:relative; margin-left: 52vw">
      <div class="select_button" @click="flag2 = !flag2;isSelect2=!isSelect2">
        <div class="month_name">{{ now2.name }}</div>
        <img src="../assets/manageHome/select.svg" width="10" style="position: absolute;right:11px;top:10px" alt=""  :class="{ 'arrowTransform': !flag2, 'arrowTransformReturn': flag2}">
      </div>
      <div class="select_frame" v-if="isSelect2" ref="SelectIng">
        <div class="month_select" v-for="item in months2" :key="item.value" v-on:click="selectMonth(item)">{{ item.name}}</div>
      </div>
    </div>
<!--    <div style="position:relative;margin-left: 13vw"><YearSelect2 /></div>-->
<!--    <div style="position:relative; margin-left: 20vw"><MonthSelect2 /></div>-->
<!--    <div style="position: relative;z-index: 1000; padding-top: 10px; width: 100%" v-if="visitCounter===0">-->
<!--      <img src="../assets/manageHome/empty_visit.svg" width="180">-->
<!--      <div style="font-family: Heiti-lighter;font-size: 14px;margin-top: -30px">暂无访客</div>-->
<!--    </div>-->
    <div class="visitGraph" :lazy="true">
      <barGraph class="graph" ref="graph1" :xcounts="xData" :ycounts="yData"/>
    </div>

  </div>
  <div class="visitorCompany_bar">
    <div class="bar_title">公司访客人数</div>
    <div class="company_list" style="width: 100%;height: 70vh;position: absolute;top:8.1vh;">
      <div v-bind:class="{ 'company_card_select': selectedCompanyIndex === index,'company_card': selectedCompanyIndex !== index}" v-for="(item,index) in company_list" :key="item.company_uuid" v-on:click="selectCompanyCard(index)">
        <div style="width: 90%;height: 54px;position: absolute;">
        <img src="../assets/manageHome/Group.svg" class="company_icon" width="22" v-if="selectedCompanyIndex !== index">
          <img src="../assets/manageHome/Group_select.svg" class="company_icon" width="22" v-if="selectedCompanyIndex === index">
        <div class="company_name" >{{ item.company_name }}</div>
        <div style="font-size: 18px;font-family: Poppins;font-weight: 500;position: absolute;line-height: 54px;right: 12%">
          {{ item.visitor_num }}</div>
        </div>
        </div>
    </div>
    <div class="pagination">
      <el-pagination
          small
          layout="prev, pager, next"
          :total="10"
          :page-size="8"
          @current-change="handlechange"
          :current-page="this.now_page"
          background
      >
      </el-pagination>
    </div>
  </div>
</div>
</template>

<script>

import barGraph from "@/components/barGraph.vue";
import Topbar from "@/zbh/topbar";
import Sidebar from "@/zbh/sidebar";
import MonthSelect from "@/components/MonthSelect";
import YearSelect from "@/components/YearSelect";
export default {
  name: "ManageHome",
  components: {YearSelect, MonthSelect, Sidebar, Topbar, barGraph},
  data() {
    return {
      yData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      xData: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      xData1: [ '1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日'],
      xData2: [ '1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日', '31日'],
      xData3: [ '1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日'],
      xData4: [ '1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日'],
      xData5: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      flag : true,
      isSelect: false,
      now: {name:'2023',value:2023},
      months:[{name:'2023',value:2023},
        {name:'2022',value:2022},
        {name:'2021',value:2021},
        {name:'2020',value:2020},
        {name:'2019',value:2019},
        {name:'2018',value:2018},
        {name:'2017',value:2017},
      ],
      flag2 : true,
      isSelect2: false,
      now2: {name:'6月',value:6},
      months2:[{name:'按年',value:'0'},
        {name:'1月',value:1},
        {name:'2月',value:2},
        {name:'3月',value:3},
        {name:'4月',value:4},
        {name:'5月',value:5},
        {name:'6月',value:6},
        {name:'7月',value:7},
        {name:'8月',value:8},
        {name:'9月',value:9},
        {name:'10月',value:10},
        {name:'11月',value:11},
        {name:'12月',value:12},],
      options: [{
        value: '选项1',
        label: '1月'
      }, {
        value: '选项2',
        label: '2月'
      }, {
        value: '选项3',
        label: '3月'
      }, {
        value: '选项4',
        label: '4月'
      }, {
        value: '选项5',
        label: '5月'
      },{
        value: '选项5',
        label: '5月'
      }, {
          value: '选项6',
          label: '6月'
        },{
          value: '选项7',
          label: '7月'
        },{
          value: '选项8',
          label: '8月'
        },{
          value: '选项9',
          label: '9月'
        },{
          value: '选项10',
          label: '10月'
        },{
        value: '选项11',
        label: '11月'
      },{
        value: '选项12',
        label: '12月'
      }
      ],
      company_list:[],
      company_total:0,
      undoOrder:0,
      doneOrder:0,
      monthOrder:[],
      visitCounter: 1,
      yearOrder:[],
      visitYear: '2023',
      visitMonth: '6',
      monthFlag:true,
      yearFlag:true,
      now_page:1,
      selectedCompanyIndex: -1,
      temp_uuid:null,
      temp_month:6,
      temp_year:2023,
      month_isDestroyed:false,
      year_isDestroyed:false
    }
  },
  methods:{
    selectYear(month){
      this.isSelect=false;
      this.now=month;
      this.visitYear = month.name;
      this.flag=true;
      this.getCountVisitor();
    },
    closeSelect(){
      this.isSelect=false;
      this.flag=true;
    },

    close(event) {
      // 检查点击事件的目标元素是否位于Vue组件之内
      if (!this.$el.contains(event.target)) {
        this.closeSelect();
      }
    },
    selectMonth(month){
      this.isSelect2=false;
      this.now2=month;
      if(month.value != 0) {
        this.visitMonth = month.value.toString();
      } else {
        this.visitMonth = '';
      }
      this.flag2=true;
      this.getCountVisitor();
    },
    closeSelect2(){
      this.isSelect2=false;
      this.flag2=true;
    },

    close2(event) {
      // 检查点击事件的目标元素是否位于Vue组件之内
      if (!this.$el.contains(event.target)) {
        this.closeSelect2();
      }
    },
    toHandle(){
        localStorage.setItem('side_bar_status', '1')
      this.$router.push('/AllocateOrder')
    },
    getOrdersCount(){
      this.$axios(
          {
            method:'GET',
            url:'/count/worksheet',
            params:{
              //uuid:'',
              year:'2023',
              month:'6'
            }
          }
      ).then((res)=>{
        this.undoOrder=res.data.doData.undo
        this.doneOrder=res.data.doData.done
      })
    },
    handlechange(val){
      this.now_page=val;
      this.getCompanyList(this.now_page);
    },
    getCompanyList(now_page){
      this.$axios(
          {
            method:'GET',
            url:'/count/company',
            params:{
              page:now_page,
              page_size:'8'
            }
          }
      ).then((res)=>{
        console.log(res.data)
        this.company_list=res.data.data;
        this.company_total=res.data.total;
        console.log(this.company_list);
        let i;
        for(i in this.company_list){
          this.company_list[i].isChosen = false;
        }
        console.log(this.company_total)
      })
    },
    selectCompanyCard(index) {
      if(this.selectedCompanyIndex===index){
        this.selectedCompanyIndex=-1;
        this.temp_uuid=null;
        this.getCountVisitor();
        this.getMonthCount(null,this.temp_month);
        this.getYearCount(null,this.temp_year);
      }else {
        this.selectedCompanyIndex = index; // 更新选择的公司卡片索引
        this.temp_uuid=this.company_list[index].company_uuid;
        this.getCountVisitor();
        this.getMonthCount(this.company_list[index].company_uuid,this.temp_month);
        this.getYearCount(this.company_list[index].company_uuid,this.temp_year);
      }
    },
    getMonthCount(uuid,month){
      this.temp_month=month;
     // this.monthFlag=true;
      this.$axios(
          {
            method:'GET',
            url:'/count/worksheet',
            params:{
              uuid:uuid,
              year:'2023',
              month:month
            }
          }
      ).then((res)=>{
        this.monthOrder=res.data.monthData
        if(this.monthOrder.total>0){
          this.monthFlag=true;
          if(this.month_isDestroyed){
            return;
          }
        const chartDom_Month = document.getElementById('month-pie')
        const chart_month = this.$echarts.init(chartDom_Month)
        chart_month.setOption({
          tooltip: {
            trigger: 'item'
          },
          legend: {
            show: false,
            top: '5%',
            left: 'center',
            // doesn't perfectly work with our tricks, disable it
            selectedMode: false
          },
          color:['#F77D52','#3FB89C','#FBE06A'],
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['60%', '70%'],
              center: ['50%', '70%'],
              // adjust the start angle
              startAngle: 180,
              itemStyle: {
                borderRadius: 1,
              },

              label: {
                show: true,
                fontSize:12,
                fontFamily:'Heiti',
                fontWeight:'600',
                formatter(param) {
                  // correct the percentage
                  return param.name ;
                }
              },
              data: [
                { value: this.monthOrder.machine, name: '机械' },
                { value: this.monthOrder.water , name: '水' },
                { value: this.monthOrder.electricity , name: '电' },
                {
                  // make an record to fill the bottom 50%
                  value: this.monthOrder.total ,
                  itemStyle: {
                    // stop the chart from rendering this piece
                    color: 'none',
                    decal: {
                      symbol: 'none'
                    }
                  },
                  label: {
                    show: false
                  }
                }
              ]
            }
          ]
        })
      }else {
          this.monthFlag=false
        }
      }
      )
    },
    getYearCount(uuid,year){
      this.temp_year=year;
      this.$axios(
          {
            method:'GET',
            url:'/count/worksheet',
            params:{
              uuid:uuid,
              year:year,
              month:'6'
            }
          }
      ).then((res)=>{
        this.yearOrder=res.data.yearData;
            this.yearFlag=true;
        if(this.yearOrder.total>0){
          if(this.year_isDestroyed){
            return;
          }

        const chartDom_Year = document.getElementById('year-pie')
        const chart_year = this.$echarts.init(chartDom_Year)
        chart_year.setOption({
          tooltip: {
            trigger: 'item'
          },
          legend: {
            show: false,
            top: '5%',
            left: 'center',
            // doesn't perfectly work with our tricks, disable it
            selectedMode: false
          },
          color:['#F77D52','#3FB89C','#FBE06A'],
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['60%', '70%'],
              center: ['50%', '70%'],
              // adjust the start angle
              startAngle: 180,
              itemStyle: {
                borderRadius: 1,

              },

              label: {
                show: true,
                fontSize:12,
                fontFamily:'Heiti',
                fontWeight:'600',
                formatter(param) {
                  // correct the percentage
                  return param.name ;
                }
              },
              data: [
                { value: this.yearOrder.machine, name: '机械' },
                { value: this.yearOrder.water, name: '水' },
                { value: this.yearOrder.electricity, name: '电' },
                {
                  // make an record to fill the bottom 50%
                  value: this.yearOrder.total ,
                  itemStyle: {
                    // stop the chart from rendering this piece
                    color: 'none',
                    decal: {
                      symbol: 'none'
                    }
                  },
                  label: {
                    show: false
                  }
                }
              ]
            }
          ]
        })
      }else{
          this.yearFlag=false
        }
      }
      )
    },
    getCountVisitor() {
      let that = this;
      that.$axios({
        method: 'get',
        url: '/count/visitor',
        params:{
          uuid: this.temp_uuid,
          year: this.visitYear,
          month: this.visitMonth
        }
      }).then((res) => {
        console.log("获取大厦访客数量", res.data);
        this.yData = res.data.data;
        this.visitCounter = 0;
        // for( var i = 0; i < this.yData.length; i++) {
        //   this.visitCounter += this.yData[i];
        //   if(this.yData[i] === 0) {
        //     this.yData[i] = 0.1;
        //   }
        // }
        console.log("yData", this.yData)
        if(res.data.data.length === 12) {
          this.xData = this.xData5;
        } else if(res.data.data.length === 31) {
          this.xData = this.xData2;
        } else if(res.data.data.length === 30) {
          this.xData = this.xData1;
        } else if(res.data.data.length === 29) {
          this.xData = this.xData3;
        } else if(res.data.data.length === 28) {
          this.xData = this.xData4;
        }
        this.$message.success(res.data.msg);
      }).catch(error=> {
            console.log("error", error);
          }
      )
    },
  },
  mounted() {
    document.addEventListener('click', this.close);
    document.addEventListener('click', this.close2);
    this.getCompanyList(1);
    this.getOrdersCount();
    this.getMonthCount(null,6);
    this.getYearCount(null,2023);
    this.getCountVisitor();

  },

  // 在组件生命周期结束时销毁
  beforeDestroy() {
    this.month_isDestroyed=true;
    this.year_isDestroyed=true;
    // 在 beforeDestroy 钩子函数中移除事件监听器
    document.removeEventListener('click', this.close);
    document.removeEventListener('click', this.close2);
    this.$echarts.dispose(document.getElementById("year-pie"));
    this.$echarts.dispose(document.getElementById("month-pie"));
  },

}
</script>

<style scoped>
.select_button{
  width: 60px;
  height: 26px;
  border: 1px solid #202020;
  border-radius: 11px;
  position: absolute;
  left: 25px;
  top:10px;
  z-index: 100;
  cursor: pointer;
}
.select_button:hover{
  border: 1px solid #9B9B9B;
  color: #9B9B9B;
}
.month_name{
  font-family: Heiti;
  font-weight: 800;
  font-size: 14px;
  line-height: 26px;
  text-align: right;
  margin-right: 23px;
}
.arrowTransform{
  transition: 0.2s;
  transform-origin: center;
  transform: rotateZ(180deg);
}
.arrowTransformReturn{
  transition: 0.2s;
  transform-origin: center;
  transform: rotateZ(0deg);
}
.select_frame{
  width: 60px;
  max-height: 140px;
  position: absolute;
  z-index: 100;
  top:42px;
  left: 26px;
  background-color: #FFFFFF;
  box-shadow: 0 0 10px rgba(0,0,0,0.15);
  border-radius: 2px;
  overflow: scroll;
}
.month_select{
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-family: Heiti;
  font-weight: 800;
  font-size: 13px;
}
.month_select:hover{
  background-color: #CBEFE7;
  cursor: pointer;
}
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
.visitorCompany_bar{
  width: 20vw;
  height: calc(100% - 14vh);
  position: absolute;
  top:12vh;
  right: 2vh;
  border-radius: 6px;
  background: #FFF;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.15);
}
.orderCount_bar{
  width: 60.4vw;
  height: 21.2vh;
  position: absolute;
  left: 16.8vw;
  top:12vh;
  border-radius: 6px;
  background: #FFF;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);

}
.repairCount_bar{
  width: 60.4vw;
  height: 36vh;
  position: absolute;
  left: 16.8vw;
  top:35vh;
  border-radius: 6px;
  background: #FFF;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
}
.visitorCount_bar{
  width: 60.4vw;
  height: 25.2vh;
  position: absolute;
  left: 16.8vw;
  top:72.8vh;
  border-radius: 6px;
  background: #FFF;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
.bar_title{
  font-family: Heiti;
  font-weight: 800;
  font-size:16px ;
  text-align: left;
  position: absolute;
  left: 6vh;
  top:2.6vh;
  color: #202020;
}
.pagination {
  position: absolute;
  bottom: 2vh;
  width: 100%;
  text-align: center;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #3FB89C;
  color: #fff;
  font-weight: lighter;
  font-family: Montserrat;
}
/deep/ .el-pager li{
  font-weight: lighter;
  font-family: Montserrat;
}
.company_card{
  width: 90%;
  height: 54px;
  line-height: 54px;
  text-align: left;
  background-color: #F5F6FA;
  margin-left: 5%;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  color: #202020;
}
.company_card:hover{
  box-shadow: 0 0 14px rgba(0,0,0,0.1);
}
.company_card_select{
  width: 90%;
  height: 54px;
  line-height: 54px;
  text-align: left;
  background-color: #202020;
  color: #F5F6FA;
  margin-left: 5%;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
}
.company_card_select:hover{
  box-shadow: 0 0 14px rgba(0,0,0,0.34);
}
.company_icon{
  position: absolute;
  left:8%;
  top: 12px;
}
.company_name{
  line-height: 54px;
  font-family: Heiti-lighter;
  font-size: 14px;
  position:absolute;
  left:22%;
  text-align: left;
  width: 48%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.CountTitle{
  font-family: Heiti;
  font-weight: 800;
  font-size: 14px;
  position: absolute;
  top: 12px;
  width: 100%;
  text-align: center;
}
.visitGraph {
  margin-top: 5vh;
  margin-left: 3vw;
  height: 210px;
  width: 55vw;
}
.ordersBlock1{
  width: 250px;
  height: 79px;
  border-radius: 10px;
  background: #FE8863;
  position: absolute;
  bottom:26px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;

}
.ordersBlock1:hover{
  transition: 0.4s;
  transform-origin: center;
  background-color: #EA5927;
  box-shadow: 0px 2px 15px 0px rgba(234, 89, 39, 0.25);
}
.ordersBlock2{
  width: 250px;
  height: 79px;
  border-radius: 10px;
  background: #45C7A9;
  position: absolute;
  bottom:26px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.15);
  cursor: default;
}
.ordersBlock1:hover{
  transition: 0.4s;
  transform-origin: center;
  background-color: #EA5927;
  box-shadow: 0px 2px 15px 0px rgba(234, 89, 39, 0.25);
}
.ordersBlock2:hover{
  transition: 0.4s;
  transform-origin: center;
  background-color: #3FB89C;
  box-shadow: 0px 2px 15px 0px rgba(66, 171, 147, 0.25);
}
.block_title{
  font-family: Heiti-lighter;
  font-weight: 500;
  font-size: 14px;
  position: absolute;
  top: 12px;
  color: #FFFFFF;
  width: 100%;
  text-align: left;
  left: 20px;
}
.block_count{
  font-family:"Roboto Light";
  font-weight: 500;
  font-size: 34px;
  position: absolute;
  top: 16px;
  color: #FFFFFF;
  width: 100%;
  text-align: right;
  right: 30px;
}
</style>
