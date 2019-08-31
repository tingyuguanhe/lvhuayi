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
  

  //更新状态（上线、下线）
  export function updateStatus(id, data) {
    return request({
      url: `/api/lvhuayi/admin/notices/${id}/updateStatus`,
      method: 'post',
      data
    })
  }

  //修改权重
  export function updateWeight(id, data) {
    return request({
      url: `/api/lvhuayi/admin/notices/${id}/updateWeight`,
      method: 'post',
      data
    })
  }
  //删除
  export function delItem(id) {
    return request({
      url: `/api/lvhuayi/admin/notices/${id}`,
      method: 'delete'
    })
  }

  //详情
  export function getItemDetail(id) {
    return request({
      url: `/api/lvhuayi/admin/notices/${id}`,
      method: 'get'
    })
  }

 
