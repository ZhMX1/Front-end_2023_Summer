<template>
<div>
      <el-card  v-if="this.if_view===1" style="width: 38vw;margin-left: 14vw;height: 40vh;margin-top: 5vh;background: linear-gradient(to bottom, #3FB89C 0%,#3FB89C 5%,white 6%,white 100%);">
          <div style="font-size: larger;margin-top: 2vh;float: left"><b>添加公司</b></div>
          <i class="el-icon-close" style="font-size: larger;margin-top: 2vh;float: right;cursor: pointer" @click="close_add"></i><div style="clear: both"></div>
          <i class="el-icon-s-custom" style="float: left;font-size: larger;margin-top: 2vh">&nbsp;法人名称</i>
          <i class="el-icon-school" style="float: left;font-size: larger;margin-top: 2vh;margin-left: 18.5vw">&nbsp;公司名称</i><div style="clear: both"></div>
          <el-input v-model="add_company.faren_name" placeholder="请输入法人名称" style="width: 10vw;float: left;margin-top: 1vh"></el-input>
          <el-input v-model="add_company.gongsi_name" placeholder="请输入公司名称" style="width: 10vw;float: left;margin-top: 1vh;margin-left: 14vw"></el-input><div style="clear: both"></div>
          <i class="el-icon-user" style="float: left;font-size: larger;margin-top: 2vh">&nbsp;联系人姓名</i>
          <i class="el-icon-phone-outline" style="float: left;font-size: larger;margin-top: 2vh;margin-left: 17vw">&nbsp;联系电话</i><div style="clear: both"></div>
          <el-input v-model="add_company.lianxi_name" placeholder="请输入联系人姓名" style="width: 10vw;float: left;margin-top: 1vh"></el-input>
          <el-input v-model="add_company.lianxi_phone" placeholder="请输入联系电话" style="width: 10vw;float: left;margin-top: 1vh;margin-left: 14vw"></el-input><div style="clear: both"></div>
          <div>
              <el-button style="background-color: #3FB89C;color: white;margin-top: 3vh" @click="add_company_confirm">确认添加</el-button>
          </div>
      </el-card>
</div>
</template>

<script>


export default {
    name: "AddCompany",
    data(){
        return{
            add_company:{
                faren_name:'',
                gongsi_name:'',
                lianxi_name:'',
                lianxi_phone:'',
            },
            if_view:1
        }
    },
    methods:{
        close_add(){
            this.if_view=0;
        },
        add_company_confirm(){
            console.log(this.add_company)
            this.$axios.post('/company',
                {
                uuid:"",
                legal_person:this.add_company.faren_name,
                name:this.add_company.gongsi_name,
                contact_person:this.add_company.lianxi_name,
                contact_phone:this.add_company.lianxi_phone,
                    account_number:'',
                    password:'',
            }).then((response) => {
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
            // this.if_view=0;
        },

    }
}
</script>

<style scoped>

</style>
