<template>
  <div class="userDetail">
    <topbar></topbar>
    <sidebar style="position: absolute;top:-4vh" :which="1"></sidebar>
    <div class="userDetails">
      <div class="userCard1">
        <div class="details">
          <div class="userDetailTitle">
            <i class="el-icon-companyInfo" />
            公司信息详情
          </div>
          <el-button class="back2user" type="primary" @click="toUserList">
            <i class="el-icon-back" />
            返回客户列表
          </el-button>
        </div>
        <el-descriptions class="margin-top" :column="4" :size="size">
          <el-descriptions-item label="法人名称" style="height:30px">
            <div v-show="!edit">{{companyInfo.legal_person}}</div>
            <el-input v-model="companyInfo.legal_person" v-show="edit" class="editInput"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="公司名称">
            <div v-show="!edit">{{companyInfo.name}}</div>
            <el-input v-model="companyInfo.name" v-show="edit" class="editInput"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="联系人姓名">
            <div v-show="!edit">{{companyInfo.contact_person}}</div>
            <el-input v-model="companyInfo.contact_person" v-show="edit" class="editInput"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="电话号码">
            <div v-show="!edit">{{companyInfo.contact_phone}}</div>
            <el-input v-model="companyInfo.contact_phone" v-show="edit" class="editInput"></el-input>
          </el-descriptions-item>
          <el-descriptions-item label="密码">
            <div v-show="!edit">{{companyInfo.password}}</div>
            <el-input v-model="companyInfo.password" v-show="edit" class="editInput"></el-input>
          </el-descriptions-item>
        </el-descriptions>
        <el-button v-show="!edit" class="editBtn" @click="editCompany">
          <i class="el-icon-edit" />
          修改信息
        </el-button>
        <el-button v-show="edit" class="editBtn" @click="editConfirm">
          <i class="el-icon-check" />
          确认修改
        </el-button>
      </div>
      <div class="userCard2">
        <div class="details">
          <div class="userDetailTitle">
            <i class="el-icon-companyInfo" />
            公司订单详情
          </div>
          <el-button class="back2user" @click="if_view = true">
            <i class="el-icon-addOrder" />
            新增订单
          </el-button>
        </div>

        <div class="orders">
          <div v-if="orderList.length === 0">
            <el-empty :image-size="120" description="暂无订单数据"></el-empty>
          </div>
          <div class="orderItem" v-for="(item, index) in orderList" :key="index">
            <span class="orderInfos"><i class="el-icon-rentRoom"></i>订单号： {{ item.uuid }}</span>
            <span class="orderInfos"><i class="el-icon-rentRoom"></i>租赁房间号： {{ item.rooms.toString() }}</span>
            <span class="orderInfos"><i class="el-icon-rentTime"></i>
              租赁起止时间： {{ item.start_time!=null?item.start_time.substring(0,10): item.start_time }} - {{ item.end_time!=null?item.end_time.substring(0,10):item.end_time }}
            </span>
            <span class="orderInfos">
              <div style="width: 87%; float: left; display: flex"><i class="el-icon-rentTime"></i>
                签约时间： {{ item.signing_time?item.signing_time.substring(0,10):item.signing_time}}
              </div>
            <el-button class="orderDetailBtn" @click="toOrderDetail(item)">
              <i class="el-icon-more-outline" style="padding-right: 6px"></i>
              查看详情
            </el-button>
            <el-button class="deleBtn" @click="deleteConfirm(item)">
              <i class="el-icon-delete" style="padding-right: 0px"></i>
            </el-button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog class="companyDialog" title="" :visible.sync="if_view" width="30%">
      <div class="order-detail-allot-allocate-dialog-title">
        添加订单
      </div>
      <el-form class="orderAdd" ref="form" :model="add_order" label-width="100px" style="padding-left: 10%">
<!--        <el-form-item label="活动名称">-->
<!--          <el-input v-model="form.name"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="租赁房间号">
          <el-col :span="20">
            <span>
              <el-cascader
                  :options="options"
                  :props="props"
                  v-model="rentRoom"
                  @change="change"
                  placeholder="选择租赁房间"
                  :show-all-levels="false"
                  clearable></el-cascader>
            </span>
