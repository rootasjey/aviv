import dayjs from 'dayjs';

var relativeTime = require('dayjs/plugin/relativeTime')

export const getBodyMessageDate = (date: string) => {
  const datePart = dayjs(date).format("D MMMM YYYY")
  const hourPart = dayjs(date).format("HH:mm")

  return `${datePart} at ${hourPart}`
}

export const getRelativeDate = (date: string) => {
  const diffDays = dayjs().diff(dayjs(date), "day")
  
  if (diffDays > 1) {
    return dayjs(date).format("dddd")
  }
  
  if (diffDays > 3) {
    return dayjs(date).format("D/M/YY")
  }
  
  const diffHours = dayjs().diff(dayjs(date), "hour")

  if (diffHours > 1) {
    return dayjs(date).format("hh:mm")
  }
  
  // @ts-ignore
  return dayjs().to(dayjs(date));
}
