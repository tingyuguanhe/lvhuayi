import request from '@/utils/request'

  //创建
  export function createGuid(data) {
    return request({
      url: '/api/lvhuayi/admin/guides/create',
      method: 'post',
      data
    })
  }

  //列表
  export function getGuidesList(data) {
    return request({
      url: '/api/lvhuayi/admin/guides/list',
      method: 'post',
      data
    })
  }
  
  //更新状态（上线、下线）
  export function updateStatus(id, data) {
    return request({
      url: `/api/lvhuayi/admin/guides/${id}/updateStatus`,
      method: 'post',
      data
    })
  }

  //修改权重
  export function updateWeight(id, data) {
    return request({
      url: `/api/lvhuayi/admin/guides/${id}/updateWeight`,
      method: 'post',
      data
    })
  }
  //删除
  export function delItem(id) {
    return request({
      url: `/api/lvhuayi/admin/guides/${id}`,
      method: 'delete'
    })
  }

  //详情
  export function getItemDetail(id) {
    return request({
      url: `/api/lvhuayi/guides/${id}`,
      method: 'get'
    })
  }


 //修改信息
  export function updateGuide(data) {
    return request({
      url: '/api/lvhuayi/admin/guides/update',
      method: 'post',
      data
    })
  }
 


  
