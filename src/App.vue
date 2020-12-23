<template>
  <div id="app">
    <h1>App</h1>
    <p>{{ a }}</p>
    <router-view />
  </div>
</template>
<script lang="ts">
// import Vue from 'vue'
// export default Vue.extend({
//   data () {
//     return {
//       a: ''
//     }
//   },
//   methods: {
//     fn () {
//       console.log(this.a)
//     }
//   }
// })
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
  a = 1
  b = 2

  test () {
    console.log(this.a)
  }
}
</script>
<style lang="scss" scoped>
</style>
