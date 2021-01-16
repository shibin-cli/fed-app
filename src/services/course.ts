import request from '@/utils/request'

interface QueryCourses {
  currentPage?: number
  pageSize?: number
  courseName?: string
  status?: number | string
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
export function getCourseById(courseId: number | string) {
  return request.get('/boss/course/getCourseById', {
    params: {
      courseId
    }
  })
}

export function uploadImg(options: any, onUploadProgress?: (progressEvent: any) => void) {
  const data = new FormData()
  data.append('file', options.file)
  return request.post('/boss/course/upload', data, {
    onUploadProgress
  })
}
export function getSectionAndLesson(courseId: number | string) {
  return request.get('/boss/course/section/getSectionAndLesson', {
    params: {
      courseId
    }
  })
}
export function saveOrUpdateSection(body: any) {
  return request.post('/boss/course/section/saveOrUpdateSection', body)
}
