<template>
  <div>
    <div class="select_button" @click="flag = !flag;isSelect=!isSelect">
      <div class="month_name">{{ now.name }}</div>
      <img src="../assets/manageHome/select.svg" width="10" style="position: absolute;right:11px;top:10px" alt=""  :class="{ 'arrowTransform': !flag, 'arrowTransformReturn': flag}">
    </div>
    <div class="select_frame" v-if="isSelect" ref="SelectIng">
      <div class="month_select" v-for="item in months" :key="item.value" v-on:click="selectMonth(item)">{{ item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "YearSelect2",
  data(){
    return {
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
      ]
    }
  },
  methods:{
    selectMonth(month){
      this.isSelect=false;
      this.now=month;
      this.flag=true;
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
    }
  },
  mounted() {
    document.addEventListener('click', this.close);

  },
// 在组件生命周期结束时销毁
  beforeDestroy() {
    // 在 beforeDestroy 钩子函数中移除事件监听器
    document.removeEventListener('click', this.close);
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
</style>