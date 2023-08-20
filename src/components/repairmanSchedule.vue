<template>
  <div style="margin: 0vh">
    <div class="time-table">
      <el-row type="flex" class="row-bg" justify="center">
          <div class="time-table-top-bar">
            <div class="time-table-time-bar">
              <img src="../assets/timetable/timetable.png" class="time-table-img">
              <div class="time-table-time">
                {{ this.years[0] }}年{{ this.months[0] }}月{{ this.days[0] }}日 - {{ this.years[6] }}年{{ this.months[6] }}月{{ this.days[6] }}日
              </div>
            </div>
            <div class="chose-time-bottom-box">
<!--              <el-button-group>-->
<!--                <el-button type="primary" icon="el-icon-arrow-left">上一周</el-button>-->
<!--                <el-button type="primary">下一周<i class="el-icon-arrow-right el-icon&#45;&#45;right"></i></el-button>-->
<!--              </el-button-group>-->
              <el-button type="primary" @click="returnlist">返回</el-button>
            </div>
          </div>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="2"><div class="top-item"></div></el-col>
        <el-col :span="3">
          <div class="top-item">
            <div class="day">
              周一&nbsp;{{ this.months[0] }}月{{ this.days[0] }}日
            </div>
            <div class="task-num">
              {{ this.day1.total }}个任务
            </div>
          </div>
        </el-col>
        <el-col :span="3"><div class="top-item">
          <div class="day">
            周二&nbsp;{{ this.months[1] }}月{{ this.days[1] }}日
          </div>
          <div class="task-num">
            {{ this.day2.total }}个任务
          </div>
        </div></el-col>
        <el-col :span="3"><div class="top-item">
          <div class="day">
            周三&nbsp;{{ this.months[2] }}月{{ this.days[2] }}日
          </div>
          <div class="task-num">
            {{ this.day3.total }}个任务
          </div>
        </div></el-col>
        <el-col :span="3"><div class="top-item">
          <div class="day">
            周四&nbsp;{{ this.months[3] }}月{{ this.days[3] }}日
          </div>
          <div class="task-num">
            {{ this.day4.total }}个任务
          </div>
        </div></el-col>
        <el-col :span="3"><div class="top-item">
          <div class="day">
            周五&nbsp;{{ this.months[4] }}月{{ this.days[4] }}日
          </div>
          <div class="task-num">
            {{ this.day5.total }}个任务
          </div>
        </div></el-col>
        <el-col :span="3"><div class="top-item">
          <div class="day">
            周六&nbsp;{{ this.months[5] }}月{{ this.days[5] }}日
          </div>
          <div class="task-num">
            {{ this.day6.total }}个任务
          </div>
        </div></el-col>
        <el-col :span="3"><div class="top-item">
          <div class="day">
            周日&nbsp;{{ this.months[6] }}月{{ this.days[6] }}日
          </div>
          <div class="task-num">
            {{ this.day7.total }}个任务
          </div>
        </div></el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="2"><div class="item-name">上午</div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day1.上午.worksheets[0].status===1,'simple-task-ok':this.day1.上午.worksheets[0].status===2}" @click="opendetail(day1.上午.worksheets[0]);detailVisible=true" v-if="this.day1.上午.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day1.上午.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day1.上午.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day1.上午.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day1.上午.worksheets[1].stage===1,'simple-task-ok':this.day1.上午.worksheets[1].stage===2}" @click="opendetail(day1.上午.worksheets[1]);detailVisible=true" v-if="this.day1.上午.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day1.上午.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day1.上午.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day1.上午.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day2.上午.worksheets[0].status===1,'simple-task-ok':this.day2.上午.worksheets[0].status===2}" @click="opendetail(day2.上午.worksheets[0]);detailVisible=true" v-if="this.day2.上午.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day2.上午.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day2.上午.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day2.上午.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day2.上午.worksheets[1].status===1,'simple-task-ok':this.day2.上午.worksheets[1].status===2}" @click="opendetail(day2.上午.worksheets[1]);detailVisible=true" v-if="this.day2.上午.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day2.上午.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day2.上午.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day2.上午.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day3.上午.worksheets[0].status===1,'simple-task-ok':this.day3.上午.worksheets[0].status===2}"  v-if="this.day3.上午.total>=1">
            <div class="task-back" @click="opendetail(day3.上午.worksheets[0]);detailVisible=true">
              <div class="question-description">
                {{ this.day3.上午.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day3.上午.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day3.上午.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day3.上午.worksheets[1].status===1,'simple-task-ok':this.day3.上午.worksheets[1].status===2}"  v-if="this.day3.上午.total===2">
            <div class="task-back" @click="opendetail(day3.上午.worksheets[1]);detailVisible=true">
              <div class="question-description">
                {{ this.day3.上午.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day3.上午.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day3.上午.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day4.上午.worksheets[0].status===1,'simple-task-ok':this.day4.上午.worksheets[0].status===2}" @click="opendetail(day4.上午.worksheets[0]);detailVisible=true" v-if="this.day4.上午.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day4.上午.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day4.上午.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day4.上午.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day4.上午.worksheets[1].status===1,'simple-task-ok':this.day4.上午.worksheets[1].status===2}" @click="opendetail(day4.上午.worksheets[1]);detailVisible=true" v-if="this.day4.上午.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day4.上午.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day4.上午.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day4.上午.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day5.上午.worksheets[0].status===1,'simple-task-ok':this.day5.上午.worksheets[0].status===2}" @click="opendetail(day5.上午.worksheets[0]);detailVisible=true" v-if="this.day5.上午.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day5.上午.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day5.上午.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day5.上午.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day5.上午.worksheets[1].status===1,'simple-task-ok':this.day5.上午.worksheets[1].status===2}" @click="opendetail(day5.上午.worksheets[1]);detailVisible=true" v-if="this.day5.上午.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day5.上午.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day5.上午.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day5.上午.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day6.上午.worksheets[0].status===1,'simple-task-ok':this.day6.上午.worksheets[0].status===2}" @click="opendetail(day6.上午.worksheets[0]);detailVisible=true" v-if="this.day6.上午.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day6.上午.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day6.上午.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day6.上午.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day6.上午.worksheets[1].status===1,'simple-task-ok':this.day6.上午.worksheets[1].status===2}" @click="opendetail(day6.上午.worksheets[1]);detailVisible=true" v-if="this.day6.上午.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day6.上午.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day6.上午.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day6.上午.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day7.上午.worksheets[0].status===1,'simple-task-ok':this.day7.上午.worksheets[0].status===2}" @click="opendetail(day7.上午.worksheets[0]);detailVisible=true" v-if="this.day7.上午.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day7.上午.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day7.上午.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day7.上午.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day7.上午.worksheets[1].status===1,'simple-task-ok':this.day7.上午.worksheets[1].status===2}" @click="opendetail(day7.上午.worksheets[1]);detailVisible=true" v-if="this.day7.上午.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day7.上午.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day7.上午.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day7.上午.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="2"><div class="item-name">下午</div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day1.下午.worksheets[0].status===1,'simple-task-ok':this.day1.下午.worksheets[0].status===2}" @click="opendetail(day1.下午.worksheets[0]);detailVisible=true" v-if="this.day1.下午.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day1.下午.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day1.下午.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day1.下午.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day1.下午.worksheets[1].status===1,'simple-task-ok':this.day1.下午.worksheets[1].status===2}" @click="opendetail(day1.下午.worksheets[1]);detailVisible=true" v-if="this.day1.下午.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day1.下午.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day1.下午.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day1.下午.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day2.下午.worksheets[0].status===1,'simple-task-ok':this.day2.下午.worksheets[0].status===2}" @click="opendetail(day2.下午.worksheets[0]);detailVisible=true" v-if="this.day2.下午.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day2.下午.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day2.下午.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day2.下午.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day2.下午.worksheets[1].status===1,'simple-task-ok':this.day2.下午.worksheets[1].status===2}" @click="opendetail(day2.下午.worksheets[1]);detailVisible=true" v-if="this.day2.下午.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day2.下午.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day2.下午.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day2.下午.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day3.下午.worksheets[0].status===1,'simple-task-ok':this.day3.下午.worksheets[0].status===2}" @click="opendetail(day3.下午.worksheets[0]);detailVisible=true" v-if="this.day3.下午.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day3.下午.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day3.下午.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day3.下午.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day3.下午.worksheets[1].status===1,'simple-task-ok':this.day3.下午.worksheets[1].status===2}" @click="opendetail(day3.下午.worksheets[1]);detailVisible=true" v-if="this.day3.下午.total===2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day3.下午.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day3.下午.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day3.下午.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day4.下午.worksheets[0].status===1,'simple-task-ok':this.day4.下午.worksheets[0].status===2}" @click="opendetail(day4.下午.worksheets[0]);detailVisible=true" v-if="this.day4.下午.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day4.下午.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day4.下午.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day4.下午.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day4.下午.worksheets[1].status===1,'simple-task-ok':this.day4.下午.worksheets[1].status===2}" @click="opendetail(day4.下午.worksheets[1]);detailVisible=true" v-if="this.day4.下午.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day4.下午.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day4.下午.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day4.下午.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day5.下午.worksheets[0].status===1,'simple-task-ok':this.day5.下午.worksheets[0].status===2}" @click="opendetail(day5.下午.worksheets[0]);detailVisible=true" v-if="this.day5.下午.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day5.下午.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day5.下午.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day5.下午.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day5.下午.worksheets[1].status===1,'simple-task-ok':this.day5.下午.worksheets[1].status===2}" @click="opendetail(day5.下午.worksheets[1]);detailVisible=true" v-if="this.day5.下午.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day5.下午.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day5.下午.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day5.下午.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day6.下午.worksheets[0].status===1,'simple-task-ok':this.day6.下午.worksheets[0].status===2}" @click="opendetail(day6.下午.worksheets[0]);detailVisible=true" v-if="this.day6.下午.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day6.下午.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day6.下午.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day6.下午.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day6.下午.worksheets[1].status===1,'simple-task-ok':this.day6.下午.worksheets[1].status===2}" @click="opendetail(day6.下午.worksheets[1]);detailVisible=true" v-if="this.day6.下午.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day6.下午.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day6.下午.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day6.下午.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day7.下午.worksheets[0].status===1,'simple-task-ok':this.day7.下午.worksheets[0].status===2}" @click="opendetail(day7.下午.worksheets[0]);detailVisible=true" v-if="this.day7.下午.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day7.下午.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day7.下午.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day7.下午.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day7.下午.worksheets[1].status===1,'simple-task-ok':this.day7.下午.worksheets[1].status===2}" @click="opendetail(day7.下午.worksheets[1]);detailVisible=true" v-if="this.day7.下午.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day7.下午.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day7.下午.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day7.下午.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="2"><div class="item-name">晚上</div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day1.晚上.worksheets[0].status===1,'simple-task-ok':this.day1.晚上.worksheets[0].status===2}" @click="opendetail(day1.晚上.worksheets[0]);detailVisible=true" v-if="this.day1.晚上.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day1.晚上.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day1.晚上.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day1.晚上.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day1.晚上.worksheets[1].status===1,'simple-task-ok':this.day1.晚上.worksheets[1].status===2}" @click="opendetail(day1.晚上.worksheets[1]);detailVisible=true" v-if="this.day1.晚上.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day1.晚上.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day1.晚上.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day1.晚上.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day2.晚上.worksheets[0].status===1,'simple-task-ok':this.day2.晚上.worksheets[0].status===2}" @click="opendetail(day2.晚上.worksheets[0]);detailVisible=true" v-if="this.day2.晚上.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day2.晚上.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day2.晚上.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day2.晚上.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day2.晚上.worksheets[1].status===1,'simple-task-ok':this.day2.晚上.worksheets[1].status===2}" @click="opendetail(day2.晚上.worksheets[1]);detailVisible=true" v-if="this.day2.晚上.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day2.晚上.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day2.晚上.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day2.晚上.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day3.晚上.worksheets[0].status===1,'simple-task-ok':this.day3.晚上.worksheets[0].status===2}" @click="opendetail(day3.晚上.worksheets[0]);detailVisible=true" v-if="this.day3.晚上.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day3.晚上.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day3.晚上.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day3.晚上.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day3.晚上.worksheets[1].status===1,'simple-task-ok':this.day3.晚上.worksheets[1].status===2}" @click="opendetail(day3.晚上.worksheets[1]);detailVisible=true" v-if="this.day3.晚上.total===2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day3.晚上.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day3.晚上.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day3.晚上.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day4.晚上.worksheets[0].status===1,'simple-task-ok':this.day4.晚上.worksheets[0].status===2}" @click="opendetail(day4.晚上.worksheets[0]);detailVisible=true" v-if="this.day4.晚上.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day4.晚上.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day4.晚上.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day4.晚上.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day4.晚上.worksheets[1].status===1,'simple-task-ok':this.day4.晚上.worksheets[1].status===2}" @click="opendetail(day4.晚上.worksheets[1]);detailVisible=true" v-if="this.day4.晚上.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day4.晚上.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day4.晚上.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day4.晚上.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day5.晚上.worksheets[0].status===1,'simple-task-ok':this.day5.晚上.worksheets[0].status===2}" @click="opendetail(day5.晚上.worksheets[0]);detailVisible=true" v-if="this.day5.晚上.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day5.晚上.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day5.晚上.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day5.晚上.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day5.晚上.worksheets[1].status===1,'simple-task-ok':this.day5.晚上.worksheets[1].status===2}" @click="opendetail(day5.晚上.worksheets[1]);detailVisible=true" v-if="this.day5.晚上.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day5.晚上.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day5.晚上.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day5.晚上.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day6.晚上.worksheets[0].status===1,'simple-task-ok':this.day6.晚上.worksheets[0].status===2}" @click="opendetail(day6.晚上.worksheets[0]);detailVisible=true" v-if="this.day6.晚上.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day6.晚上.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day6.晚上.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day6.晚上.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day6.晚上.worksheets[1].status===1,'simple-task-ok':this.day6.晚上.worksheets[1].status===2}" @click="opendetail(day6.晚上.worksheets[1]);detailVisible=true" v-if="this.day6.晚上.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day6.晚上.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day6.晚上.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day6.晚上.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
        <el-col :span="3"><div class="item">
          <div v-bind:class="{'simple-task':this.day7.晚上.worksheets[0].status===1,'simple-task-ok':this.day7.晚上.worksheets[0].status===2}" @click="opendetail(day7.晚上.worksheets[0]);detailVisible=true" v-if="this.day7.晚上.total>=1">
            <div class="task-back">
              <div class="question-description">
                {{ this.day7.晚上.worksheets[0].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day7.晚上.worksheets[0].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day7.晚上.worksheets[0].report_phone }}
              </div>
            </div>
          </div>
          <div v-bind:class="{'simple-task':this.day7.晚上.worksheets[1].status===1,'simple-task-ok':this.day7.晚上.worksheets[1].status===2}" @click="opendetail(day7.晚上.worksheets[1]);detailVisible=true" v-if="this.day7.晚上.total==2">
            <div class="task-back">
              <div class="question-description">
                {{ this.day7.晚上.worksheets[1].description }}
              </div>
              <img src="../assets/timetable/roomnum.png" class="room-num-img">
              <div class="room-num">
                {{ this.day7.晚上.worksheets[1].report_room }}
              </div>
              <img src="../assets/timetable/phone.png" class="phone-img">
              <div class="phone-num">
                {{ this.day7.晚上.worksheets[1].report_phone }}
              </div>
            </div>
          </div>
        </div></el-col>
      </el-row>
    </div>
    <el-drawer
        :visible.sync="detailVisible"
        :with-header="false"
        direction="rtl"
        size="35%"
        >
      <Detailbar :orderdetail="this.checkItem"></Detailbar>
    </el-drawer>
  </div>
