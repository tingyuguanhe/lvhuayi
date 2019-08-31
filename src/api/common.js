import request from '@/utils/request'

//获取七牛需要的token等信息
export function getMultiMedias() {
  return request({
    url: '/api/lvhuayi/admin/multiMedias/param',
    method: 'get'
  })
}

//管理员列表
export function getAllUesrs() {
    return request({
      url: '/api/lvhuayi/admin/users/listAdminUser',
      method: 'get'
    })
}


