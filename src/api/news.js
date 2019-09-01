import request from '@/utils/request'

  //创建
  export function createNews(data) {
    return request({
      url: '/api/lvhuayi/admin/newss/create',
      method: 'post',
      data
    })
  }

  //列表
  export function getNewsList(data) {
    return request({
      url: '/api/lvhuayi/admin/newss/list',
      method: 'post',
      data
    })
  }
  

  //更新状态（上线、下线）
  export function updateStatus(id, data) {
    return request({
      url: `/api/lvhuayi/admin/newss/${id}/updateStatus`,
      method: 'post',
      data
    })
  }

  //修改权重
  export function updateWeight(id, data) {
    return request({
      url: `/api/lvhuayi/admin/newss/${id}/updateWeight`,
      method: 'post',
      data
    })
  }
  //删除
  export function delItem(id) {
    return request({
      url: `/api/lvhuayi/admin/newss/${id}`,
      method: 'delete'
    })
  }

  //详情
  export function getItemDetail(id) {
    return request({
      url: `/api/lvhuayi/admin/newss/${id}`,
      method: 'get'
    })
  }


 //修改信息
  export function updateNews(data) {
    return request({
      url: '/api/lvhuayi/admin/newss/update',
      method: 'post',
      data
    })
  }
   //创建转载新闻
  export function createReprintNews(data) {
    return request({
      url: '/api/lvhuayi/admin/newss/reprint',
      method: 'post',
      data
    })
  }
 
