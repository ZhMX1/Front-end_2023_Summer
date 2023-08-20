<template>
<div style="position: relative;opacity: 1">
<el-card style="width: 38vw;height: 30vh;background-color: white;border-radius: 6px;border: 0;box-shadow: 0 0 14px rgba(0,0,0,0.1)" shadow="hover">
    <div style="width: 10vw;height: 3vh;border-radius: 5px;text-align: left ">
        <i class="el-icon-office-building" style="float: left;margin-left: 1vw;font-size: larger;margin-top: 0.2vh;margin-right: 1vw"></i>
        <div style="font-size: medium;font-family:Heiti;left: 2vw;letter-spacing: 3px"><b>第{{ this.which_floor }}层</b></div>
    </div>
<!--    <div><b>floor:{{ this.which_floor }}</b></div>-->
    <div v-for="item in res_room_list" :key="item.room" style="display: inline-block;margin-left: 10px;margin-right: 10px;margin-top: 10px">
        <el-button v-if="item.available===false" class="rent_room" style="background-color: #FF8126;color: white;border: 0;font-family: 'Montserrat';font-weight: 500;font-size:15px;width: 4.8vw;height: 4.2vh;border-radius: 4px" @click="view_user_card(item.room);">{{item.room}}</el-button>
        <el-button v-if="item.available===true" style="background-color: #F5F6FA;border: 0;font-family: 'Montserrat';font-weight: 500;width: 4.8vw;font-size:15px;height: 4.2vh;border-radius: 4px">{{ item.room }}</el-button>
    </div>
</el-card>
</div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "heat",
    props:{
        which_floor:Number
    },
    data(){
        return{
            if_show_card:0,
            room_list:[
                {
                    name:"101",
                    if_ordered:0
                },
                {
                    name:"102",
                    if_ordered:1
                },
                {
                    name:"103",
                    if_ordered:1
                },
            ],
            res_room_list:[
            ]
        }
    },
    methods:{
        view_user_card(room){
            this.$emit('son_room',room)
        }
    },
    created() {
        console.log("现在是第几层")
        console.log(this.which_floor)
        this.$axios(
            {
                method:'post',
                url:'/floor-info',
                data:{
                    floorNumber:this.which_floor
                }
            }
        ).then((res)=>{
            console.log(res.data.rooms)
            this.res_room_list = res.data.rooms
        })
    }
}
</script>

<style scoped>
.el-button {
    width: 90px;
    text-align: center;
    padding: 5px;
}
.rent_room:hover{
  box-shadow: 0px 2px 12px rgba(255, 129, 38, 0.25);


}
</style>
