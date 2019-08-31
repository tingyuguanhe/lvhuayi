import request from '@/utils/request'


export function getUsersFeedList(data) {
  return request({
    url: '/api/lvhuayi/admin/helpAndFeedbacks/list',
    method: 'post',
    data
  })
}
export function updateStatus(id) {
  return request({
    url: '/api/lvhuayi/admin/helpAndFeedbacks/' + id + '/updateStatus',
    method: 'post',
    data: 'finish'
  })
}