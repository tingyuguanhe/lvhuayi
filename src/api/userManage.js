import request from '@/utils/request'


export function getUsersList(data) {
  return request({
    url: '/api/lvhuayi/admin/users/list/search',
    method: 'post',
    data
  })
}
export function getHistoryList(id) {
    return request({
      url: '/api/lvhuayi/admin/users/' + id + '/history/list',
      method: 'get'
    })
  }
  