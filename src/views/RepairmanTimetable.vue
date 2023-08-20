<template>
  <div>
    <topbar></topbar>
    <sidebar :which="2"  style="position: absolute;top:-30px"></sidebar>
    <repairman-schedule></repairman-schedule>
  </div>
</template>

<script>
import Sidebar from "@/zbh/sidebar";
import Topbar from "@/zbh/topbar";
import RepairmanSchedule from "@/components/repairmanSchedule";
export default {
  name: "RepairmanTimetable",
  components: {RepairmanSchedule, Topbar, Sidebar}
}
</script>

<style scoped>

</style>
