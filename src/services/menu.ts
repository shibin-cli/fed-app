import request from '@/utils/request'

export interface Menu {
  parentId: number
  name: string
  href: string
  icon: string
  orderNum: number
  description: string
  shown: boolean
}

interface ResponseData<T> {
  code: string
  message: string
  mesg: string
  time: string
  data: T
}
interface AllocRoleMenu {
  roleId: number | string
  menuIdList: Array<number>
}

export function createMenu<T>(data: Menu) {
  return request.post<ResponseData<T>>('/boss/menu/saveOrUpdate', data)
}

export function getMenuInfo<T>(id: number | string = -1) {
  return request.get<ResponseData<T>>('/boss/menu/getEditMenuInfo', {
    params: {
      id
    }
  })
}

export function getAllMenu() {
  return request.get('/boss/menu/getAll')
}

export function deleteMenu(id: number) {
  return request.delete(`/boss/menu/${id}`)
}

export function getMenuNodeList<T>() {
  return request.get<ResponseData<T>>('/boss/menu/getMenuNodeList')
}

interface AllocRoleMenuResponse {
  mesg: string
  time: string
  code: string
}
export function allocateRoleMenus(data: AllocRoleMenu) {
  return request.post<AllocRoleMenuResponse>('/boss/menu/allocateRoleMenus', data)
}

interface RoleMenusParams {
  roleId: string | number
}
export function getRoleMenus<T>(params: RoleMenusParams) {
  return request.get<ResponseData<T>>('/boss/menu/getRoleMenus', {
    params
  })
}
