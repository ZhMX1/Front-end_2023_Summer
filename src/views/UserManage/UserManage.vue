<template>
  <div class="userManage">
    <topbar></topbar>
    <sidebar style="position: absolute;top:-4vh" :which="1"></sidebar>
    <div class="userList">
      <div class="userTop">
        <div class="userManageTitle">
          <i class="el-icon-userTitle" />
          大厦客户列表
        </div>
        <div class="input_box" style="position:relative; float: left; margin-left: 7vw">
          <el-input  v-model="search_input" placeholder="请输入搜索内容" style="width: 20vw" @keyup.enter.native="searchEnterFun">
            <template slot="suffix">
              <el-button @click="searchCompany" class="searchBtn">
                <i class="el-icon-search"></i>
              </el-button>
            </template>
          </el-input>
        </div>
        <el-button class="userAddBtn" @click="if_view = true">
          <i class="el-icon-devops" />
          增加客户
        </el-button>
      </div>
      <div class="userListTable">
        <div class="userItem" v-for="(item, index) in userLists" :key="index">
          <el-row>
            <el-col :span="1">
              <div>&ensp;</div>
            </el-col>
            <el-col :span="4">
              <div class="userinfos"><img src="../../assets/UserManage/usernameIcon.png" style="width:7%"/>
                &ensp;法人名称： {{ item.legal_person}}</div>
            </el-col>
            <el-col :span="6">
              <div class="userinfos"><img src="../../assets/UserManage/companyNameIcon.png" style="width:6%"/>
                &ensp;公司名称： {{ item.name}}</div>
            </el-col>
            <el-col :span="5">
              <div class="userinfos"><img src="../../assets/UserManage/contactNameIcon.png" style="width:8%"/>
                &ensp;联系人姓名： {{ item.contact_person}}</div>
            </el-col>
            <el-col :span="6">
              <div class="userinfos"><img src="../../assets/UserManage/teleNameIcon.png" style="width:5%"/>
                &ensp;电话号码： {{ item.contact_phone}}</div>
            </el-col>
            <el-col :span="1">
              <div style="cursor: pointer" @click="toUserDetail(item)" class="detailBtn">
                <i class="el-icon-more-outline" style="font-size:15px; font-family: 'Heiti-lighter';font-style: normal;font-weight: 500;padding-right: 9px"></i></div>
            </el-col>
            <el-col :span="1">
              <div style="cursor: pointer" @click="deleteConfirm(item)" class="deleteBtn"><i class="el-icon-delete" style="font-size:20px"></i></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <el-dialog class="userDialog" title="" :visible.sync="if_view" width="40%">
      <div class="order-detail-allot-allocate-dialog-title">
        新增公司
      </div>
      <el-form style="margin-top: 5vh">
        <i class="el-icon-s-custom" style="float: left;font-size: larger;margin-top: 2vh">&nbsp;法人名称</i>
        <i class="el-icon-school" style="float: left;font-size: larger;margin-top: 2vh;margin-left: 18.5vw">&nbsp;公司名称</i><div style="clear: both"></div>
        <el-input v-model="add_company.faren_name" prop="name" placeholder="请输入法人名称" style="width: 10vw;float: left;margin-top: 1vh"></el-input>
        <el-input v-model="add_company.gongsi_name" prop="companyName" placeholder="请输入公司名称" :rules="rules" ref="ruleForm"
                  style="width: 10vw;float: left;margin-top: 1vh;margin-left: 14vw"></el-input><div style="clear: both"></div>
        <i class="el-icon-user" style="float: left;font-size: larger;margin-top: 2vh">&nbsp;联系人姓名</i>
        <i class="el-icon-phone-outline" style="float: left;font-size: larger;margin-top: 2vh;margin-left: 17vw">&nbsp;联系电话</i><div style="clear: both"></div>
        <el-input v-model="add_company.lianxi_name" prop="contactName" placeholder="请输入联系人姓名" style="width: 10vw;float: left;margin-top: 1vh"></el-input>
        <el-input v-model="add_company.lianxi_phone" prop="phone" placeholder="请输入联系电话" style="width: 10vw;float: left;margin-top: 1vh;margin-left: 14vw"></el-input><div style="clear: both"></div>

        <div>
          <el-button style="background-color: #3FB89C;color: white;margin-top: 3vh" @click="add_company_confirm">确认添加</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import sidebar from "@/zbh/sidebar.vue";
