import request from '@/utils/request'

  //创建
  export function createKingKong(data) {
    return request({
      url: '/api/lvhuayi/admin/kingKongs/create',
      method: 'post',
      data
    })
  }

  //列表
  export function getKingKongList(data) {
    return request({
      url: '/api/lvhuayi/admin/kingKongs/list',
      method: 'post',
      data
    })
  }
  

  //更新状态（上线、下线）
  export function updateStatus(id, data) {
    return request({
      url: `/api/lvhuayi/admin/kingKongs/${id}/updateStatus`,
      method: 'post',
      data
    })
  }

  //修改权重
  export function updateWeight(id, data) {
    return request({
      url: `/api/lvhuayi/admin/kingKongs/${id}/updateWeight`,
      method: 'post',
      data
    })
  }
  //删除
  export function delItem(id) {
    return request({
      url: `/api/lvhuayi/admin/kingKongs/${id}`,
      method: 'delete'
    })
  }

  
  //修改信息
  export function updateKingKong(data) {
    return request({
      url: '/api/lvhuayi/admin/kingKongs/update',
      method: 'post',
      data
    })
  }