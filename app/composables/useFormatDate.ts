export const useFormatDate = (date: string) => {
  const unformattedDate = new Date(date)
  return unformattedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })
}
