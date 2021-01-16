<template>
  <el-card>
    <el-tree
      :data="sessions"
      :props="defaultProps"
      @node-click="handleNodeClick"
      draggable
      :allow-drop="handleDrop"
      @node-drop="handleSort"
    >
      <div
        slot-scope="{node,data}"
        class="section"
      >
        {{node.label}}
        <span v-if="data.sectionName">
          <el-button size="small">编辑</el-button>
          <el-button
            type="primary"
            size="small"
          >添加课时</el-button>
          <el-button size="small">已隐藏</el-button>
        </span>
        <span v-else>
          <el-button size="small">编辑</el-button>
          <el-button
            type="success"
            size="small"
            @click="$router.push({name:'UploadVideo',params:{
              courseId
            },
            query:{
              lessonId:data.id,
            }})"
          >上传视频</el-button>
          <el-button size="small">已隐藏</el-button>
        </span>
      </div>
    </el-tree>

  </el-card>
</template>
<script lang="ts">
import Vue from 'vue'
import { getSectionAndLesson, saveOrUpdateSection } from '@/services/course'
export default Vue.extend({
  props: {
    courseId: {
      type: [String, Number]
    }
  },
  data() {
    return {
      sessions: [],
      defaultProps: {
        children: 'lessonDTOS',
        label(data: any) {
          return data.sectionName || data.theme
        }
      }
    }
  },
  created() {
    this.loadSession()
  },
  methods: {
    handleNodeClick(data: any) {
      // console.log(data)
    },
    async loadSession() {
      const { data } = await getSectionAndLesson(this.courseId)
      console.log(data)
      this.sessions = data.data
    },
    // 被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event
    handleDrop(draggingNode: any, dropNode: any, type: string) {
      return draggingNode.data.sectionId === dropNode.data.sectionId && type !== 'inner'
    },
    async handleSort(dragNode: any, dropNode: any, type: string, event: any) {
      try {
        await Promise.all(dropNode.parent.childNodes.map((item: any, index: number) => {
          console.log(item.data)
          if (dragNode.data.lessonDTOS) {
            // 阶段
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index + 1
            })
          } else {
            // 课时
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index + 1
            })
          }
        }))
        this.$message.success('排序成功')
      } catch (e) {
        console.log(e)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.section {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
  padding: 10px 0;
}
::v-deep .el-tree-node__content {
  height: auto;
}
</style>
