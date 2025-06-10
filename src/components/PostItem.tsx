import { Button } from '@/components/ui/button'
import { Loader2, Pencil, Trash2 } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface PostItemProps {
  id: number
  title: string
  body: string
  onEdit: () => void
  onDelete: () => void
  isDeleting?: boolean
}

export function PostItem({ id, title, body, onEdit, onDelete, isDeleting }: PostItemProps) {
  return (
    <TooltipProvider>
      <li className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <h2 className="text-rose-600 font-semibold text-lg line-clamp-1 mb-1">{title}</h2>
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">{body}</p>
        </div>

        <div className="flex items-center gap-3 sm:flex-col sm:items-end shrink-0">
          {/* Edit Button with Icon & Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-yellow-500 hover:bg-yellow-100"
                onClick={onEdit}
              >
                <Pencil className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit Post</TooltipContent>
          </Tooltip>

          {/* Delete Button with Icon & Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-600 hover:bg-red-100"
                onClick={onDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Trash2 className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete Post</TooltipContent>
          </Tooltip>
        </div>
      </li>
    </TooltipProvider>
  )
}