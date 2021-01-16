import request from '@/utils/request'

export function getResource(params: any) {
  return request.post('/boss/resource/getResourcePages', params)
}

export function getCategory() {
  return request.get('/boss/resource/category/getAll')
}

export function getRoleResources(roleId: string | number) {
  return request.get('/boss/resource/getRoleResources', {
    params: {
      roleId
    }
  })
}

export function allocateRoleResources(body: any) {
  return request.post('/boss/resource/allocateRoleResources', body)
}
