<template>
  <div class="Allocate-order-total">
    <topbar ></topbar>
    <!-- <sidebar :which="1" class="side-bar-box"></sidebar> -->
    <sidebar style="position: absolute;top:-4vh" :which="1"></sidebar>
    <OrderDetailAllot :orderdetail="orderdetail"></OrderDetailAllot>
    <OrderList @sendDetail="accept"></OrderList>
  </div>
</template>

<script>
import OrderDetailAllot from "@/components/OrderDetailAllot";
import OrderList from "@/components/OrderList";
import topbar from "@/zbh/topbar";
import sidebar from "@/zbh/sidebar";

export default {
  name: "AllocateOrder",
  data(){
    return{
      orderdetail:'',
      ifchose:'',
    }

  },
  components:{
    OrderDetailAllot,
    OrderList,
    topbar,
    sidebar,
  },
  methods:{
    accept(item){
      this.orderdetail=JSON.parse(item)
      console.log(this.orderdetail)
    },
    // chose(item){
    //   this.ifchose=item
    // }
  }
}
</script>

<style scoped>
.Allocate-order-total{
    width: 100%;
    height: 100vh;
    left: 0;
    top:0;
    background-image:url('../assets/bg/Frame 57.svg');
    background-size:70% 100%;
    background-position:50px 2000px;
}
.side-bar-box{
  top:-118px
}
</style>
<!--<style>-->
<!--::-webkit-scrollbar {-->
<!--  width: 0 !important;-->
<!--}-->
<!--::-webkit-scrollbar {-->
<!--  width: 0 !important;height: 0;-->
<!--}-->
<!--</style>-->
