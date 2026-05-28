"use client"

import { motion } from "framer-motion"
import { Pin, MoreHorizontal, Trash2 } from "lucide-react"
import type { Note } from "@/app/page"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NoteCardProps {
  note: Note
  color: "emerald" | "blue" | "orange" | "purple" | "pink"
  onTogglePin: () => void
  onDelete: () => void
}

const colorVariants = {
  emerald: {
    tag: "bg-emerald-500/10 text-emerald-400",
    border: "hover:border-emerald-500/30",
  },
  blue: {
    tag: "bg-blue-500/10 text-blue-400",
    border: "hover:border-blue-500/30",
  },
  orange: {
    tag: "bg-orange-500/10 text-orange-400",
    border: "hover:border-orange-500/30",
  },
  purple: {
    tag: "bg-violet-500/10 text-violet-400",
    border: "hover:border-violet-500/30",
  },
  pink: {
    tag: "bg-pink-500/10 text-pink-400",
    border: "hover:border-pink-500/30",
  },
}

export function NoteCard({ note, color, onTogglePin, onDelete }: NoteCardProps) {
  const variant = colorVariants[color]

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        "group p-5 rounded-2xl glass-card border border-transparent transition-all duration-200",
        variant.border
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-base font-medium text-foreground line-clamp-1 flex-1 pr-2">
          {note.title}
        </h4>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onTogglePin}
            className={cn(
              "p-1.5 rounded-lg transition-colors",
              note.pinned 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <Pin className="w-4 h-4" />
          </motion.button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <MoreHorizontal className="w-4 h-4" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
        {note.content}
      </p>

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-medium",
                variant.tag
              )}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Pinned indicator */}
      {note.pinned && (
        <div className="absolute top-2 right-2">
          <Pin className="w-3 h-3 text-primary fill-primary" />
        </div>
      )}
    </motion.div>
  )
}
