import dayjs from 'dayjs'

// 格式化时间为 2018-08-08
export const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}
// 格式化时间为 2018-08-08 18:08:08
export const formatFullDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

// 格式化时间为 00:00:00
export const formatTime = (date) => {
  return dayjs(date).format('hh:mm:ss')
}

// 2018 09/09 12:30
export const formatSpeicalFullDate = (date) => {
  return dayjs(date).format('YYYY MM/DD HH:mm')
}

// 09/09
export const formatMonthDate = (date) => {
  return dayjs(date).format('MM/DD')
}


export const formatSpeicalDate = (date) => {
  return dayjs(date).format('YYYY MM/DD')
}