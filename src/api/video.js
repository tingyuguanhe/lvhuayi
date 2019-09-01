import request from '@/utils/request'

  //创建
  export function createVideo(data) {
    return request({
      url: '/api/lvhuayi/admin/videos/create',
      method: 'post',
      data
    })
  }

  //列表
  export function getVideoList(data) {
    return request({
      url: '/api/lvhuayi/admin/videos/list',
      method: 'post',
      data
    })
  }
  

  //更新状态（上线、下线）
  export function updateStatus(id, data) {
    return request({
      url: `/api/lvhuayi/admin/videos/${id}/updateStatus`,
      method: 'post',
      data
    })
  }

  //修改权重
  export function updateWeight(id, data) {
    return request({
      url: `/api/lvhuayi/admin/videos/${id}/updateWeight`,
      method: 'post',
      data
    })
  }
  //删除
  export function delItem(id) {
    return request({
      url: `/api/lvhuayi/admin/videos/${id}`,
      method: 'delete'
    })
  }

  //详情
  export function getItemDetail(id) {
    return request({
      url: `/api/lvhuayi/admin/videos/${id}`,
      method: 'get'
    })
  }


 //修改信息
  export function updateVideo(data) {
    return request({
      url: '/api/lvhuayi/admin/videos/update',
      method: 'post',
      data
    })
  }
 
