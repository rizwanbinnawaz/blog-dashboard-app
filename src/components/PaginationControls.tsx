'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  itemCount: number
  pageSize: number
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  itemCount,
  pageSize,
}: PaginationControlsProps) {
  const startIndex = (currentPage - 1) * pageSize

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Info text */}
      <div className="text-sm text-gray-500 whitespace-nowrap">
        Showing {startIndex + 1}-{Math.min(startIndex + pageSize, itemCount)} of {itemCount} posts
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3 cursor-pointer"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:ml-1">Previous</span>
        </Button>

        {/* Page Numbers */}
        <div className="hidden sm:flex items-center gap-1">
          {getPageRange(currentPage, totalPages).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3 cursor-pointer"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ))}
        </div>

        {/* Current page (mobile view) */}
        <div className="sm:hidden text-sm text-gray-700 px-2 cursor-pointer">
          Page {currentPage} of {totalPages}
        </div>

        {/* Next */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3 cursor-pointer"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only sm:not-sr-only sm:mr-1">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Utility to Always 5 Page
function getPageRange(current: number, total: number): number[] {
  const pageCount = 5

  if (total <= pageCount) {
    // Return all pages if total pages are 5 or less
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  let start = Math.max(current - Math.floor(pageCount / 2), 1)
  let end = start + pageCount - 1

  // Adjust if end goes past total
  if (end > total) {
    end = total
    start = end - pageCount + 1
  }

  return Array.from({ length: pageCount }, (_, i) => start + i)
}

