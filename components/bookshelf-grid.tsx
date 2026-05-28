"use client"

import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import type { Book } from "@/app/page"
import { BookCard } from "./book-card"

interface BookshelfGridProps {
  books: Book[]
  onSelectBook: (book: Book) => void
  onCreateBook: () => void
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

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
