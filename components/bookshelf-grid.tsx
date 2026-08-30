"use client"

import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import type { Book } from "@/app/page"
import { BookCard } from "./book-card"

/**
 * Props for the BookshelfGrid component.
 * @typedef {Object} BookshelfGridProps
 * @property {Book[]} books - Array of books to display in the grid
 * @property {(book: Book) => void} onSelectBook - Callback when a book card is selected
 * @property {() => void} onCreateBook - Callback when the create button is clicked
 */
interface BookshelfGridProps {
  books: Book[]
  onSelectBook: (book: Book) => void
  onCreateBook: () => void
}

/** Framer Motion animation variants for container with staggered children */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // 80ms delay between each child animation
    },
  },
}

/** Framer Motion animation variants for individual grid items */
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

/**
 * BookshelfGrid component - Displays a responsive grid of book cards.
 * Includes a button to create new books and animated staggered appearance.
 *
 * @component
 * @param {BookshelfGridProps} props - Component props
 * @returns {React.ReactElement} Responsive grid layout with book cards and create button
 *
 * @example
 * <BookshelfGrid
 *   books={books}
 *   onSelectBook={handleSelectBook}
 *   onCreateBook={handleCreateBook}
 * />
 */
export function BookshelfGrid({ books, onSelectBook, onCreateBook }: BookshelfGridProps) {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold text-foreground mb-2">Your Library</h2>
        <p className="text-muted-foreground">
          {books.length} {books.length === 1 ? "book" : "books"} in your collection
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {/* Create new book card */}
        <motion.div variants={item}>
          <motion.button
            onClick={onCreateBook}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-48 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-3 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Create New Book
            </span>
          </motion.button>
        </motion.div>

        {/* Book cards */}
        {books.map((book) => (
          <motion.div key={book.id} variants={item}>
            <BookCard book={book} onSelect={() => onSelectBook(book)} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