</template>

<script>
import Detailbar from "@/components/time_OrderDetailAllot";

export default {
  setup() {},
  components: {Detailbar},
  mounted() {
    //console.log(this.worker_uuid);
    this.$axios(
        {
          method:'GET',
          url:'/worksheet/schedule',
          params:{
            uuid:this.worker_uuid
          }
        }
    ).then((res)=>{
      //console.log("查询待维修工单");
      //console.log(res.data)
      this.day1=res.data.data.周一;
      this.day2=res.data.data.周二;
      this.day3=res.data.data.周三;
      this.day4=res.data.data.周四;
      this.day5=res.data.data.周五;
      this.day6=res.data.data.周六;
      this.day7=res.data.data.周日;
      for(var i in res.data.data.weekdays){
        this.years.push(res.data.data.weekdays[i].slice(0,4))
        this.months.push(res.data.data.weekdays[i].slice(5,7))
        this.days.push(res.data.data.weekdays[i].slice(8,10))
      }
      //this.res_admin_list = res.data.data;
      //console.log(this.res_admin_list);
    })
  },
  data(){
    return{
      detailVisible:false,
      worker_uuid:localStorage.getItem('uid'),
      day1:'',
      day2:'',
      day3: {
        total:'',
        上午:{
          total:'',
          worksheets:[]
        },
        下午:{
          total:'',
          worksheets:[]
        },
        晚上:{
          total:'',
          worksheets:[]
        },
      },
      day4:'',
      day5:'',
      day6:'',
      day7:'',
      checkItem:'',
      months:[],
      days:[],
      years:[]
    }
  },
  methods:{
    opendetail(item){
      // console.log(this.day3)
      //console.log("11")
      //console.log(item)
      item.uuidshort=item.uuid.slice(0,6)
      // console.log(item.shortuuid)
      this.checkItem = JSON.parse(JSON.stringify(item));
      console.log(this.checkItem)
    },
    returnlist(){
        localStorage.setItem('side_bar_status',1)
        this.$router.push('/filter_page')
    }
  }
};
</script>

