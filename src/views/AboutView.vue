<template>
  <div>
    <div class="about">
      <h1>This is an about page</h1>
    </div>
    <button @click="ping">Ping</button>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  methods: {
    ping() {
      this.$axios.get('/test').then((response) => {
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
  },
}
</script>