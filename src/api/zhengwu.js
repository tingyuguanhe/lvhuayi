import request from '@/utils/request'


export function getGovermentAffairssList(data) {
  return request({
    url: '/api/lvhuayi/admin/governmentAffairss/list',
    method: 'post',
    data
  })
}

export function createGovermentAffairss(data) {
  return request({
    url: '/api/lvhuayi/admin/governmentAffairss/create',
    method: 'post',
    data
  })
}

export function updateGovermentAffairss(data) {
  return request({
    url: '/api/lvhuayi/admin/governmentAffairss/update',
    method: 'post',
    data
  })
}

export function delGovermentAffairss(id) {
  return request({
    url: '/api/lvhuayi/admin/governmentAffairss/' + id,
    method: 'delete'
  })
}

export function updateWeight(data, id) {
  return request({
    url: '/api/lvhuayi/admin/governmentAffairss/' + id + '/updateWeight',
    method: 'post',
    data
  })
}

//更新状态（上线、下线）
export function updateStatus(id, data) {
    return request({
      url: '',
      method: 'post',
      data
    })
}