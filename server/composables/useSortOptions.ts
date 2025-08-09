import type { InputMaybe, SortOption } from '../resolvers/resolvers-types'
import { OrderType } from '../resolvers/resolvers-types'

export const useSortOptions = <T extends Record<string, unknown>>(
  data: Array<T>,
  sort: InputMaybe<SortOption> | undefined,
) => {
  // Return as-is if sort is null or undefined
  if (!sort) return data
  const { by, order } = sort
  // If no field to sort by, return early
  if (!by) {
    // return limit ? data.slice(0, limit) : data
    return data
  }
  // Create a shallow copy to avoid mutating original data
  const sorted = data.sort((a, b) => {
    const aVal = a[by]
    const bVal = b[by]

    // Handle undefined or null values
    if (aVal === null && bVal === null) return 0
    if (aVal === null) return order === OrderType.Desc ? 1 : -1
    if (bVal === null) return order === OrderType.Desc ? -1 : 1

    // Numeric sort
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return order === OrderType.Desc ? bVal - aVal : aVal - bVal
    }

    // String sort (fallback to string representation)
    const aStr = String(aVal).toLowerCase()
    const bStr = String(bVal).toLowerCase()

    if (aStr < bStr) return order === OrderType.Desc ? 1 : -1
    if (aStr > bStr) return order === OrderType.Desc ? -1 : 1
    return 0
  })

  // return limit ? sorted.slice(0, limit) : sorted
  return sorted
}
