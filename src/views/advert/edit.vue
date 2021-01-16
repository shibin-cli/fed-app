<template>
  <create-or-update-ad :id="id" />
</template>
<script lang="ts">
import Vue from 'vue'
import CreateOrUpdateAd from './components/createOrUpdateAd.vue'
export default Vue.extend({
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    CreateOrUpdateAd
  }
})
</script>
