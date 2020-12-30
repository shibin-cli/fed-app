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
