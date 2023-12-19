const now = new Date()
export const formattedDate = now.toLocaleString('ja-JP', {
  timeZone: 'Asia/Tokyo'
})
// export const GetDate = formattedDate.split(/[/\s:]/)
// [year, month, day, hour, minute, second]
