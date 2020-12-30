import request from '@/utils/request'

export function getResource(params: any) {
  return request.post('/boss/resource/getResourcePages', params)
}

export function getCategory() {
  return request.get('/boss/resource/category/getAll')
}
