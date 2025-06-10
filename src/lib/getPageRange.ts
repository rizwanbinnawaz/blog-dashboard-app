export function getPageRange(current: number, total: number): number[] {
  const pageCount = 5

  if (total <= pageCount) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  let start = Math.max(current - Math.floor(pageCount / 2), 1)
  let end = start + pageCount - 1

  if (end > total) {
    end = total
    start = end - pageCount + 1
  }

  return Array.from({ length: pageCount }, (_, i) => start + i)
}
