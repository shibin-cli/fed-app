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
