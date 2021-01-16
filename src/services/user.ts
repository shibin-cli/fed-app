import request, { ResponseData } from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string
  password: string
}

export async function login(data: User) {
  return request.post<ResponseData>('/front/user/login', qs.stringify(data))
}

export async function getUserInfo() {
  return request.get<ResponseData>('/front/user/getInfo')
}
interface UserPagesParams {
  currentPage?: number
  pageSize?: number
  phone?: string
  userId?: string
  startCreateTime?: string
  endCreateTime?: string
}
interface ResponseBossData<T> {
  code: string
  message: string
  mesg: string
  time: string
  data: T
}
export function getUserPages<T>(data: UserPagesParams) {
  return request.post<ResponseBossData<T>>('/boss/user/getUserPages', data)
}

export function enableUser(userId: string | number) {
  return request.get('/boss/user/enableUser', {
    params: {
      userId
    }
  })
}
export function forbidUser(userId: string | number) {
  return request.get('/boss/user/forbidUser', {
    params: {
      userId
    }
  })
}
