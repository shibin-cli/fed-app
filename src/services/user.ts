import request from '@/utils/request'

interface User {
    phone: string
    password: string
}
export async function login(data: User) {
  return request.post('/front/user/login', {
    ...data
  })
}
