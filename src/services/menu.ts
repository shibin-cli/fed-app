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