<style scoped>
.time-table{
  position: absolute;
  top:100px;
  left: 15vw;
  width: 83vw;
  margin: 0px;
}
.row-bg{

}
.col-style{
  width:20vw;
}
.item {
  display: flex;
  width: 100%;
  height:22vh;
  border: 1px solid #dedede;
  margin: 0;
  background: #FFFFFF;
  /*justify-content: center;*/
  flex-direction: column;
  align-items: center;
  /* box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); */
}
.top-item{
  display: flex;
  width: 100%;
  height:10vh;
  border: 1px solid #dedede;
  margin: 0;
  background: #FFFFFF;
  text-align: center;
  justify-content: center;
  flex-direction: column;
}
.day{
  color: #000;
  font-size: 15px;
  font-family: Poppins;
}
.task-num{
  color: #000;
  text-align: center;
  font-size: 12px;
  font-family: Poppins;
}
.item-name{
  display: flex;
  width: 100%;
  height:22vh;
  border: 1px solid #dedede;
  margin: 0;
  color: #000;
  font-size: 18px;
  font-family: Heiti-lighter;
  line-height: 16px;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  background: #FFFFFF;
}
.time-table-time-bar{
}
.time-table-time{
  color: #000;
  text-align: center;
  font-size: 22px;
  font-family: Poppins;
  font-weight: 600;
  padding-bottom: 18px;
}
.time-table-img{
  position: absolute;
  width: 24px;
  height: 24px;
  top: 2px;
  left:425px;
}
.chose-time-bottom-box{
  position: absolute;
  bottom: 16px;
  right: 30px;
}
.simple-task{
  margin-top: 2px;
  width: 98%;
  height: 48%;
  border-radius: 6px;
  background: #e04410;
  cursor: pointer;
}
.task-back{
  width: 94%;
  height: 100%;
  border-radius: 0px 6px 6px 0px;
  margin-left: 9px;
  background: #F5F6FA;
}
.simple-task-ok{
  margin-top: 2px;
  width: 98%;
  height: 48%;
  border-radius: 6px;
  background: #3FB89C;
  cursor: pointer;
}
.question-description{
  width: 98%;
  padding-top: 5px;
  font-size: 13px;
  font-family: 'Heiti-lighter';
  font-weight: 500;
}
.room-num-img{
  position: absolute;
  width: 14px;
  height: 14px;
  margin-left: -64px;
  margin-top: 0px;
}
.phone-img{
  position: absolute;
  width: 14px;
  height: 14px;
  margin-left: -64px;
  margin-top: 0px;
}
.room-num{
  width: 50%;
  margin-left: 3px;
  margin-top: -2px;
  font-size: 13px;
  font-family: 'Heiti-lighter';
  font-weight: 500;
}
.phone-num{
  margin-left: -10px;
  margin-top: -2px;
  font-size: 13px;
  font-family: 'Heiti-lighter';
  font-weight: 500;
}
</style>