<!--          <el-input v-model="rentRoom" placeholder="选择租赁房间"></el-input>-->
          </el-col>
        </el-form-item>
        <el-form-item label="租赁开始时间">
          <el-col :span="20">
            <el-date-picker
                v-model="add_order.start_time"
                @change="changeTime1"
                :picker-options="this.pickerStartDate()"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择开始时间"
                style="width: 100%;">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="租赁结束时间">
          <el-col :span="20">
            <el-date-picker
                v-model="add_order.end_time"
                @change="changeTime2"
                :picker-options="this.pickerEndDate()"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择结束时间"
                style="width: 100%;">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="签约时间">
          <el-col :span="20">
            <el-date-picker
                v-model="add_order.signed_time"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择签约时间"
                style="width: 100%;">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button style="background-color: #3FB89C;color: white;margin-top: 3vh" @click="add_order_confirm">立即创建</el-button>
          <el-button @click="if_view = false">取消</el-button>
        </el-form-item>
      </el-form>

<!--      <i class="el-icon-s-custom" style="float:left; font-size: larger;margin-top: 0px; width: 50%">&nbsp;租赁房间号</i>-->
<!--      <i class="el-icon-user" style="float:left; font-size: larger;margin-top: 0vh; width: 50%">&nbsp;签约时间</i>-->
<!--      <el-input v-model="add_order.rooms" placeholder="请输入租赁房间号" style="float:left; width: 11vw;margin-top: 10px"></el-input>-->
<!--      <el-date-picker-->
<!--          v-model="add_order.signed_time"-->
<!--          type="datetime"-->
<!--          placeholder="选择签约时间"-->
<!--          style="margin-top: 10px; float:left; margin-left: 2vw">-->
<!--      </el-date-picker>-->
<!--      <i class="el-icon-school" style="font-size: larger;margin-top: 2vh; width: 100%">&nbsp;租赁起止时间</i><div style="clear: both"></div>-->
<!--      <el-date-picker-->
<!--          v-model="startEndTime"-->
<!--          type="datetimerange"-->
<!--          range-separator="至"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期"-->
<!--          style="margin-top: 10px">-->
<!--      </el-date-picker>-->
<!--      <div>-->
<!--        <el-button style="background-color: #3FB89C;color: white;margin-top: 3vh" @click="add_order_confirm">确认添加</el-button>-->
<!--      </div>-->
    </el-dialog>
  </div>
</template>

