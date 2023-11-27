export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
})

export function isSameDay(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  const isSameDay =
    date1.getDay() === date2.getDay() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  return isSameDay;
}

export function formatDate(d) {
  const date = new Date(d)

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}