import topbar from "@/zbh/topbar.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "userManage",
  components: {topbar, sidebar},
  data(){
    return{
      search_input: '',
      add_company:{
        faren_name:'',
        gongsi_name:'',
        lianxi_name:'',
        lianxi_phone:'',
      },
      if_view: false,
      userLists: [

      ],
      rules: {
        name: '',
        companyName: '',
        contactName: '',
        phone: ''
      },
      ruleForm: {

      }
    }
  },
  mounted() {
    this.updateCompanyList();
  },
  methods: {
    deleteConfirm(item) {
      this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteCompany(item);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    toUserDetail(item) {
      window.localStorage.setItem("tmpCompany",item.uuid);
      this.$router.push('/userdetail')
    },
    close_add(){
      this.if_view = false;
    },
    add_company_confirm(){
      this.addCompany();
      console.log(this.add_company)
      this.if_view = false;
    },
    addCompany() {
      let that = this;
      that.$axios({
        method: 'post',
        url: '/company',
        data: {
          account_number: "",
          contact_person: this.add_company.lianxi_name,
          contact_phone: this.add_company.lianxi_phone,
          legal_person: this.add_company.faren_name,
          name: this.add_company.gongsi_name,
          password: "",
          uuid: ""
        }
      }).then((res) => {
        console.log("创建公司", res.data);
        this.$message.success(res.data.msg);
        this.updateCompanyList();
        this.add_company.faren_name ='';
        this.add_company.gongsi_name = '';
        this.add_company.lianxi_phone = '';
        this.add_company.lianxi_name = '';
      }).catch(error=> {
            console.log("error", error);
          }
      )
    },
    deleteCompany(item) {
      let that = this;
      that.$axios({
        method: 'post',
        url: '/company/delete',
        params: {
          uuid: item.uuid
        }
      }).then((res) => {
        console.log("删除公司");
        this.updateCompanyList();
        if(res.status === 200) {
          this.$message.success(res.data.msg);
        }
      }).catch(error=> {
            console.log("error", error);
          }
      )
    },
    updateCompanyList() {
      let that = this;
      that.$axios({
        method: 'get',
        url: '/company/list'
      }).then((res) => {
        console.log("获取公司列表", res.data);
        this.userLists = res.data.data;
        if (res.data.status === 200) {
          this.$message({
            type: "success",
            message: "获取公司列表成功",
          });
        }
      }).catch(error=> {
            console.log("error", error);
          }
      )
    },
    searchEnterFun:function(e){
      var keyCode = window.event? e.keyCode:e.which;
      //  console.log('回车搜索',keyCode,e);
      if(keyCode == 13){
        this.searchCompany()
      }
    },
    searchCompany() {
      let that = this;
      that.$axios({
        method: 'get',
        url: '/company/search',
        params: {
          keyword: this.search_input
        }
      }).then((res) => {
        console.log("搜索", res.data);
        if (res.data.code === 200) {
          this.userLists = res.data.data
          this.$message({
            type: "success",
            message: "搜索成功",
          });
        }
      }).catch(error=> {
            console.log("error", error);
          }
      )
    }
  }
}

</script>

