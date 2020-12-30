<template>
  <MenuEdit :isEdit="true"/>
</template>

<script lang="ts">
import MenuEdit from './components/edit.vue'
import Vue from 'vue'
export default Vue.extend({
  components: {
    MenuEdit
  }
})
</script>
