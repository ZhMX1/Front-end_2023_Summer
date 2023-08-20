<template>
    <div class="Allocate-order-total">
        <topbar></topbar>
        <sidebar :which="2" class="side-bar-box"></sidebar>
<!--        <OrderDetailAllot></OrderDetailAllot>-->
        <filter_OrderDetailAllot :orderdetail="orderdetail"></filter_OrderDetailAllot>
        <filter_OrderList @sendDetail="accept"></filter_OrderList>
    </div>
</template>

<script>
import topbar from "@/zbh/topbar.vue";
import filter_OrderList from "@/components/filter_OrderList.vue";
// import OrderList from "@/components/OrderList.vue";
import sidebar from "@/zbh/sidebar.vue";
// import OrderDetailAllot from "@/components/OrderDetailAllot.vue";
import filter_OrderDetailAllot from "@/components/filter_OrderDetailAllot.vue";

export default {
    name: "filter_page",
    components: { sidebar,  topbar,filter_OrderList,filter_OrderDetailAllot},
    data(){
      return{
        orderdetail:'',
      }

    },
    methods:{
      accept(item){
        this.orderdetail=JSON.parse(item)
        console.log(this.orderdetail)
      },
    }

}
</script>

<style scoped>
.Allocate-order-total{
    width: 100vw;
    height: 100vh;
    left: 0;
    top:0;
    background-image:url('../assets/bg/Frame 57.svg') ;
    background-size:70% 100%;
    background-position:50px 2000px;
}
.side-bar-box{
    top:-100px
}
</style>
<style>

</style>
