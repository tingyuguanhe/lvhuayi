import request from '@/utils/request'


export function updateUser(data) {
  return request({
    url: '/api/lvhuayi/admin/users/updateAdminUserUsername',
    method: 'post',
    data
  })
}
export function updatePass(data) {
    return request({
      url: '/api/lvhuayi/admin/users/updateAdminUserPassword',
      method: 'post',
      data
    })
  }