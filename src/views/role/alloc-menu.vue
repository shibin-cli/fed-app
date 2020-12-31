<template>
  <el-card>
    <el-tree
      :data="menuNodes"
      show-checkbox
      default-expand-all
      highlight-current
      node-key="id"
      ref="tree"
      :default-checked-keys="checkedMenuId"
      :props="defaultProps"
    >
    </el-tree>
    <div align="center">
      <el-button type="primary" @click="onSave">保存</el-button>
      <el-button @click="resetChecked">清空</el-button>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
// import {DefaultMethods} from 'vue/types'
import { getMenuNodeList, allocateRoleMenus, getRoleMenus, Menu } from '@/services/menu'
import { Tree } from 'element-ui'
interface MenuNode extends Menu {
  id: string | number
  subMenuList: Array<MenuNode> | null
}
interface CheckMenuNode extends MenuNode {
  selected: boolean
  subMenuList: Array<CheckMenuNode> | null
}
interface Data {
  menuNodes: Array<MenuNode> | null
  checkedMenuId: Array<string | number>
}
interface Props {
  roleId: string | number
}
interface Methods {
  [proName: string]: any
}
export default Vue.extend<Data, Methods, object, Props>({
  props: {
    roleId: {
      required: true,
      type: [String, Number]
    }
  },
  data() {
    return {
      menuNodes: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedMenuId: []
    }
  },
  created() {
    this.loadMenuNodeList()
    this.loadCheckMenus()
  },
  methods: {
    async loadMenuNodeList() {
      const { data } = await getMenuNodeList<Array<MenuNode>>()
      if (data.data.length) {
        this.menuNodes = data.data
      }
    },
    async onSave() {
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList: (this.$refs.tree as Tree).getCheckedKeys()
      })
      if (data.code === '000000') {
        this.$message.success('保存成功')
        this.$router.back()
      } else {
        this.$message.error(data.mesg)
      }
    },
    async loadCheckMenus() {
      const { data } = await getRoleMenus<Array<CheckMenuNode>>({
        roleId: this.roleId
      })
      const checkedArr: Array<string | number> = []
      this._resolveKeys(data.data, checkedArr)
      this.checkedMenuId = checkedArr
    },
    _resolveKeys(menuNodes: Array<CheckMenuNode>, checkedArr: Array<string | number>) {
      menuNodes.forEach(menu => {
        if (menu.selected) {
          checkedArr.push(menu.id as never)
        }
        if (menu.subMenuList?.length) {
          this._resolveKeys(menu.subMenuList, checkedArr)
        }
      })
    },
    resetChecked() {
      (this.$refs.tree as Tree).setCheckedKeys([])
    }
  }
})
</script>

<style>
</style>
