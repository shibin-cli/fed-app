import request from '@/utils/request'

// 图片上传凭证
export function getImgUploadAddressAdnAuth() {
  return request.get('/boss/course/upload/aliyunImagUploadAddressAdnAuth.json')
}
// 视频上传凭证
export function getVideoUploadAddressAdnAuth(params: any) {
  return request.get('/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json', {
    params
  })
}
// 阿里云转码
export function getTransCode(body: any) {
  return request.post('/boss/course/upload/aliyunTransCode.json', body)
}
// 转码进度
export function getTransCodePercent(lessonId: any) {
  return request.get('/boss/course/upload/aliyunTransCodePercent.json', {
    params: {
      lessonId
    }
  })
}
