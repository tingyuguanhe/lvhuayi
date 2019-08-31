import request from '@/utils/request'

export function getList(data) {
    return request({
      url: '/user/login',
      method: 'post',
      data
    })
  }

  export function createNotice(data) {
    return request({
      url: '/api/lvhuayi/admin/notices/create',
      method: 'post',
      data
    })
  }
 
  