<script>
import sidebar from "@/zbh/sidebar.vue";
import topbar from "@/zbh/topbar.vue";
import UserManage from "@/views/UserManage/UserManage.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "userManage",
  components: { topbar, sidebar},
  data(){
    return{
      oneDayMsec: 1 * 24 * 3600 * 1000, //一天的毫秒数
      size: 'medium',
      edit: false,
      rentRoom: [],
      tmpCompany: '',
      dialogTableVisible: false,
      startEndTime: '',
      add_order:{
        start_time:'',
        end_time:'',
        signed_time:'',
        rooms:[],
      },
      times: {
        start: '',
        end: ''
      },
      if_view : false,
      companyInfo: {},
      orderList: [],
      props:{ multiple: true, emitPath: false},
      options: [{
        value: 1,
        label: '一层',
        children: [
          { value: '101', label: '101' },
          { value: '102', label: '102' },
          { value: '103', label: '103' },
          { value: '104', label: '104' },
          { value: '105', label: '105' },
          { value: '106', label: '106' },
          { value: '107', label: '107' },
          { value: '108', label: '108' },
          { value: '109', label: '109' },
          { value: '110', label: '110' },
          { value: '111', label: '111' },
          { value: '112', label: '112' },
          { value: '113', label: '113' },
          { value: '114', label: '114' },
          { value: '115', label: '115' },
          { value: '116', label: '116' },
          { value: '117', label: '117' },
          { value: '118', label: '118' },
          { value: '119', label: '119' },
          { value: '120', label: '120' }
        ]
      }, {
        value: 2,
        label: '二层',
        children: [
          { value: '201', label: '201' },
          { value: '202', label: '202' },
          { value: '203', label: '203' },
          { value: '204', label: '204' },
          { value: '205', label: '205' },
          { value: '206', label: '206' },
          { value: '207', label: '207' },
          { value: '208', label: '208' },
          { value: '209', label: '209' },
          { value: '210', label: '210' },
          { value: '211', label: '211' },
          { value: '212', label: '212' },
          { value: '213', label: '213' },
          { value: '214', label: '214' },
          { value: '215', label: '215' },
          { value: '216', label: '216' },
          { value: '217', label: '217' },
          { value: '218', label: '218' },
          { value: '219', label: '219' },
          { value: '220', label: '220' }
        ]
      }, {
        value: 3,
        label: '三层',
        children: [
          { value: '301', label: '301' },
          { value: '302', label: '302' },
          { value: '303', label: '303' },
          { value: '304', label: '304' },
          { value: '305', label: '305' },
          { value: '306', label: '306' },
          { value: '307', label: '307' },
          { value: '308', label: '308' },
          { value: '309', label: '309' },
          { value: '310', label: '310' },
          { value: '311', label: '311' },
          { value: '312', label: '312' },
          { value: '313', label: '313' },
          { value: '314', label: '314' },
          { value: '315', label: '315' },
          { value: '316', label: '316' },
          { value: '317', label: '317' },
          { value: '318', label: '318' },
          { value: '319', label: '319' },
          { value: '320', label: '320' }
        ]
      }, {
        value: 4,
        label: '四层',
        children: [
          { value: '401', label: '401' },
          { value: '402', label: '402' },
          { value: '403', label: '403' },
          { value: '404', label: '404' },
          { value: '405', label: '405' },
          { value: '406', label: '406' },
          { value: '407', label: '407' },
          { value: '408', label: '408' },
          { value: '409', label: '409' },
          { value: '410', label: '410' },
          { value: '411', label: '411' },
          { value: '412', label: '412' },
          { value: '413', label: '413' },
          { value: '414', label: '414' },
          { value: '415', label: '415' },
          { value: '416', label: '416' },
          { value: '417', label: '417' },
          { value: '418', label: '418' },
          { value: '419', label: '419' },
          { value: '420', label: '420' }
        ]
      }, {
        value: 5,
        label: '五层',
        children: [
          { value: '501', label: '501' },
          { value: '502', label: '502' },
          { value: '503', label: '503' },
          { value: '504', label: '504' },
          { value: '505', label: '505' },
          { value: '506', label: '506' },
          { value: '507', label: '507' },
          { value: '508', label: '508' },
          { value: '509', label: '509' },
          { value: '510', label: '510' },
          { value: '511', label: '511' },
          { value: '512', label: '512' },
          { value: '513', label: '513' },
          { value: '514', label: '514' },
          { value: '515', label: '515' },
          { value: '516', label: '516' },
          { value: '517', label: '517' },
          { value: '518', label: '518' },
          { value: '519', label: '519' },
          { value: '520', label: '520' }
        ]
      }, {
        value: 6,
        label: '六层',
        children: [
          { value: '601', label: '601' },
          { value: '602', label: '602' },
          { value: '603', label: '603' },
          { value: '604', label: '604' },
          { value: '605', label: '605' },
          { value: '606', label: '606' },
          { value: '607', label: '607' },
          { value: '608', label: '608' },
          { value: '609', label: '609' },
          { value: '610', label: '610' },
          { value: '611', label: '611' },
          { value: '612', label: '612' },
          { value: '613', label: '613' },
          { value: '614', label: '614' },
          { value: '615', label: '615' },
          { value: '616', label: '616' },
          { value: '617', label: '617' },
          { value: '618', label: '618' },
          { value: '619', label: '619' },
          { value: '620', label: '620' }
        ]
      }, {
        value: 7,
        label: '七层',
        children: [
          { value: '701', label: '701' },
          { value: '702', label: '702' },
          { value: '703', label: '703' },
          { value: '704', label: '704' },
          { value: '705', label: '705' },
          { value: '706', label: '706' },
          { value: '707', label: '707' },
          { value: '708', label: '708' },
          { value: '709', label: '709' },
          { value: '710', label: '710' },
          { value: '711', label: '711' },
          { value: '712', label: '712' },
          { value: '713', label: '713' },
          { value: '714', label: '714' },
          { value: '715', label: '715' },
          { value: '716', label: '716' },
          { value: '717', label: '717' },
          { value: '718', label: '718' },
          { value: '719', label: '719' },
          { value: '720', label: '720' }
        ]
      }, {
        value: 8,
        label: '八层',
        children: [
          { value: '801', label: '801' },
          { value: '802', label: '802' },
          { value: '803', label: '803' },
          { value: '804', label: '804' },
          { value: '805', label: '805' },
          { value: '806', label: '806' },
          { value: '807', label: '807' },
          { value: '808', label: '808' },
          { value: '809', label: '809' },
          { value: '810', label: '810' },
          { value: '811', label: '811' },
          { value: '812', label: '812' },
          { value: '813', label: '813' },
          { value: '814', label: '814' },
          { value: '815', label: '815' },
          { value: '816', label: '816' },
          { value: '817', label: '817' },
          { value: '818', label: '818' },
          { value: '819', label: '819' },
          { value: '820', label: '820' }
        ]
      }, {
        value: 9,
        label: '九层',
        children: [
          { value: '901', label: '901' },
          { value: '902', label: '902' },
          { value: '903', label: '903' },
          { value: '904', label: '904' },
          { value: '905', label: '905' },
          { value: '906', label: '906' },
          { value: '907', label: '907' },
          { value: '908', label: '908' },
          { value: '909', label: '909' },
          { value: '910', label: '910' },
          { value: '911', label: '911' },
          { value: '912', label: '912' },
          { value: '913', label: '913' },
          { value: '914', label: '914' },
          { value: '915', label: '915' },
          { value: '916', label: '916' },
          { value: '917', label: '917' },
          { value: '918', label: '918' },
          { value: '919', label: '919' },
          { value: '920', label: '920' }
        ]
      }, {
        value: 10,
        label: '十层',
        children: [
          { value: '1001', label: '401' },
          { value: '1002', label: '1002' },
          { value: '1003', label: '1003' },
          { value: '1004', label: '1004' },
          { value: '1005', label: '1005' },
          { value: '1006', label: '1006' },
          { value: '1007', label: '1007' },
          { value: '1008', label: '1008' },
          { value: '1009', label: '1009' },
          { value: '1010', label: '1010' },
          { value: '1011', label: '1011' },
          { value: '1012', label: '1012' },
          { value: '1013', label: '1013' },
          { value: '1014', label: '1014' },
          { value: '1015', label: '1015' },
          { value: '1016', label: '1016' },
          { value: '1017', label: '1017' },
          { value: '1018', label: '1018' },
          { value: '1019', label: '1019' },
          { value: '1020', label: '1020' }
        ]
      }, {
        value: 11,
        label: '十一层',
        children: [
          { value: '1101', label: '1101' },
          { value: '1102', label: '1102' },
          { value: '1103', label: '1103' },
          { value: '1104', label: '1104' },
          { value: '1105', label: '1105' },
          { value: '1106', label: '1106' },
          { value: '1107', label: '1107' },
          { value: '1108', label: '1108' },
          { value: '1109', label: '1109' },
          { value: '1110', label: '1110' },
          { value: '1111', label: '1111' },
          { value: '1112', label: '1112' },
          { value: '1113', label: '1113' },
          { value: '1114', label: '1114' },
          { value: '1115', label: '1115' },
          { value: '1116', label: '1116' },
          { value: '1117', label: '1117' },
          { value: '1118', label: '1118' },
          { value: '1119', label: '1119' },
          { value: '1120', label: '1120' }
        ]
      }, {
        value: 12,
        label: '十二层',
        children: [
          { value: '1201', label: '1201' },
          { value: '1202', label: '1202' },
          { value: '1203', label: '1203' },
          { value: '1204', label: '1204' },
          { value: '1205', label: '1205' },
          { value: '1206', label: '1206' },
          { value: '1207', label: '1207' },
          { value: '1208', label: '1208' },
          { value: '1209', label: '1209' },
          { value: '1210', label: '1210' },
          { value: '1211', label: '1211' },
          { value: '1212', label: '1212' },
          { value: '1213', label: '1213' },
          { value: '1214', label: '1214' },
          { value: '1215', label: '1215' },
          { value: '1216', label: '1216' },
          { value: '1217', label: '1217' },
          { value: '1218', label: '1218' },
          { value: '1219', label: '1219' },
          { value: '1220', label: '1220' }
        ]
      }, {
        value: 13,
        label: '十三层',
        children: [
          { value: '1301', label: '1301' },
          { value: '1302', label: '1302' },
          { value: '1303', label: '1303' },
          { value: '1304', label: '1304' },
          { value: '1305', label: '1305' },
          { value: '1306', label: '1306' },
          { value: '1307', label: '1307' },
          { value: '1308', label: '1308' },
          { value: '1309', label: '1309' },
          { value: '1310', label: '1310' },
          { value: '1311', label: '1311' },
          { value: '1312', label: '1312' },
          { value: '1313', label: '1313' },
          { value: '1314', label: '1314' },
          { value: '1315', label: '1315' },
          { value: '1316', label: '1316' },
          { value: '1317', label: '1317' },
          { value: '1318', label: '1318' },
          { value: '1319', label: '1319' },
          { value: '1320', label: '1320' }
        ]
      }, {
        value: 14,
        label: '十四层',
        children: [
          { value: '1401', label: '1401' },
          { value: '1402', label: '1402' },
          { value: '1403', label: '1403' },
          { value: '1404', label: '1404' },
          { value: '1405', label: '1405' },
          { value: '1406', label: '1406' },
          { value: '1407', label: '1407' },
          { value: '1408', label: '1408' },
          { value: '1409', label: '1409' },
          { value: '1410', label: '1410' },
          { value: '1411', label: '1411' },
          { value: '1412', label: '1412' },
          { value: '1413', label: '1413' },
          { value: '1414', label: '1414' },
          { value: '1415', label: '1415' },
          { value: '1416', label: '1416' },
          { value: '1417', label: '1417' },
          { value: '1418', label: '1418' },
          { value: '1419', label: '1419' },
          { value: '1420', label: '1420' }
        ]
      }, {
        value: 15,
        label: '十五层',
        children: [
          { value: '1501', label: '1501' },
          { value: '1502', label: '1502' },
          { value: '1503', label: '1503' },
          { value: '1504', label: '1504' },
          { value: '1505', label: '1505' },
          { value: '1506', label: '1506' },
          { value: '1507', label: '1507' },
          { value: '1508', label: '1508' },
          { value: '1509', label: '1509' },
          { value: '1510', label: '1510' },
          { value: '1511', label: '1511' },
          { value: '1512', label: '1512' },
          { value: '1513', label: '1513' },
          { value: '1514', label: '1514' },
          { value: '1515', label: '1515' },
          { value: '1516', label: '1516' },
          { value: '1517', label: '1517' },
          { value: '1518', label: '1518' },
          { value: '1519', label: '1519' },
          { value: '1520', label: '1520' }
        ]
      }, {
        value: 16,
        label: '十六层',
        children: [
          { value: '1601', label: '1601' },
          { value: '1602', label: '1602' },
          { value: '1603', label: '1603' },
          { value: '1604', label: '1604' },
          { value: '1605', label: '1605' },
          { value: '1606', label: '1606' },
          { value: '1607', label: '1607' },
          { value: '1608', label: '1608' },
          { value: '1609', label: '1609' },
          { value: '1610', label: '1610' },
          { value: '1611', label: '1611' },
          { value: '1612', label: '1612' },
          { value: '1613', label: '1613' },
          { value: '1614', label: '1614' },
          { value: '1615', label: '1615' },
          { value: '1616', label: '1616' },
          { value: '1617', label: '1617' },
          { value: '1618', label: '1618' },
          { value: '1619', label: '1619' },
          { value: '1620', label: '1620' }
        ]
      }, {
        value: 17,
        label: '十七层',
        children: [
          { value: '1701', label: '1701' },
          { value: '1702', label: '1702' },
          { value: '1703', label: '1703' },
          { value: '1704', label: '1704' },
          { value: '1705', label: '1705' },
          { value: '1706', label: '1706' },
          { value: '1707', label: '1707' },
          { value: '1708', label: '1708' },
          { value: '1709', label: '1709' },
          { value: '1710', label: '1710' },
          { value: '1711', label: '1711' },
          { value: '1712', label: '1712' },
          { value: '1713', label: '1713' },
          { value: '1714', label: '1714' },
          { value: '1715', label: '1715' },
          { value: '1716', label: '1716' },
          { value: '1717', label: '1717' },
          { value: '1718', label: '1718' },
          { value: '1719', label: '1719' },
          { value: '1720', label: '1720' }
        ]
      }, {
        value: 18,
        label: '十八层',
        children: [
          { value: '401', label: '401' },
          { value: '402', label: '402' },
          { value: '403', label: '403' },
          { value: '404', label: '404' },
          { value: '405', label: '405' },
          { value: '406', label: '406' },
          { value: '407', label: '407' },
          { value: '408', label: '408' },
          { value: '409', label: '409' },
          { value: '410', label: '410' },
          { value: '411', label: '411' },
          { value: '412', label: '412' },
          { value: '413', label: '413' },
          { value: '414', label: '414' },
          { value: '415', label: '415' },
          { value: '416', label: '416' },
          { value: '417', label: '417' },
          { value: '418', label: '418' },
          { value: '419', label: '419' },
          { value: '420', label: '420' }
        ]
      }, {
        value: 19,
        label: '十九层',
        children: [
          { value: '1901', label: '1901' },
          { value: '1902', label: '1902' },
          { value: '1903', label: '1903' },
          { value: '1904', label: '1904' },
          { value: '1905', label: '1905' },
          { value: '1906', label: '1906' },
          { value: '1907', label: '1907' },
          { value: '1908', label: '1908' },
          { value: '1909', label: '1909' },
          { value: '1910', label: '1910' },
          { value: '1911', label: '1911' },
          { value: '1912', label: '1912' },
          { value: '1913', label: '1913' },
          { value: '1914', label: '1914' },
          { value: '1915', label: '1915' },
          { value: '1916', label: '1916' },
          { value: '1917', label: '1917' },
          { value: '1918', label: '1918' },
          { value: '1919', label: '1919' },
          { value: '1920', label: '1920' }
        ]
      }, {
        value: 20,
        label: '二十层',
        children: [
          { value: '2001', label: '2001' },
          { value: '2002', label: '2002' },
          { value: '2003', label: '2003' },
          { value: '2004', label: '2004' },
          { value: '2005', label: '2005' },
          { value: '2006', label: '2006' },
          { value: '2007', label: '2007' },
          { value: '2008', label: '2008' },
          { value: '2009', label: '2009' },
          { value: '2010', label: '2010' },
          { value: '2011', label: '2011' },
          { value: '2012', label: '2012' },
          { value: '2013', label: '2013' },
          { value: '2014', label: '2014' },
          { value: '2015', label: '2015' },
          { value: '2016', label: '2016' },
          { value: '2017', label: '2017' },
          { value: '2018', label: '2018' },
          { value: '2019', label: '2019' },
          { value: '2020', label: '2020' }
        ]
      },]
    }
  },
  mounted() {
    this.tmpCompany = window.localStorage.getItem("tmpCompany");
    this.getCompanyById();
    this.getCompanyRentInfo();
  },
  methods: {
    changeTime1() {
      this.times.start = this.add_order.start_time;
      console.log(this.times.start)
    },
    changeTime2() {
      this.times.end = this.add_order.end_time;
      console.log(this.times.start)
      console.log(this.times.end)
    },
    change() {
      console.log(this.rentRoom)
    },
    pickerStartDate() {
      // var _this = this;
      // return {
      //   disabledDate(time) {
      //     var time1 = new Date(_this.times.start).getTime();// 开始日期时间戳
      //     let a = time.getTime() <= Date.now() - 8.64e7;
      //     return time1 ? (a || time.getTime() > time1) : a;
      //   }
      // }
    },
    /**结束日期必须大于等于开始日期 且限制从当天之后(包含当天）可选**/
    pickerEndDate() {
      var _this = this;
      return {
        disabledDate(time) {
          var time1 = new Date(_this.times.start).getTime();// 开始日期时间戳
          let a = time.getTime() <= Date.now() - 8.64e7;
          return time1 ? (time.getTime() <= time1 - _this.oneDayMsec) : a;
        }
      }
    },
    load () {
      this.count += 2
    },
    deleteConfirm(item) {
      this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteOrder(item);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getCompanyById() {
      let that = this;
      that.$axios({
        method: 'get',
        url: '/company',
        params:{
          uuid: this.tmpCompany
        }
      }).then((res) => {
        console.log("获取公司信息", res.data);
        this.companyInfo = res.data.data;
        this.$message.success(res.data.msg);
      }).catch(error=> {
            console.log("error", error);
          }
      )
    },
    getCompanyRentInfo() {
      let that = this;
      that.$axios({
        method: 'get',
        url: '/company/lease-order',
        params:{
          uuid: this.tmpCompany
        }
      }).then((res) => {
        console.log("获取公司租赁订单", res.data);
        this.orderList = res.data.data;
        if (res.data.status === 200) {
          this.$message.success(res.data.msg)
        }
      }).catch(error=> {
            console.log("error", error);
          }
      )
    },
    toUserList() {
      this.$router.push('/usermanage')
    },
    toOrderDetail(item) {
      window.localStorage.setItem("tmpOrder",JSON.stringify(item));
      this.$router.push('/orderdetail')
    },
    close_add(){
      this.if_view = false;
    },
    add_order_confirm(){
      this.add_order.rooms = this.rentRoom;
      this.times.start = this.add_order.start_time;
      this.times.end = this.add_order.end_time;
      this.add_order.start_time = this.add_order.start_time + "T00:00:00Z"
      this.add_order.end_time = this.add_order.end_time + "T00:00:00Z"
      this.add_order.signed_time = this.add_order.signed_time + "T00:00:00Z"
      console.log("新增订单", this.add_order);
      let that = this;
      that.$axios({
        method: 'post',
        url: '/company/lease-order',
        data: {
          "company_uuid": this.tmpCompany,
          "end_time": this.add_order.end_time,
          "rooms": this.add_order.rooms,
          "signed_time": this.add_order.signed_time,
          "start_time": this.add_order.start_time
        }
      }).then((res) => {
        console.log("新增成功", res);
        this.getCompanyRentInfo();
        if (res.status === 200) {
          this.$message.success(res.data.msg)
        }
        this.add_order.rooms=[];
        this.add_order.start_time = "";
        this.add_order.end_time = "";
        this.add_order.signed_time = "";
      }).catch(error=> {
            console.log("error", error);
        this.$message.error("房间已被租用")
        this.add_order.rooms=[];
        this.add_order.start_time = "";
        this.add_order.end_time = "";
        this.add_order.signed_time = "";
          }
      )
      this.add_order.rooms=[];
      this.add_order.start_time = "";
      this.add_order.end_time = "";
      this.add_order.signed_time = "";
      this.if_view = false;
    },
    editCompany() {
      this.edit = true;
    },
    editConfirm() {
      this.edit = false;
      let that = this;
      that.$axios({
        method: 'post',
        url: '/company',
        data: {
          "account_number": "",
          "contact_person": this.companyInfo.contact_person,
          "contact_phone": this.companyInfo.contact_phone,
          "legal_person": this.companyInfo.legal_person,
          "name": this.companyInfo.name,
          "password": this.companyInfo.password,
          "uuid": this.tmpCompany
        }
      }).then((res) => {
        console.log("修改公司信息", this.companyInfo);
        this.$message.success(res.data.msg);
        UserManage.methods.updateCompanyList();
      }).catch(error=> {
            console.log("error", error);
          }
      )
    },
    deleteOrder(item) {
      console.log("删除！")
      let that = this;
      that.$axios({
        method: 'post',
        url: '/company/lease-order/delete',
        params:{
          uuid: item.uuid
        }
      }).then((res) => {
        console.log("删除公司租赁订单", res.data);
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.getCompanyRentInfo();
        } else {
          this.$message.error(res.data.msg)
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
.userDetail {
  position: absolute;
  background: #F5F5F5;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-image:url('../../assets/bg/Frame 57.svg');
  background-size:70% 100%;
  background-position:50px 2000px;
}
.userDetails {
  position: relative;
  width: 83vw;
  margin-left: 16vw;
  margin-top: 1vh;
  margin-right: 153px;
  height: 600px;
  /* width: 100%; */
}
.details {
  height: 40px;
  margin-bottom: 2vh;
}
.userDetailTitle {
  float: left;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;

  color: #202020;

}
.back2user {
  float: right;
  background: #3FB89C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #FFFFFF;
  border: none;
}
.userCard1 {
  position: relative;
  height: 22vh;

  padding-top: 36px;
  padding-left: 55px;
  padding-right: 90px;
  padding-bottom: 15px;
  background: #FFFFFF;
  border-radius: 10px;
}
.userCard2 {
  position: relative;
  height: 52vh;
  margin-top: 1vh;

  padding-top: 36px;
  padding-left: 55px;
  padding-right: 90px;
  padding-bottom: 15px;

  background: #FFFFFF;
  border-radius: 10px;
}
.userInfos {
  display: flex;
  position: relative;
  float: left;
  width: 100%;
  margin-left: 0px;
  margin-bottom: 10px;
}

.userInfos i {
  margin-right: 5px;
}

.editBtn{
  margin-top: -10px;
  float: left;
  background: #3FB89C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #FFFFFF;
  border: none;
}
.editBtn:hover {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
}
.orders {
  margin-top: 21px;
  width: 77vw;
  height: 42vh;
  overflow: auto
}
.orderItem {
  height: 112px;
  width: 94%;
  padding-top: 15px;
  padding-left: 22px;
  padding-right: 22px;
  margin-bottom: 27px;
  background: #F5F6FA;
  border-radius: 10px;

  font-family: Heiti-lighter;
}
.orderInfos {
  font-size: 14px;
  position: relative;
  display: flex;
  height: 25px;
  margin-left: 0;
  float: left;
  width: 100%;
}
.orderInfos i {
  margin-right: 5px;
  width: 16px;
}
.orderDetailBtn {
  height: 32px;
  width: 120px;
  vertical-align: center;
  display: flex;
  margin-right: 0px;
  background: #5D5B5B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #FFFFFF;
  font-size: 14px;
  border: none;
}
.orderDetailBtn:hover {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
}

.deleBtn {
  height: 32px;
  width: 32px;
  vertical-align: center;
  padding-right: 10%;
  display: flex;
  margin-right: 0px;
  background: #5D5B5B;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #FFFFFF;
  font-size: 14px;
  border: none;
}

.deleBtn:hover {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
}

.el-icon-userName {
  background: url('../../assets/UserManage/usernameIcon.png') center no-repeat;
  color: #000000;
  background-size: 12px;
}
.el-icon-userName:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-companyName {
  background: url('../../assets/UserManage/companyNameIcon.png') center no-repeat;
  color: #000000;
  background-size: 12px
}
.el-icon-companyName:before {
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

.el-icon-password {
  background: url('../../assets/UserManage/userPasswordIcon.png') center no-repeat;
  background-size: 12px;
}

.el-icon-password:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-rentRoom {
  background: url('../../assets/UserManage/orderRoom.png') center no-repeat;
  background-size: 12px;
}

.el-icon-rentRoom :before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-rentTime {
  background: url('../../assets/UserManage/orderTime.png') center no-repeat;
  background-size: 12px;
}

.el-icon-rentTime:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-sigTime {
  background: url('../../assets/UserManage/orderSigTime.png') center no-repeat;
  background-size: 12px;
  color: #000000;
}

.el-icon-asigTime:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-addOrder {
  background: url('../../assets/UserManage/addOrder.png') center no-repeat;
  background-size: 12px;
}

.el-icon-addOrder:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-orderDetail {
  background: url('../../assets/UserManage/orderDetail.png') center no-repeat;
  background-size: 12px;
}

.el-icon-orderDetail:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-back {
  background: url('../../assets/UserManage/backToUser.png') center no-repeat;
  background-size: 12px;
}

.el-icon-back:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-companyInfo {
  background: url('../../assets/UserManage/companyInfoIcon.png') center no-repeat;
  background-size: 16px;
}

.el-icon-companyInfo:before {
  content: "\8d3a";
  font-size: 16px;
  visibility: hidden;
}

.el-icon-edit {
  background: url('../../assets/UserManage/edit.png') center no-repeat;
  background-size: 12px;
}

.el-icon-edit:before {
  content: "\8d3a";
  font-size: 12px;
  visibility: hidden;
}
.margin-top {
  font-family: Heiti-lighter;
  font-size: 16px;
  width: 90%;
}
.orderAdd {
  margin-top: 5vh;
}
.order-detail-allot-allocate-dialog-title {
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
</style>
<style>
.orderItem .el-button {
  padding: 9px 9px !important;
}
/deep/ .el-dialog__header {
  background-color: linear-gradient(to bottom, #3FB89C 0%,#3FB89C 5%,white 6%,white 100%) !important;
}
.companyDialog .el-dialog__header{
  padding:0.5px 1px 10px !important;
  background-color: #42b983 !important;
}

.margin-top .el-input__inner {
  height: 3vh !important;
  width: 10vw !important;
}

.margin-top .el-descriptions--medium:not(.is-bordered) .el-descriptions-item__cell {
  height: 5.5vh !important;
  vertical-align: center;
}

.orderAdd .el-select {
  margin-left: 0px!important;
}

</style>
