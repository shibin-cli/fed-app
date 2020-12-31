import request from '@/utils/request'

interface RoleParams {
  id?: number | null
  code: string
  name: string
  description: string
}

export function createOrUpdate(body: RoleParams) {
  return request.post('/boss/role/saveOrUpdate', body)
}

export function getRoles() {
  return request.get('/boss/role/all')
}

interface AllocRoleParams {
  userId: number | string
  roleIdList: number | string[]
}

export function alloctRoles(body: AllocRoleParams) {
  return request.post('/boss/role/allocateUserRoles', body)
}

export function getUserRole(userId: string | number) {
  return request.get(`/boss/role/user/${userId}`)
}
