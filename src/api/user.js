import request from '@/utils/request'


export function login(data) {
  return request({
    url: '/api/lvhuayi/admin/users/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: `/api/lvhuayi/users/profile`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
