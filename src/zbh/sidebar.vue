<template>
<div style="position: relative">
    <el-card style="width: 15vw;height: 87vh;margin-top: 15vh" v-if="this.which===1">
        <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;margin-top:-2.5vh;background-color: #3FB89C;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);border-radius: 10px;" shadow="hover" v-if="status==='5'">
            <i class="el-icon-data-line" style="color: white;font-size: large" >&nbsp;数据统计概览</i>
        </el-card>
        <div @click="change_status('5')" >
            <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;margin-top:-2.5vh;cursor: pointer;border: 0" shadow="hover"  v-if="this.status!=='5'">
                <i class="el-icon-data-line" style="font-size: large">&nbsp;数据统计概览</i>
            </el-card></div>
<!--        <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;margin-top:-2.5vh;background-color: #3FB89C;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);border-radius: 10px;" shadow="hover" v-if="status==='1'">-->
<!--            <i class="el-icon-document" style="color: white;font-size: large" >&nbsp;待处理工单</i>-->
<!--        </el-card>-->
<!--        <div @click="change_status('1')">-->
<!--        <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;margin-top:-2.5vh;cursor: pointer;border: 0" shadow="hover" v-if="status!=='1'" >-->
<!--            <i class="el-icon-document" style="font-size: large" >&nbsp;待处理工单</i>-->
<!--        </el-card></div>-->
        <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;background-color: #3FB89C;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);border-radius: 10px;" shadow="hover" v-if="status==='2'">
            <i class="el-icon-user" style="color: white;font-size: large" >&nbsp;客户信息管理</i>
        </el-card>
        <div @click="change_status('2')">
        <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;cursor: pointer;border: 0" shadow="hover" v-if="status!=='2'" >
            <i class="el-icon-user" style="font-size: large">&nbsp;客户信息管理</i>
        </el-card></div>
        <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;background-color: #3FB89C;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);border-radius: 10px;" shadow="hover" v-if="status==='3'">
            <i class="el-icon-edit" style="color: white;font-size: large" >&nbsp;管理人员列表</i>
        </el-card>
        <router-link to="/client_list"><div @click="change_status('3')">
        <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;cursor: pointer;border: 0" shadow="hover" v-if="status!=='3'" >
            <i class="el-icon-edit" style="font-size: large">&nbsp;管理人员列表</i>
        </el-card></div></router-link>
        <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;background-color: #3FB89C;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);border-radius: 10px;" shadow="hover" v-if="status==='4'" >
            <i class="el-icon-office-building" style="color: white;font-size: large" >&nbsp;房间状态管理</i>
        </el-card>
        <router-link to="/testheat"><div @click="change_status('4')">
        <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;cursor: pointer;border: 0" shadow="hover" v-if="status!=='4'" >
            <i class="el-icon-office-building" style="font-size: large">&nbsp;房间状态管理</i>
        </el-card></div></router-link>
                <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;background-color: #3FB89C;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);border-radius: 10px;" shadow="hover" v-if="status==='1'">
                    <i class="el-icon-document" style="color: white;font-size: large" >&nbsp;待处理工单</i>
                </el-card>
                <div @click="change_status('1')">
                <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;cursor: pointer;border: 0" shadow="hover" v-if="status!=='1'" >
                    <i class="el-icon-document" style="font-size: large" >&nbsp;待处理工单</i>
                </el-card></div>
                <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;background-color: #3FB89C;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);border-radius: 10px;" shadow="hover" v-if="status==='6'">
                    <i class="el-icon-view" style="color: white;font-size: large" >&nbsp;维修工知识库</i>
                </el-card>
                <div @click="change_status('6')">
                    <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;cursor: pointer;border: 0" shadow="hover" v-if="status!=='6'" >
                        <i class="el-icon-view" style="font-size: large">&nbsp;维修工知识库</i>
                    </el-card></div>
        <img src="../assets/bg/Frame 58.svg" style="width:80%; margin-top: 10vh;"/>
    </el-card>
    <el-card style="width: 15vw;height: 80vh;margin-top: 15vh" v-if="this.which===2">
        <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;margin-top:-2.5vh;background-color: #3FB89C;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);border-radius: 10px;" shadow="hover" v-if="status==='1'">
            <i class="el-icon-document" style="color: white;font-size: large" >&nbsp;待处理工单</i>
        </el-card>
        <div @click="change_status('1')">
            <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;margin-top:-2.5vh;cursor: pointer;border: 0" shadow="hover" v-if="status!=='1'" >
                <i class="el-icon-document" style="font-size: large">&nbsp;待处理工单</i>
            </el-card></div>
        <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;background-color: #3FB89C;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);border-radius: 10px;" shadow="hover" v-if="status==='2'">
            <i class="el-icon-time" style="color: white;font-size: large" >&nbsp;历史工单列表</i>
        </el-card>
        <div @click="change_status('2')">
            <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;cursor: pointer;border: 0" shadow="hover" v-if="status!=='2'" >
                <i class="el-icon-time" style="font-size: large">&nbsp;历史工单列表</i>
            </el-card></div>
        <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;background-color: #3FB89C;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);border-radius: 10px;" shadow="hover" v-if="status==='3'">
            <i class="el-icon-view" style="color: white;font-size: large" >&nbsp;维修知识库</i>
        </el-card>
        <div @click="change_status('3')">
            <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;cursor: pointer;border: 0" shadow="hover" v-if="status!=='3'" >
                <i class="el-icon-view" style="font-size: large">&nbsp;维修知识库</i>
            </el-card></div>
        <img src="../assets/bg/Frame 58.svg" style="width:80%; margin-top: 35vh;"/>
    </el-card>
    <el-card style="width: 15vw;height: 81.3vh;margin-top: 15vh" v-if="this.which===3">
        <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;margin-top:-2.5vh;background-color: #E04410;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);border-radius: 10px;" shadow="hover" v-if="status==='1'">
            <i class="el-icon-s-home" style="color: white;font-size: large" >&nbsp;主页</i>
        </el-card>
        <div @click="change_status('1')">
            <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;margin-top:-2.5vh;cursor: pointer;border: 0" shadow="hover" v-if="status!=='1'" >
                <i class="el-icon-s-home" style="font-size: large">&nbsp;主页</i>
            </el-card></div>
        <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;background-color: #E04410;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);border-radius: 10px;" shadow="hover" v-if="status==='2'">
            <i class="el-icon-user" style="color: white;font-size: large" >&nbsp;访客申请列表</i>
        </el-card>
        <div @click="change_status('2')">
            <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;cursor: pointer;border: 0" shadow="hover" v-if="status!=='2'" >
                <i class="el-icon-user" style="font-size: large">&nbsp;访客申请列表</i>
            </el-card></div>
        <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;background-color: #E04410;box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);border-radius: 10px;" shadow="hover" v-if="status==='3'">
            <i class="el-icon-time" style="color: white;font-size: large" >&nbsp;历史工单列表</i>
        </el-card>
        <div @click="change_status('3')">
            <el-card style="width: 14.7vw;height: 8vh;margin-left: -1.2vw;cursor: pointer;border: 0" shadow="hover" v-if="status!=='3'" >
                <i class="el-icon-time" style="font-size: large">&nbsp;历史工单列表</i>
            </el-card></div>
        <img src="../assets/bg/Frame 59.svg" style="width:80%; margin-top: 35vh;"/>
    </el-card>
