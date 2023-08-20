<template>
<div style="position: relative" >
    <el-card id="building" style="width: 30vw;height: 35vh;" shadow="hover" >
        <div style="float: left;font-size: larger;margin-top: 2vh"><b>{{this.jury_name}}</b></div>
        <i class="el-icon-close" style="float: right;cursor: pointer;margin-top: 2vh" @click="hide"></i><div style="clear: both"></div>
        <div style="float: left;font-size: medium">{{this.company_name}}</div><div style="clear: both"></div>
        <i class="el-icon-s-custom" style="float: left;margin-top: 2vh"></i>
        <div style="float:left;margin-top: 1.7vh;margin-left: 0.9vw">联系人:<b>{{this.contact_name}}</b></div><div style="clear: both"></div>
        <i class="el-icon-phone-outline" style="float: left;margin-top: 2vh"></i>
        <div style="float:left;margin-top: 1.7vh;margin-left: 0.9vw">联系电话:<b>{{this.contact_number}}</b></div><div style="clear: both"></div>
        <i class="el-icon-time" style="float: left;margin-top: 2vh"></i>
        <div style="float:left;margin-top: 1.7vh;margin-left: 0.9vw">租赁时间</div><div style="clear: both"></div><div style="clear: both"></div>
        <i class="el-icon-date" style="float: left;margin-top: 2vh"></i>
        <div style="float:left;margin-top: 1.9vh;margin-left: 0.5vw">{{this.start_time}}</div>
        <div style="float:left;margin-top: 1.9vh;margin-left: 0.8vw"><b>To</b></div>
        <i class="el-icon-date" style="float: left;margin-top: 2vh;margin-left: 0.8vw"></i>
        <div style="float:left;margin-top: 1.9vh;margin-left: 0.5vw">{{this.end_time}}</div>
    </el-card>
</div>
</template>

<script>
export default {
    name: "room_details",
    props:{
        if_show_card:Number
    },
    data(){
        return{

            jury_name:"北京航空航天大学股份有限公司",
            company_name:"北京航空航天大学",
            contact_name:"张博皓",
            contact_number:"112233445566",
            start_time:"12 Nov 2022",
            end_time:"12 Nov 2023",
        }
    },
    methods:{
        hide(){
            this.$emit('hide',1)
            // eslint-disable-next-line vue/no-mutating-props
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
#building {
    /*设置透明度，0为完全透明，1为不透明*/
    opacity: 0.9;
}

</style>
