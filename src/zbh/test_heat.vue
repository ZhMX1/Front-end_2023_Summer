<template>
<div style="position: relative" class="bg">
    <topbar></topbar>
    <sidebar style="position: absolute;top:-4vh" :which="1"></sidebar>
    <div style="width: 83vw;margin-left: 16vw;margin-top: 1vh;opacity: 1;">
        <el-card style="height: 86.9vh;position: relative;overflow: auto;background-color: #FFFFFF;">
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw;opacity: 1" :which_floor=1 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=2 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=3 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=4 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=5 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=6 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=7 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=8 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=9 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=10 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=11 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=12 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=13 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=14 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=15 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=16 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=17 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=18 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=19 @son_room="handleMyEvent"></heat>
            <heat style="margin-top: 1vh;display: inline-block;margin-left: 1vw" :which_floor=20 @son_room="handleMyEvent"></heat>
        </el-card>
    </div>
    <el-dialog
        title=""
        :visible.sync="if_show_card"
        width="30%"
        style="margin-left: 15vw;margin-top: 20vh"
        >
        <div style="height: 32vh; width: 40vw;">
            <span slot="footer" class="dialog-footer" style="height: 500px;">
                <i class="el-icon-user" style="float: left;font-size: large">&nbsp;法人名称:&nbsp;<b>{{this.jury_name}}</b></i><div style="clear: both"></div>
                <i class="el-icon-office-building" style="float: left;font-size: large;margin-top: 2vh">&nbsp;公司名称:&nbsp;<b>{{this.company_name}}</b></i><div style="clear: both"></div>
                <i class="el-icon-s-custom" style="float: left;font-size: large;margin-top: 2vh">&nbsp;联系人:&nbsp;<b>{{this.contact_name}}</b></i><div style="clear: both"></div>
                <i class="el-icon-phone-outline" style="float: left;font-size: large;margin-top: 2vh">&nbsp;联系电话:&nbsp;<b>{{this.contact_number}}</b></i><div style="clear: both"></div>
                <i class="el-icon-time" style="float: left;font-size: large;margin-top: 2vh">&nbsp;租赁时间:</i><div style="clear: both"></div>
                <i class="el-icon-date" style="float: left;font-size: large;margin-top: 2vh">&nbsp;{{this.start_time}}&nbsp;<b>~</b>&nbsp;{{this.end_time}}</i><div style="clear: both"></div>
            </span>
        </div>
    </el-dialog>
</div>
</template>

<script>
import heat from "./heat.vue"
import room_details from "@/zbh/room_details.vue";
import sidebar from "@/zbh/sidebar.vue";
import topbar from "@/zbh/topbar.vue"
export default {
    name: "test_heat",
    // eslint-disable-next-line vue/no-unused-components
    components:{heat,room_details,sidebar,topbar},
    data() {
        return{
            which_floor:"1~4",
            which_group:1,
            if_show_card:false,
            jury_name:"",
            company_name:"",
            contact_name:"",
            contact_number:"",
            start_time:"12 Nov 2022",
            end_time:"12 Nov 2023",
            command:""
        }
    },
    methods:{
        // handleClose(done) {
        //     // this.$confirm('确认关闭？')
        //     //     // eslint-disable-next-line no-unused-vars
        //     //     .then(_ => {
        //     //         done();
        //     //     })
        //     //     // eslint-disable-next-line no-unused-vars
        //     //     .catch(_ => {});
        // },
        handleClose() {
            this.$confirm('确认关闭？')

        },
        hide(){
            this.$emit('hide',1)
            // eslint-disable-next-line vue/no-mutating-props

        },
        handleCommand(command){
            if(command === "1"){
                this.which_floor = "1~4"
                this.which_group=1
                localStorage.setItem('whichigroup',1)
                localStorage.setItem('whichfloor','1~4')
            }
            else if(command === "2"){
                this.which_floor = "5~8"
                this.which_group=2
                localStorage.setItem('whichigroup',2)
                localStorage.setItem('whichfloor','5~8')
            }
            else if(command === "3"){
                this.which_floor = "9~12"
                this.which_group=3
                localStorage.setItem('whichigroup',3)
                localStorage.setItem('whichfloor','9~12')
            }
            else if(command === "4"){
                this.which_floor = "13~16"
                this.which_group=4
                localStorage.setItem('whichigroup',4)
                localStorage.setItem('whichfloor','13~16')
            }
            else if(command === "5"){
                this.which_floor = "17~20"
                this.which_group=5
                localStorage.setItem('whichigroup',5)
                localStorage.setItem('whichfloor','17~20')
            }
            window.location.reload()
        },
        handleMyEvent(message){
            console.log("房间号为"+message)
            this.$axios(
                {
                    method:'POST',
                    url:'/room-lease-info',
                    data:{
                        room_id:message
                    }
                }
            ).then((res)=>{
                console.log(res.data.room_lease_info)
                this.contact_name = res.data.room_lease_info.contact_person
                this.jury_name = res.data.room_lease_info.name
                this.company_name = res.data.room_lease_info.legal_person
                this.contact_number = res.data.room_lease_info.contact_phone
                this.start_time = res.data.room_lease_info.start_time.substring(0,10)
                this.end_time = res.data.room_lease_info.end_time.substring(0,10)
            })
            this.if_show_card=true
        },
        hide_card(){
            this.if_show_card=0
        }
    },
    created() {
        this.which_group=parseInt(localStorage.getItem('whichigroup'))
        this.which_floor = localStorage.getItem('whichfloor')
        if(this.which_floor===null||this.which_floor===undefined||this.which_floor===''){
            this.which_group=1
            this.command='1'
        }
    }
}
</script>

<style scoped>
.bg{
    position: absolute;
    background: #F5F5F5;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-image:url('../assets/bg/Frame 57.svg') ;
    background-size:70% 100%;
    background-position:50px 2000px;
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
  background-color: #FFFFFF;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: rgba(0,0,0,0.1);
}

</style>
