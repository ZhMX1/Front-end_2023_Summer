<template>
<div style="position: relative" class="bg">
    <topbar></topbar>
    <sidebar style="position: absolute;top:-4vh" :which="1"></sidebar>
    <div style="width: 83vw;margin-left: 16vw;margin-top: 1vh;">
        <el-card style="height: 86.7vh;position: relative;overflow: auto" >
            <div style="float: left;margin-left: 4vw;margin-top: 3.2vh">
                <img src="./img/client.png" alt="大厦客户列表" class="client">
            </div>
            <el-tabs v-model="which_list" @tab-click="handleClick" class="top-chose">
              <el-tab-pane label="管理人员列表" name="1" style="float: left;margin-left: 1vw;margin-top: 4vh;font-family: Heiti-lighter;font-weight: 600;"></el-tab-pane>
              <el-tab-pane label="维修人员列表" name="2" style="float: left;margin-left: 1vw;margin-top: 4vh;font-family: Heiti-lighter"></el-tab-pane>
            </el-tabs>
<!--            <el-radio v-model="which_list" label="1" style="float: left;margin-left: 1vw;margin-top: 4vh;" ><b style="font-size: larger">管理人员列表</b></el-radio>-->
<!--            <el-radio v-model="which_list" label="2" style="float: left;margin-left: 1vw;margin-top: 4vh;"><b style="font-size: larger">维修人员列表</b></el-radio>-->
            <div style="position: absolute;margin-top: 3.5vh;left: 65vw">
                <el-button type="primary" icon="el-icon-circle-plus" style="background-color: #3FB89C;border-color: white;font-family: Heiti-lighter;font-size: 14px;font-weight: 580" v-if="this.which_list==='1'" @click="add_person(1)">增加管理人员</el-button>
                <el-button type="primary" icon="el-icon-circle-plus" style="background-color: #3FB89C;border-color: white;font-family: Heiti-lighter;font-size: 14px;font-weight: 580" v-if="this.which_list==='2'" @click="add_person(2)">增加维修人员</el-button>
            </div>
            <div style="clear: both;"></div>
