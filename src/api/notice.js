import request from '@/utils/request'

export function getList(data) {
    return request({
      url: '/user/login',
      method: 'post',
      data
    })
  }

  //创建
  export function createNotice(data) {
    return request({
      url: '/api/lvhuayi/admin/notices/create',
      method: 'post',
      data
    })
  }

  //列表
  export function getNoticeList(data) {
    return request({
      url: '/api/lvhuayi/admin/notices/list',
      method: 'post',
      data
    })
  }
  