<style scoped>
.userManage {
  position: absolute;
  background: #F5F5F5;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-image:url('../../assets/bg/Frame 57.svg') ;
  background-size:70% 100%;
  background-position:50px 2000px
}
.userList {
  width: 72vw;
  position: relative;
  margin-left: 16vw;
  margin-top: 1vh;
  height: 71.2vh;
  background: #FFFFFF;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.20);
  border-radius: 10px;
  padding-top: 36px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 76px;
  cursor: default;

}
.userTop {
  width: 100%;
  height: 45px;
  /*background-color: aliceblue;*/
}
.userManageTitle {
  margin-left: 0;
  float: left;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;

  color: #202020;
}

.userAddBtn {
  float: right;
  background: #3FB89C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */
  border: none;
  color: #FFFFFF;
}

.userAddBtn:hover {
  background: #3FB89C;
  color: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
}

.el-icon-devops {
  background: url('../../assets/UserManage/addUser.png') center no-repeat;
  background-size: 12px;
}

.el-icon-devops:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}

.el-icon-userTitle {
  background: url('../../assets/UserManage/title.png') center no-repeat;
  background-size: 16px;
}
.el-icon-userTitle:before {
  content: "\8d3a";
  font-size: 16px;
  visibility: hidden;
}

.el-icon-userName {
  background: url('../../assets/UserManage/usernameIcon.png') center no-repeat;
  color: #000000;
  background-size: 20px;
  font-size: 17px;
}
.el-icon-userName:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}

.el-icon-contactName {
  background: url('../../assets/UserManage/contactNameIcon.png') center no-repeat;
  color: #000000;
  background-size: 12px
}
.el-icon-contactName:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-teleNum {
  background: url('../../assets/UserManage/teleNameIcon.png') center no-repeat;
  color: #000000;
  background-size: 12px
}
.el-icon-teleNum:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.userListTable {
  overflow: auto;
  margin-top: 30px;
  height: 69vh;
}
.userItem {
  height: 35px;
  padding-top: 15px;
  background: #F5F6FA;
  /* border-radius: 10px; */
  box-shadow: 0px 4px 4px rgba(149, 146, 146, 0.25);
  border-radius: 3px;
  margin-bottom: 24px;
  cursor: default;
  transition-duration: 0.5s;
}
.userItem:hover{
  -webkit-box-shadow: #ccc 0px 5px 5px;
  -moz-box-shadow: #ccc 0px 5px 5px;
  box-shadow: #ccc 0px 5px 5px;
}


.userinfos {
  display: flex;
  width: 100%;
  text-align: left;
  line-height: 20px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
}

.userinfos i {
  margin-right: 0px;
}

::-webkit-scrollbar
{
  width: 7px;
}
.detailBtn:hover {
  color: cornflowerblue;
}
.deleteBtn:hover {
  color: #e04410;
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
.order-detail-allot-allocate-dialog-title{
  position: absolute;
  height: 40px;
  margin-left: 40%;
  left: 0px;
  top: 35px;

  font-family: 'Heiti-lighter';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 44px;
  /* identical to box height */


  color: #202020;
}
/deep/ .el-input__inner { /*或者 .s2>>>.el-input__inner  */
  //background: rgba(0, 0, 0, 0.2); /*调整inner的背景色，透明*/
  border-radius: 20px; /*输入框圆角值*/
  height: 4vh;
}

.searchBtn {
  background-color: transparent !important;
  height: 24px ;
  vertical-align: center;
}
.input_box .el-button{
  border: none !important;
}

.searchBtn el-button--default {
  border: none !important;
}
:deep(.el-input-group__suffix) {
  position: relative;
  background: transparent;
  border-radius: 95px;
  margin-left: -10vw;
  border: none;
  box-shadow: 0 0 0 0px;
}
.searchBtn[data-v-6e9b00b3] {
  border: none !important;
}
.searchBtn {
  padding-top: 15%!important;
}
</style>

<style>
.userDialog .el-dialog__header{
  padding:0.5px 1px 10px !important;
  background-color: #42b983 !important;
}

.input_box .el-button {
  border: none !important;
}

</style>
