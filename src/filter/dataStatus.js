import Vue from 'vue'

export function dataStatus(stauts) {
  let payName
  if (stauts === "IN_FORCE") {
    payName = '上线'
    return payName
  } else if (stauts === "OFFLINE") {
    payName = '下线'
    return payName
  }
}



Vue.filter('dataStatus', dataStatus)
