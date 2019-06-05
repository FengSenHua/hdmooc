export const secondFormat = function (time) {
  if (typeof time !== 'number') {
    return 0
  }
  let hour = Math.floor(time / 3600)
  let min = Math.floor((time % 3600) / 60)
  let second = Math.floor((time % 60))
  return hour + '时' + min + '分' + second + '秒'
}
export const timeFormat = function (time) {
  // 2019-05-11T19:36:17+08:00
  let reg = /^(\d{4})-(\d{2})-(\d{2})\w{1}(\d{2}):(\d{2}).*$/
  if (reg.test(time)) {
    let data = reg.exec(time)
    let year = data[1]
    let month = data[2]
    let day = data[3]
    let hour = data[4]
    let second = data[5]
    return year + '年' + month + '月' + day + '日 ' + hour + ':' + second
  }
  return '1997年01月27日 00:00'
}
