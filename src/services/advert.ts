import request from '@/utils/request'

export function getAdList(params: any) {
  return request.get('front/ad/getAdList', {
    params
  })
}

export function getAllSpaces(params: any) {
  return request.get('front/ad/space/getAllSpaces', {
    params
  })
}

export function updateStatus(params: any) {
  return request.get('/front/ad/updateStatus', {
    params
  })
}
export function getAdById(id: string | number) {
  return request.get('/front/ad/getAdById', {
    params: {
      id
    }
  })
}

export function saveOrUpdateAd(body: any) {
  return request.post('/front/ad/saveOrUpdate', body)
}

export function saveOrUpdateAdSpace(body: any) {
  return request.post('/front/ad/space/saveOrUpdate', body)
}