<!--            <div class="client-title" v-if="this.which_list==='1'&&this.add_kind===0&&this.change_kind===0">-->
<!--             <div>-->
<!--              <img src="../zbh/img/name.png" style="position:absolute;width: 24px;height: 24px;left: 0px">-->
<!--               <div style="position: absolute;left: 20px;width: 50px">姓名</div>-->
<!--             </div>-->
<!--            </div>-->
            <div v-if="this.which_list==='1'&&this.add_kind===0&&this.change_kind===0" >
            <div style="width: 71.5vw;margin-left: 4vw;margin-top: 3vh;" v-for="(item,i) in this.res_admin_list" :key="item.uuid" >
                <el-card style="height: 8vh;background-color:#F5F6FA;box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);" shadow="hover">
                    <div style="position:absolute;left: 100px">
                        <i class="el-icon-user" style="font-family:Heiti-lighter;font-size: medium">&nbsp;姓名:{{item.name}}</i>
                    </div>
                    <div style="position: absolute;left: 350px">
                        <i class="el-icon-phone-outline" style="font-size: medium">&nbsp;电话:{{item.phone}}</i>
                    </div>
                    <div style="position: absolute;left: 600px">
                        <i class="el-icon-location-outline" style="font-size: medium">&nbsp;岗位:{{item.job}}</i>
                    </div>
                    <div class="deteicon">
                        <i class="el-icon-delete" style="float: right;font-size: large;cursor: pointer" @click="delet(item.uuid,0)"></i>
                    </div>
                    <div>
                        <el-button style="float: right;margin-right: 2vw;margin-top: -1.5vh;background-color: #3FB89C;color: white" class="editmess" @click="change_person(1,i)">编辑信息</el-button>
                    </div>
                </el-card>
            </div>
            </div>
            <div v-if="this.which_list==='2'&&this.add_kind===0&&this.change_kind===0" s>
                <div style="width: 71.5vw;margin-left: 4vw;margin-top: 3vh;" v-for="(item,i) in this.res_worker_list" :key="item.uuid" >
                    <el-card style="height: 8vh;background-color:#F5F6FA;box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);" shadow="hover">
                        <div style="position: absolute;left: 120px">
                            <i class="el-icon-user" style="font-size: medium">&nbsp;姓名:{{item.name}}</i>
                        </div>
                        <div style="position: absolute;left: 260px">
                            <i class="el-icon-phone-outline" style="font-size: medium">&nbsp;电话:{{item.phone}}</i>
                        </div>
                        <div style="position: absolute;left: 460px">
                            <i class="el-icon-location-outline" style="font-size: medium">&nbsp;岗位:{{item.job}}</i>
                        </div>
                        <div style="position: absolute;left: 660px">
                            <i class="el-icon-setting" style="font-size: medium;color: #6DC56F" v-if="item.work_type===1||item.work_type==='水'">&nbsp;维修类型:水</i>
                            <i class="el-icon-setting" style="font-size: medium;color: #F3B588" v-if="item.work_type===2||item.work_type==='电'">&nbsp;维修类型:电</i>
                            <i class="el-icon-setting" style="font-size: medium;color: #F77D52" v-if="item.work_type===3||item.work_type===0||item.work_type==='机械'">&nbsp;维修类型:机械</i>
                        </div>
                        <div v-if="item.work_type!=='机械'&&item.work_type!==0&&item.work_type!==3" style="position: absolute;left: 860px">
                            <i class="el-icon-success" style="font-size: medium;color: #3FB89C" v-if="item.working_status===0">&nbsp;空闲</i>
                            <i class="el-icon-warning" style="font-size: medium;color: red" v-if="item.working_status===1">&nbsp;繁忙</i>
                        </div>
                        <div v-else style="position: absolute;left: 860px">
                            <i class="el-icon-success" style="font-size: medium;color: #3FB89C" v-if="item.working_status===0">&nbsp;空闲</i>
                            <i class="el-icon-warning" style="font-size: medium;color: red" v-if="item.working_status===1">&nbsp;繁忙</i>
                        </div>
                        <div class="deteicon">
                            <i class="el-icon-delete" style="float: right;font-size: large;cursor: pointer" @click="delet(item.uuid,1)"></i>
                        </div>
                        <div>
                            <el-button style="float: right;margin-right: 2vw;margin-top: -1.5vh;background-color: #3FB89C;color: white" @click="change_person(2,i)">编辑信息</el-button>
                        </div>
                    </el-card>
                </div>
            </div>
            <el-card v-if="this.add_kind===1" style="width: 50vw;margin-left: 14vw;height: 52vh;margin-top: 5vh;background: linear-gradient(to bottom, #3FB89C 0%,#3FB89C 2%,white 3%,white 100%);">
                <div style="font-size: larger;margin-top: 2vh;float: left"><b>新增管理人员</b></div>
                <i class="el-icon-close" style="font-size: larger;margin-top: 2vh;float: right;cursor: pointer" @click="close_add"></i><div style="clear: both"></div>
                <i class="el-icon-s-custom" style="float: left;font-size: larger;margin-top: 2vh">&nbsp;用户名</i>
                <i class="el-icon-phone-outline" style="float: left;font-size: larger;margin-top: 2vh;margin-left: 18.5vw">&nbsp;密码</i><div style="clear: both"></div>
                <el-input v-model="add_admain.zhanghao" placeholder="请输入用户名" style="width: 10vw;float: left;margin-top: 1vh"></el-input>
                <el-input v-model="add_admain.mima" placeholder="请输入密码" style="width: 10vw;float: left;margin-top: 1vh;margin-left: 14vw"></el-input><div style="clear: both"></div>
                <i class="el-icon-user" style="float: left;font-size: larger;margin-top: 2vh">&nbsp;姓名</i>
                <i class="el-icon-phone-outline" style="float: left;font-size: larger;margin-top: 2vh;margin-left: 20vw">&nbsp;电话</i><div style="clear: both"></div>
                <el-input v-model="add_admain.name" placeholder="请输入姓名" style="width: 10vw;float: left;margin-top: 1vh"></el-input>
                <el-input v-model="add_admain.phone" placeholder="请输入电话" style="width: 10vw;float: left;margin-top: 1vh;margin-left: 14vw"></el-input><div style="clear: both"></div>
                <i class="el-icon-location-outline" style="float: left;font-size: larger;margin-top: 2vh;">&nbsp;岗位</i><div style="clear: both"></div>
                <el-input v-model="add_admain.position" placeholder="请输入岗位" style="width: 10vw;float: left;margin-top: 1vh"></el-input><div style="clear: both"></div>
                <div>
                    <el-button style="background-color: #3FB89C;color: white;margin-top: 2vh" @click="add_admain_confirm">确认添加</el-button>
                </div>
            </el-card>
            <el-card v-if="this.change_kind===1" style="width: 50vw;margin-left: 14vw;height: 52vh;margin-top: 5vh;background: linear-gradient(to bottom, #3FB89C 0%,#3FB89C 2%,white 3%,white 100%);" class="elcalss">
                <div style="font-size: larger;margin-top: 2vh;float: left"><b>更新管理人员信息</b></div>
                <i class="el-icon-close" style="font-size: larger;margin-top: 2vh;float: right;cursor: pointer" @click="close_change"></i><div style="clear: both"></div>
                <i class="el-icon-s-custom" style="float: left;font-size: larger;margin-top: 2vh">&nbsp;用户名</i>
                <i class="el-icon-phone-outline" style="float: left;font-size: larger;margin-top: 2vh;margin-left: 18.5vw">&nbsp;密码</i><div style="clear: both"></div>
                <el-input v-model="change_admain.account_number" placeholder="请输入用户名" style="width: 10vw;float: left;margin-top: 1vh"></el-input>
                <el-input v-model="change_admain.password" placeholder="请输入密码" style="width: 10vw;float: left;margin-top: 1vh;margin-left: 14vw"></el-input><div style="clear: both"></div>
                <i class="el-icon-user" style="float: left;font-size: larger;margin-top: 2vh">&nbsp;姓名</i>
                <i class="el-icon-phone-outline" style="float: left;font-size: larger;margin-top: 2vh;margin-left: 20vw">&nbsp;电话</i><div style="clear: both"></div>
                <el-input v-model="change_admain.name" placeholder="请输入姓名" style="width: 10vw;float: left;margin-top: 1vh"></el-input>
                <el-input v-model="change_admain.phone" placeholder="请输入电话" style="width: 10vw;float: left;margin-top: 1vh;margin-left: 14vw"></el-input><div style="clear: both"></div>
                <i class="el-icon-location-outline" style="float: left;font-size: larger;margin-top: 2vh;">&nbsp;岗位</i><div style="clear: both"></div>
                <el-input v-model="change_admain.job" placeholder="请输入岗位" style="width: 10vw;float: left;margin-top: 1vh"></el-input><div style="clear: both"></div>
                <div>
                    <el-button style="background-color: #3FB89C;color: white;margin-top: 2vh" @click="change_admain_confirm">确认修改</el-button>
                </div>
            </el-card>
            <el-card v-if="this.add_kind===2" style="width: 50vw;margin-left: 14vw;height: 52vh;margin-top: 5vh;background: linear-gradient(to bottom, #3FB89C 0%,#3FB89C 2%,white 3%,white 100%);">
                <div style="font-size: larger;margin-top: 2vh;float: left"><b>新增维修人员</b></div>
                <i class="el-icon-close" style="font-size: larger;margin-top: 2vh;float: right;cursor: pointer" @click="close_add"></i><div style="clear: both"></div>
                <i class="el-icon-s-custom" style="float: left;font-size: larger;margin-top: 2vh">&nbsp;用户名</i>
                <i class="el-icon-phone-outline" style="float: left;font-size: larger;margin-top: 2vh;margin-left: 18.5vw">&nbsp;密码</i><div style="clear: both"></div>
                <el-input v-model="add_filter.zhanghao" placeholder="请输入用户名" style="width: 10vw;float: left;margin-top: 1vh"></el-input>
                <el-input v-model="add_filter.mima" placeholder="请输入密码" style="width: 10vw;float: left;margin-top: 1vh;margin-left: 14vw"></el-input><div style="clear: both"></div>
                <i class="el-icon-user" style="float: left;font-size: larger;margin-top: 2vh">&nbsp;姓名</i>
                <i class="el-icon-phone-outline" style="float: left;font-size: larger;margin-top: 2vh;margin-left: 20vw">&nbsp;电话</i><div style="clear: both"></div>
                <el-input v-model="add_filter.name" placeholder="请输入姓名" style="width: 10vw;float: left;margin-top: 1vh"></el-input>
                <el-input v-model="add_filter.phone" placeholder="请输入电话" style="width: 10vw;float: left;margin-top: 1vh;margin-left: 14vw"></el-input><div style="clear: both"></div>
                <i class="el-icon-location-outline" style="float: left;font-size: larger;margin-top: 2vh;">&nbsp;岗位</i>
                <i class="el-icon-s-tools" style="float: left;font-size: larger;margin-top: 2vh;margin-left: 20vw">&nbsp;维修类型</i><div style="clear: both"></div>
                <el-input v-model="add_filter.position" placeholder="请输入岗位" style="width: 10vw;float: left;margin-top: 1vh"></el-input>
                <el-input v-model="add_filter.filter_type" placeholder="请输入维修类型" style="width: 10vw;float: left;margin-top: 1vh;margin-left: 14vw"></el-input><div style="clear: both"></div>
                <div>
                    <el-button style="background-color: #3FB89C;color: white;margin-top: 3vh" @click="add_filter_confirm">确认添加</el-button>
                </div>
            </el-card>
            <el-card v-if="this.change_kind===2" style="width: 50vw;margin-left: 14vw;height: 52vh;margin-top: 5vh;background: linear-gradient(to bottom, #3FB89C 0%,#3FB89C 2%,white 3%,white 100%);">
                <div style="font-size: larger;margin-top: 2vh;float: left"><b>更新维修人员</b></div>
                <i class="el-icon-close" style="font-size: larger;margin-top: 2vh;float: right;cursor: pointer" @click="close_change"></i><div style="clear: both"></div>
                <i class="el-icon-s-custom" style="float: left;font-size: larger;margin-top: 2vh">&nbsp;用户名</i>
                <i class="el-icon-phone-outline" style="float: left;font-size: larger;margin-top: 2vh;margin-left: 18.5vw">&nbsp;密码</i><div style="clear: both"></div>
                <el-input v-model="change_filter.account_number" placeholder="请输入用户名" style="width: 10vw;float: left;margin-top: 1vh"></el-input>
                <el-input v-model="change_filter.password" placeholder="请输入密码" style="width: 10vw;float: left;margin-top: 1vh;margin-left: 14vw"></el-input><div style="clear: both"></div>
                <i class="el-icon-user" style="float: left;font-size: larger;margin-top: 2vh">&nbsp;姓名</i>
                <i class="el-icon-phone-outline" style="float: left;font-size: larger;margin-top: 2vh;margin-left: 20vw">&nbsp;电话</i><div style="clear: both"></div>
                <el-input v-model="change_filter.name" placeholder="请输入姓名" style="width: 10vw;float: left;margin-top: 1vh"></el-input>
                <el-input v-model="change_filter.phone" placeholder="请输入电话" style="width: 10vw;float: left;margin-top: 1vh;margin-left: 14vw"></el-input><div style="clear: both"></div>
                <i class="el-icon-location-outline" style="float: left;font-size: larger;margin-top: 2vh;">&nbsp;岗位</i>
                <i class="el-icon-s-tools" style="float: left;font-size: larger;margin-top: 2vh;margin-left: 20vw">&nbsp;维修类型</i><div style="clear: both"></div>
                <el-input v-model="change_filter.job" placeholder="请输入岗位" style="width: 10vw;float: left;margin-top: 1vh"></el-input>
                <el-input v-model="change_filter.work_type" placeholder="请输入维修类型" style="width: 10vw;float: left;margin-top: 1vh;margin-left: 14vw"></el-input><div style="clear: both"></div>
                <div>
                    <el-button style="background-color: #3FB89C;color: white;margin-top: 3vh" @click="change_filter_confirm">确认修改</el-button>
                </div>
            </el-card>
        </el-card>
    </div>
