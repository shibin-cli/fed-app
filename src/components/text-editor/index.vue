<template>
  <div ref="editor"></div>
</template>
<script lang="ts">
import { uploadImg } from '@/services/course'
import Vue from 'vue'
import E from 'wangeditor'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.initEditor()
  },
  methods: {
    initEditor() {
      const editor = new E(this.$refs.editor as Element)
      editor.config.onchange = (newHtml: string) => {
        this.$emit('input', newHtml)
      }
      editor.config.customUploadImg = async (resultFiles: any, insertImgFn: any) => {
        const uploadsFn = resultFiles.map(async (files: any) => {
          const { data } = await uploadImg({
            file: files
          })
          return data.data.name
        })
        const uploads = await Promise.all(uploadsFn)
        uploads.forEach(url => {
          insertImgFn(url)
        })
      }
      editor.create()
      editor.txt.html(this.value)
    }
  }
})
</script>
<style>
</style>
