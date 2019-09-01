import request from '@/utils/request'

  //创建
  export function createActivity(data) {
    return request({
      url: '/api/lvhuayi/admin/activitys/create',
      method: 'post',
      data
    })
  }

  //列表
  export function getActivityList(data) {
    return request({
      url: '/api/lvhuayi/admin/activitys/list',
      method: 'post',
      data
    })
  }
  

  //更新状态（上线、下线）
  export function updateStatus(id, data) {
    return request({
      url: `/api/lvhuayi/admin/activitys/${id}/updateStatus`,
      method: 'post',
      data
    })
  }

  //修改权重
  export function updateWeight(id, data) {
    return request({
      url: `/api/lvhuayi/admin/activitys/${id}/updateWeight`,
      method: 'post',
      data
    })
  }
  //删除
  export function delItem(id) {
    return request({
      url: `/api/lvhuayi/admin/activitys/${id}`,
      method: 'delete'
    })
  }

  //详情
  export function getItemDetail(id) {
    return request({
      url: `/api/lvhuayi/admin/activitys/${id}`,
      method: 'get'
    })
  }


 //修改信息
  export function updateActivity(data) {
    return request({
      url: '/api/lvhuayi/admin/activitys/update',
      method: 'post',
      data
    })
  }
 
