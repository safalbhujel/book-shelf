"use client"

import { useState } from "react"
import { jsx } from "react/jsx-runtime"
import { motion, AnimatePresence } from "framer-motion"
import { Sidebar } from "@/components/sidebar"
import { BookshelfGrid } from "@/components/bookshelf-grid"
import { BookDetail } from "@/components/book-detail"
import { SearchHeader } from "@/components/search-header"
import { CreateBookModal } from "@/components/create-book-modal"

export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  pinned: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Book {
  id: string
  title: string
  emoji: string
  color: "emerald" | "blue" | "orange" | "purple" | "pink"
  noteCount: number
  notes: Note[]
  createdAt: Date
}

const initialBooks: Book[] = [
  {
    id: "1",
    title: "Product Ideas",
    emoji: "💡",
    color: "emerald",
    noteCount: 12,
    notes: [
      { id: "1-1", title: "AI-powered task manager", content: "Build a task manager that uses AI to prioritize and suggest next actions based on deadlines and importance.", tags: ["ai", "productivity"], pinned: true, createdAt: new Date(), updatedAt: new Date() },
      { id: "1-2", title: "Habit tracking app", content: "Gamified habit tracking with streaks, rewards, and social accountability features.", tags: ["mobile", "wellness"], pinned: false, createdAt: new Date(), updatedAt: new Date() },
      { id: "1-3", title: "Smart bookmark manager", content: "Organize bookmarks with auto-tagging, summarization, and dead link detection.", tags: ["browser", "ai"], pinned: true, createdAt: new Date(), updatedAt: new Date() },
    ],
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Design Inspiration",
    emoji: "🎨",
    color: "blue",
    noteCount: 8,
    notes: [
      { id: "2-1", title: "Glassmorphism trends", content: "Soft blurs, frosted glass effects, and subtle transparency are trending in modern UI design.", tags: ["ui", "trends"], pinned: true, createdAt: new Date(), updatedAt: new Date() },
      { id: "2-2", title: "Color palette ideas", content: "Deep navy + emerald green + warm orange creates a sophisticated, modern feel.", tags: ["colors"], pinned: false, createdAt: new Date(), updatedAt: new Date() },
    ],
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Learning Goals",
    emoji: "📚",
    color: "orange",
    noteCount: 15,
    notes: [
      { id: "3-1", title: "Master TypeScript", content: "Focus on advanced types, generics, and conditional types. Build real projects.", tags: ["coding", "typescript"], pinned: true, createdAt: new Date(), updatedAt: new Date() },
      { id: "3-2", title: "Learn Rust basics", content: "Start with the official Rust book, then move to building CLI tools.", tags: ["coding", "rust"], pinned: false, createdAt: new Date(), updatedAt: new Date() },
    ],
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Meeting Notes",
    emoji: "📝",
    color: "purple",
    noteCount: 23,
    notes: [
      { id: "4-1", title: "Q4 Planning Session", content: "Key priorities: improve onboarding, launch mobile app, expand to EU market.", tags: ["work", "planning"], pinned: true, createdAt: new Date(), updatedAt: new Date() },
    ],
    createdAt: new Date(),
  },
  {
    id: "5",
    title: "Personal Journal",
    emoji: "✨",
    color: "pink",
    noteCount: 45,
    notes: [
      { id: "5-1", title: "Reflections on growth", content: "This year has been transformative. Key lessons: patience, consistency, and self-compassion.", tags: ["reflection", "personal"], pinned: false, createdAt: new Date(), updatedAt: new Date() },
    ],
    createdAt: new Date(),
  },
  {
    id: "6",
    title: "Code Snippets",
    emoji: "⚡",
    color: "emerald",
    noteCount: 34,
    notes: [
      { id: "6-1", title: "React useDebounce hook", content: "Custom hook for debouncing values in React components.", tags: ["react", "hooks"], pinned: true, createdAt: new Date(), updatedAt: new Date() },
    ],
    createdAt: new Date(),
  },
]

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book)
  }

  const handleBackToShelf = () => {
    setSelectedBook(null)
  }

  const handleCreateBook = (newBook: Omit<Book, "id" | "noteCount" | "notes" | "createdAt">) => {
    const book: Book = {
      ...newBook,
      id: Date.now().toString(),
      noteCount: 0,
      notes: [],
      createdAt: new Date(),
    }
    setBooks([book, ...books])
    setIsCreateModalOpen(false)
  }

  const handleAddNote = (bookId: string, note: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
    setBooks(books.map(book => {
      if (book.id === bookId) {
        const newNote: Note = {
          ...note,
          id: `${bookId}-${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        const updatedBook = {
          ...book,
          notes: [newNote, ...book.notes],
          noteCount: book.noteCount + 1,
        }
        if (selectedBook?.id === bookId) {
          setSelectedBook(updatedBook)
        }
        return updatedBook
      }
      return book
    }))
  }

  const handleTogglePin = (bookId: string, noteId: string) => {
    setBooks(books.map(book => {
      if (book.id === bookId) {
        const updatedBook = {
          ...book,
          notes: book.notes.map(note =>
            note.id === noteId ? { ...note, pinned: !note.pinned } : note
          ),
        }
        if (selectedBook?.id === bookId) {
          setSelectedBook(updatedBook)
        }
        return updatedBook
      }
      return book
    }))
  }

  const handleDeleteNote = (bookId: string, noteId: string) => {
    setBooks(books.map(book => {
      if (book.id === bookId) {
        const updatedBook = {
          ...book,
          notes: book.notes.filter(note => note.id !== noteId),
          noteCount: book.noteCount - 1,
        }
        if (selectedBook?.id === bookId) {
          setSelectedBook(updatedBook)
        }
        return updatedBook
      }
      return book
    }))
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <SearchHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {selectedBook ? (
              <motion.div
                key="book-detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <BookDetail
                  book={selectedBook}
                  onBack={handleBackToShelf}
                  onAddNote={handleAddNote}
                  onTogglePin={handleTogglePin}
                  onDeleteNote={handleDeleteNote}
                />
              </motion.div>
            ) : (
              <motion.div
                key="bookshelf"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <BookshelfGrid
                  books={filteredBooks}
                  onSelectBook={handleSelectBook}
                  onCreateBook={() => setIsCreateModalOpen(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <CreateBookModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateBook={handleCreateBook}
      />
    </div>
  )
}
