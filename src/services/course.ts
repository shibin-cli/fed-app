import request from '@/utils/request'

interface QueryCourses {
  currentPage?: number
  pageSize?: number
  courseName?: string
  status?: number
}
export function getCourses(body: QueryCourses) {
  return request.post('/boss/course/getQueryCourses', body)
}

interface ChangeStateParams {
  courseId: string
  status: number
}
export function changeState(params: ChangeStateParams) {
  return request.get('/boss/course/changeState', {
    params
  })
}

export function saveOrUpdateCourse(body: any) {
  return request.post('/boss/course/saveOrUpdateCourse', body)
}
export function uploadImg(options: any, onUploadProgress?: (progressEvent: any) => void) {
  const data = new FormData()
  data.append('file', options.file)
  return request.post('/boss/course/upload', data, {
    onUploadProgress
  })
}
