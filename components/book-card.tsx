"use client"

import { motion } from "framer-motion"
import { FileText } from "lucide-react"
import type { Book } from "@/app/page"
import { cn } from "@/lib/utils"

/**
 * Props for the BookCard component.
 * @typedef {Object} BookCardProps
 * @property {Book} book - The book data to display
 * @property {() => void} onSelect - Callback when the card is clicked
 */
interface BookCardProps {
  book: Book
  onSelect: () => void
}

const colorVariants = {
  emerald: {
    gradient: "from-emerald-500/20 to-emerald-600/10",
    glow: "group-hover:shadow-[0_8px_30px_rgba(16,185,129,0.2)]",
    accent: "bg-emerald-500",
    text: "text-emerald-400",
  },
  blue: {
    gradient: "from-blue-500/20 to-blue-600/10",
    glow: "group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)]",
    accent: "bg-blue-500",
    text: "text-blue-400",
  },
  orange: {
    gradient: "from-orange-500/20 to-orange-600/10",
    glow: "group-hover:shadow-[0_8px_30px_rgba(249,115,22,0.2)]",
    accent: "bg-orange-500",
    text: "text-orange-400",
  },
  purple: {
    gradient: "from-violet-500/20 to-violet-600/10",
    glow: "group-hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)]",
    accent: "bg-violet-500",
    text: "text-violet-400",
  },
  pink: {
    gradient: "from-pink-500/20 to-pink-600/10",
    glow: "group-hover:shadow-[0_8px_30px_rgba(236,72,153,0.2)]",
    accent: "bg-pink-500",
    text: "text-pink-400",
  },
}

/**
 * BookCard component - Displays a single book with emoji, title, and note count.
 * Features smooth hover animations and color-coded styling.
 *
 * @component
 * @param {BookCardProps} props - Component props
 * @returns {React.ReactElement} Animated book card with interactive hover effects
 *
 * @example
 * <BookCard book={book} onSelect={() => handleSelectBook(book)} />
 */
export function BookCard({ book, onSelect }: BookCardProps) {
  const variant = colorVariants[book.color]

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group w-full h-48 rounded-2xl glass-card p-5 flex flex-col justify-between text-left transition-all duration-300",
        variant.glow
      )}
    >
      {/* Top section */}
      <div className="flex items-start justify-between">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br",
            variant.gradient
          )}
        >
          {book.emoji}
        </motion.div>
        <div className={cn("w-2 h-2 rounded-full", variant.accent)} />
      </div>

      {/* Bottom section */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-2 truncate">
          {book.title}
        </h3>
        <div className="flex items-center gap-2">
          <FileText className={cn("w-4 h-4", variant.text)} />
          <span className="text-sm text-muted-foreground">
            {book.noteCount} {book.noteCount === 1 ? "note" : "notes"}
          </span>
        </div>
      </div>

      {/* Hover indicator */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl origin-left",
          variant.accent
        )}
      />
    </motion.button>
  )
}
