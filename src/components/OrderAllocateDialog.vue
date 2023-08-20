<template>
  <div>
    <topbar></topbar>
    <sidebar class="side" :which="1"></sidebar>
    <iframe class="suibian" src="http://10.251.253.227:8181/docs/mindoc"></iframe>
  </div>
</template>

<script>
import Topbar from "@/zbh/topbar";
import Sidebar from "@/zbh/sidebar";
export default {
  name: "OrderAllocateDialog",
  components: {Sidebar, Topbar}
}
</script>

<style scoped>
.side{
  position: absolute;
}
.suibian{
  position: absolute;
  left: 240px;
  top: 100px;
  width: 83vw;
  height: 100vh;
}
</style>