</div>
</template>

<script>
import sidebar from "@/zbh/sidebar.vue";
import topbar from "@/zbh/topbar.vue";
export default {
    name: "client_list",
    components:{sidebar,topbar},
    data(){
        return{
            which:1,
            add_admain:{
                name:'',
                phone:'',
                zhanghao:'',
                mima:'',
                position:''
            },
            add_filter:{
                name:'',
                phone:'',
                zhanghao:'',
                mima:'',
                position:'',
                filter_type:'',
            },
            change_admain:{
            },
            change_filter:{
            },
            which_list:"1",
            which_change:0,
            admain_num:30,
            filter_num:50,
            add_kind:0,
            change_kind:0,
            admain_list:[
                {
                    name:"张博皓",
                    phone:"1234567890",
                    position:"大厦管理员"
                },

            ],
            filter_list:[
                {
                    name:"张博皓",
                    phone:"1234567890",
                    position:"大厦维修工",
                    kind:"水",
                    if_free:"1",
                },
                {
                    name:"张博皓",
                    phone:"1234567891",
                    position:"大厦维修工",
                    kind:"电",
                    if_free: "0"
                },
                {
                    name:"张博皓",
                    phone:"1234567892",
                    position:"大厦维修工",
                    kind:"机械",
                    if_free: "0"
                },

            ],
            res_admin_list:[
            ],
            res_worker_list:[
            ],
            adman:{
                account_number:'',
                password:'',
                name:'',
                job:'',
                phone:'',
                uuid:'',
            },
            adwork:{
                account_number:'',
                password:'',
                name:'',
                job:'',
                phone:'',
                uuid:'',
                working_status:0,
                work_type:0,
            },
        }
    },
    methods:{
        change_status(){
            if(this.which_list===1){
                this.which_list=2;
            }
            else{
                this.which_list=1;
            }
        },
        add_person(kind){
            this.add_kind=kind
        },
        change_person(kind,num){
            console.log("编辑信息"+kind+" "+num);
            this.change_kind=kind
            this.which_change=num
            if(kind===1){
                this.change_admain = this.res_admin_list[num];
            }
            else if(kind===2){
                // this.change_filter.account_number = this.res_worker_list[num].account_number;
                // this.change_filter.password = this.res_worker_list[num].password;
                // this.change_filter.name = this.res_worker_list[num].name;
                // this.change_filter.phone = this.res_worker_list[num].phone;
                // this.change_filter.job = this.res_worker_list[num].job;
                // this.change_filter.work_type = this.res_worker_list[num].work_type;
                this.change_filter = this.res_worker_list[num];
            }
            // console.log(this.change_admain)
            console.log("修改信息")
            if(this.change_filter.work_type===1){
                this.change_filter.work_type="水"
            }
            else if(this.change_filter.work_type===2){
                this.change_filter.work_type="电"
            }
            else if(this.change_filter.work_type===3){
                this.change_filter.work_type="机械"
            }
            console.log(this.change_filter)
            console.log(this.res_worker_list[num])
        },
        add_admain_confirm(){
            console.log(this.add_admain);
            this.$axios.post('/staff/admin',
            {
                account_number:this.add_admain.zhanghao,
                password:this.add_admain.mima,
                name:this.add_admain.name,
                job:this.add_admain.position,
                phone:this.add_admain.phone,
                uuid:'',
            }).then((res)=>{
                console.log(res.data);
                if(res.data.msg==="新建成功"){
                    this.$message({
                        message: '新建管理人员成功',
                        type: 'success'
                    });
                }
            })
            this.adman.account_number = this.add_admain.zhanghao
            this.adman.password = this.add_admain.mima
            this.adman.name = this.add_admain.name
            this.adman.job = this.add_admain.position
            this.adman.phone = this.add_admain.phone
            this.adman.uuid = ""
            this.res_admin_list.push(this.adman)
            this.add_kind = 0;
        },
        change_admain_confirm(){
            console.log("信息修改");
            console.log(this.change_admain)
            this.$axios.post('/staff/admin',
                {
                    account_number:this.change_admain.account_number,
                    password:this.change_admain.password,
                    name:this.change_admain.name,
                    job:this.change_admain.job,
                    phone:this.change_admain.phone,
                    uuid:this.change_admain.uuid,
                }).then((res)=>{
                console.log(res.data);
                if(res.data.msg==="更新成功"){
                    this.$message({
                        message: '更新管理人员成功',
                        type: 'success'
                    });
                }
            })
            this.change_kind = 0;
        },
        add_filter_confirm(){
          console.log(this.add_filter);
            var type;
            if(this.add_filter.filter_type==='水') {
                type = 1;
            }
            else if(this.add_filter.filter_type==='电'){
                type=2;
            }
            else{
                type=3;
            }
            console.log("类型"+type);
            this.$axios.post('/staff/worker',
                {
                    account_number:this.add_filter.zhanghao,
                    password:this.add_filter.mima,
                    name:this.add_filter.name,
                    job:this.add_filter.position,
                    phone:this.add_filter.phone,
                    working_status:0,
                    work_type:type,
                    uuid:'',
                }).then((res)=>{
                console.log(res.data);
                if(res.data.msg==="新建成功"){
                    this.$message({
                        message: '新建维修人员成功',
                        type: 'success'
                    });
                }
            })
            this.adwork.account_number = this.add_filter.zhanghao
            this.adwork.password = this.add_filter.mima
            this.adwork.name = this.add_filter.name
            this.adwork.job = this.add_filter.position
            this.adwork.phone = this.add_filter.phone
            this.adwork.working_status = 0
            this.adwork.work_type = type
            this.res_worker_list.push(this.adwork)
            this.add_kind = 0;
        },
        change_filter_confirm(){
            var type;
            if(this.change_filter.work_type==='水') {
                type = 1;
            }
            else if(this.change_filter.work_type==='电'){
                type=2;
            }
            else{
                type=3;
            }
            console.log("类型"+type);
            this.$axios.post('/staff/worker',
                {
                    account_number:this.change_filter.account_number,
                    password:this.change_filter.password,
                    name:this.change_filter.name,
                    job:this.change_filter.job,
                    phone:this.change_filter.phone,
                    working_status:0,
                    work_type:type,
                    uuid:this.change_filter.uuid,
                }).then((res)=>{
                console.log(res.data);
                if(res.data.msg==="更新成功"){
                    this.$message({
                        message: '更新维修人员成功',
                        type: 'success'
                    });
                }
            })
            this.change_kind = 0;
        },
        close_add(){
            this.add_kind=0;
        },
        close_change(){
            this.change_kind=0;
        },
        delet(uid,kind){
            this.$axios(
                {
                    method:'POST',
                    url:'/staff/delete',
                    params:{
                        id:uid,
                        type:kind
                    }
                }
            ).then(
                (res)=>{
                    console.log(res.data)
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }
            )
            window.location.reload();

        },
    },

    created() {
        this.$axios(
            {
                method:'GET',
                url:'/staff/list',
                params:{
                    page:1,
                    page_size:40,
                    type:0
                }
            }
        ).then((res)=>{
            // console.log(res.data.data);
            this.res_admin_list = res.data.data;
            console.log(this.res_admin_list);
        })
        this.$axios(
            {
                method:'GET',
                url:'/staff/list',
                params:{
                    page:1,
                    page_size:40,
                    type:1
                }
            }
        ).then((res)=>{
            // console.log(res.data.data);
            this.res_worker_list = res.data.data;
            console.log(this.res_worker_list);
        })
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
    background-position:50px 2000px
}
.top-chose{
  position: absolute;
  top:38px;
  left: 120px;
}
.client{
  width: 30px;
  height: 34px;
}
.client-title{
  position: absolute;
  margin-top:40px ;
  margin-left: 80px;
}
.editmess:hover{
  float: right;
  margin-right: 2vw;
  margin-top: -1.5vh;
  background-color: #3FB89C;
  color: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.deteicon:hover{
  color: #F77D52;
}
</style>
<style>
.el-tabs__nav-wrap{
  width: 280px;
}
.el-tabs__nav-scroll{
  padding-left: 20px;
}
.el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top:nth-child(2){
  font-family: Heiti-lighter;
  font-size: 16px;
}
.el-tabs--bottom .el-tabs__item.is-bottom:last-child, .el-tabs--bottom .el-tabs__item.is-top:last-child, .el-tabs--top .el-tabs__item.is-bottom:last-child, .el-tabs--top .el-tabs__item.is-top:last-child{
  font-family: Heiti-lighter;
  font-size: 16px;
}
.elcalss {

}
</style>
