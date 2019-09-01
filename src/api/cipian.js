import request from '@/utils/request'

  //创建
  export function createPorcelain(data) {
    return request({
      url: '/api/lvhuayi/admin/porcelains/create',
      method: 'post',
      data
    })
  }

  //列表
  export function getPorcelainList(data) {
    return request({
      url: '/api/lvhuayi/admin/porcelains/list',
      method: 'post',
      data
    })
  }
  

  //更新状态（上线、下线）
  export function updateStatus(id, data) {
    return request({
      url: `/api/lvhuayi/admin/porcelains/${id}/updateStatus`,
      method: 'post',
      data
    })
  }

  //修改权重
  export function updateWeight(id, data) {
    return request({
      url: `/api/lvhuayi/admin/porcelains/${id}/updateWeight`,
      method: 'post',
      data
    })
  }
  //删除
  export function delItem(id) {
    return request({
      url: `/api/lvhuayi/admin/porcelains/${id}`,
      method: 'delete'
    })
  }

  //详情
  export function getItemDetail(id) {
    return request({
      url: `/api/lvhuayi/admin/porcelains/${id}`,
      method: 'get'
    })
  }


 //修改信息
  export function updatePorcelain(data) {
    return request({
      url: '/api/lvhuayi/admin/porcelains/update',
      method: 'post',
      data
    })
  }
 
