<template>
  <MenuEdit />
</template>

<script lang="ts">
import MenuEdit from './components/edit.vue'
import Vue from 'vue'
export default Vue.extend({
  name: 'MenuCreate',
  components: {
    MenuEdit
  }
})
</script>
