import request from '@/utils/request'

export function getQsTypeList() {
  return request({
    url: '/api/lvhuayi/admin/customerServiceFeedbacks/type/list',
    method: 'get',
  })
}


export function getList(data) {
  return request({
    url: '/api/lvhuayi/admin/customerServiceFeedbacks/list',
    method: 'post',
    data
  })
}

//创建问题类型
export function createQsType(data) {
  return request({
    url: '/api/lvhuayi/admin/customerServiceFeedbacks/type/create',
    method: 'post',
    data
  })
}

//修改权重
export function updateWeight(id, data) {
  return request({
    url: `/api/lvhuayi/admin/customerServiceFeedbacks/type/${id}/updateWeight`,
    method: 'post',
    data
  })
}

//删除
export function delItem(id) {
  return request({
    url: `/api/lvhuayi/admin/customerServiceFeedbacks/type/${id}`,
    method: 'delete'
  })
}

//修改反馈类型
export function updateQsType(data) {
  return request({
    url: '/api/lvhuayi/admin/customerServiceFeedbacks/type/update',
    method: 'post',
    data
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
 

