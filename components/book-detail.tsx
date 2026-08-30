"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Plus, Search, Pin, MoreHorizontal, Trash2 } from "lucide-react"
import type { Book, Note } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NoteCard } from "./note-card"
import { CreateNoteModal } from "./create-note-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

/**
 * Props for the BookDetail component.
 * @typedef {Object} BookDetailProps
 * @property {Book} book - The book to display details for
 * @property {() => void} onBack - Callback to return to book list
 * @property {(bookId: string, note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void} onAddNote - Callback to add a new note
 * @property {(bookId: string, noteId: string) => void} onTogglePin - Callback to toggle note pin status
 * @property {(bookId: string, noteId: string) => void} onDeleteNote - Callback to delete a note
 */
interface BookDetailProps {
  book: Book
  onBack: () => void
  onAddNote: (bookId: string, note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void
  onTogglePin: (bookId: string, noteId: string) => void
  onDeleteNote: (bookId: string, noteId: string) => void
}

/** Gradient color variants for book header styling - matches book color scheme */
const colorVariants = {
  emerald: "from-emerald-500/20 to-emerald-600/10",
  blue: "from-blue-500/20 to-blue-600/10",
  orange: "from-orange-500/20 to-orange-600/10",
  purple: "from-violet-500/20 to-violet-600/10",
  pink: "from-pink-500/20 to-pink-600/10",
}

/**
 * BookDetail component - Full detail view for a single book with all its notes.
 * Displays book header with emoji, title, search functionality, and notes grid.
 * Separates pinned and regular notes with filtering by search query.
 * Includes create note modal and empty state messaging.
 *
 * @component
 * @param {BookDetailProps} props - Component props
 * @returns {React.ReactElement} Book detail view with notes grid and search
 *
 * @example
 * <BookDetail
 *   book={selectedBook}
 *   onBack={() => setSelectedBook(null)}
 *   onAddNote={(bookId, note) => handleAddNote(bookId, note)}
 *   onTogglePin={(bookId, noteId) => handleTogglePin(bookId, noteId)}
 *   onDeleteNote={(bookId, noteId) => handleDeleteNote(bookId, noteId)}
 * />
 */
export function BookDetail({ book, onBack, onAddNote, onTogglePin, onDeleteNote }: BookDetailProps) {
  // Local state for search and modal
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false)

  // Separate pinned and regular notes for organized display
  const pinnedNotes = book.notes.filter(note => note.pinned)
  const regularNotes = book.notes.filter(note => !note.pinned)

  /** Filters pinned notes by search query across title and content */
  const filteredPinned = pinnedNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  /** Filters regular notes by search query across title and content */
  const filteredRegular = regularNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  /** Handles note creation with parent callback and closes modal */
  const handleCreateNote = (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
    onAddNote(book.id, note)
    setIsCreateNoteOpen(false)
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Library
        </Button>

        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-gradient-to-br",
                colorVariants[book.color]
              )}
            >
              {book.emoji}
            </motion.div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground">{book.title}</h2>
              <p className="text-muted-foreground">
                {book.notes.length} {book.notes.length === 1 ? "note" : "notes"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
            <Button onClick={() => setIsCreateNoteOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Note
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Pinned Notes */}
      {filteredPinned.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Pin className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Pinned
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredPinned.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NoteCard
                  note={note}
                  color={book.color}
                  onTogglePin={() => onTogglePin(book.id, note.id)}
                  onDelete={() => onDeleteNote(book.id, note.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* All Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
          All Notes
        </h3>
        {filteredRegular.length === 0 && filteredPinned.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 px-4"
          >
            <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mb-4">
              <span className="text-4xl">{book.emoji}</span>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No notes yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-sm">
              Start capturing your thoughts by creating your first note in this book.
            </p>
            <Button onClick={() => setIsCreateNoteOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Your First Note
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredRegular.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <NoteCard
                  note={note}
                  color={book.color}
                  onTogglePin={() => onTogglePin(book.id, note.id)}
                  onDelete={() => onDeleteNote(book.id, note.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <CreateNoteModal
        isOpen={isCreateNoteOpen}
        onClose={() => setIsCreateNoteOpen(false)}
        onCreateNote={handleCreateNote}
      />
    </div>
  )
}