</div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "sidebar",
    props:{
        which:Number
    },
    data(){
        return{
            // which:3,//1表示管理员，2表示维修者，3表示租赁者（用户）
            status:'1',
        }
    },
    methods:{
        change_status(num){
            console.log(num)
            if(num!=='6'&&!(num==='3'&&this.which===2)) {
                localStorage.setItem('side_bar_status', num)
                this.status = num
            }
            if(num==='2'&&this.which===1){
                this.$router.push('/usermanage')
            }
            else if(num==='1'&&this.which===1){
                this.$router.push('/AllocateOrder')
            }
            else if(num==='1'&&this.which===2){
                this.$router.push('/filter_page')
            }
            else if(num==='1'&&this.which===3){
                this.$router.push('/guestHome')
            }
            else if(num==='2'&&this.which===3){
                this.$router.push('/guestInvite')
            }
            else if(num==='3'&&this.which===3){
                this.$router.push('/guestOrder')
            }else if(num==='2'&&this.which===2){
              this.$router.push('/RepairHistory')
            }
            else if(num==='5'&&this.which===1){
              this.$router.push('/manageHome')
            }
            else if(num==='6'&&this.which===1){
                window.open('http://10.251.253.227:8181/docs/mindoc', '_blank')
            }
            else if(num==='3'&&this.which===2){
                window.open('http://10.251.253.227:8181/docs/mindoc', '_blank')
            }else if(num==='3'&&this.which===1){
              this.$router.push('/client_list')
            }
        }
    },
    created() {
        var a = localStorage.getItem('side_bar_status')
        console.log(a)
        this.status=a
        if(this.status===null||this.status===undefined||this.status===""){
            this.status='1'
        }
    }
}
</script>

<style scoped>

</style>
