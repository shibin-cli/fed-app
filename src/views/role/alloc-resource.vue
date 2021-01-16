<template>
  <el-card>
    <div slot="header">
      分配资源
    </div>
    <el-tree
      :data="sourcesNode"
      :props="defaultProps"
      node-key="id"
      :default-checked-keys="checkedSourceId"
      ref="tree"
      default-expand-all
      show-checkbox
    ></el-tree>
    <div class="footer">
      <el-button
        type="primary"
        @click="allocResource"
      >保存</el-button>
      <el-button @click="resetChecked">清空</el-button>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRoleResources, allocateRoleResources } from '@/services/resource'
import { Tree } from 'element-ui'
export default Vue.extend({
  props: {
    roleId: {
      required: true,
      type: [String, Number]
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'resourceList',
        label: 'name'
      },
      sourcesNode: [],
      checkedSourceId: []
    }
  },
  created() {
    this.loadSourceNode()
  },
  methods: {
    async loadSourceNode() {
      const { data } = await getRoleResources(this.roleId)
      console.log(data)
      this._resolveSelectedKeys(data.data)
      this.sourcesNode = data.data
    },
    _resolveSelectedKeys(sourceNode: any) {
      sourceNode.forEach((source: any) => {
        if (source.selected) {
          this.checkedSourceId.push(source.id as never)
        }
        if (source.resourceList?.length) {
          this._resolveSelectedKeys(source.resourceList)
        }
      })
    },
    resetChecked() {
      (this.$refs.tree as Tree).setCheckedKeys([], true)
    },
    async allocResource() {
      console.log((this.$refs.tree as Tree).getCheckedKeys())
      const { data } = await allocateRoleResources({
        roleId: this.roleId,
        resourceIdList: (this.$refs.tree as Tree).getCheckedKeys()
      })
      if (data.code === '000000') {
        this.$message.success('资源分配成功')
      } else {
        this.$message.error(data.mesg)
      }
    }
  }
})
</script>

<style scoped>
.footer {
  text-align: center;
  padding: 30px 0 10px;
}
</style>
