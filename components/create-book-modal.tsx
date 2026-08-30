"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import type { Book } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

/**
 * Props for the CreateBookModal component.
 * @typedef {Object} CreateBookModalProps
 * @property {boolean} isOpen - Controls modal visibility
 * @property {() => void} onClose - Callback when modal is closed (reset included)
 * @property {(book: Omit<Book, 'id' | 'noteCount' | 'notes' | 'createdAt'>) => void} onCreateBook - Callback with new book data
 */
interface CreateBookModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateBook: (book: Omit<Book, "id" | "noteCount" | "notes" | "createdAt">) => void
}

/** Available emoji options for book icons */
const emojis = ["📚", "💡", "🎨", "✨", "📝", "⚡", "🎯", "🚀", "💼", "🌟", "🔥", "💎"]
/** Available color options for books with Tailwind color mapping */
const colors: { value: Book["color"]; label: string; class: string }[] = [
  { value: "emerald", label: "Emerald", class: "bg-emerald-500" },
  { value: "blue", label: "Blue", class: "bg-blue-500" },
  { value: "orange", label: "Orange", class: "bg-orange-500" },
  { value: "purple", label: "Purple", class: "bg-violet-500" },
  { value: "pink", label: "Pink", class: "bg-pink-500" },
]

/**
 * CreateBookModal component - Modal dialog for creating new books.
 * Allows users to set title, emoji icon, and color scheme.
 * Form automatically resets on close.
 *
 * @component
 * @param {CreateBookModalProps} props - Component props
 * @returns {React.ReactElement | null} Modal dialog or null when closed
 *
 * @example
 * <CreateBookModal
 *   isOpen={showModal}
 *   onClose={handleClose}
 *   onCreateBook={handleCreateBook}
 * />
 */
export function CreateBookModal({ isOpen, onClose, onCreateBook }: CreateBookModalProps) {
  // Form state for book creation
  const [title, setTitle] = useState("")
  const [emoji, setEmoji] = useState("📚")
  const [color, setColor] = useState<Book["color"]>("emerald")

  /** Validates and submits new book data, then resets form */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onCreateBook({ title: title.trim(), emoji, color })
    setTitle("")
    setEmoji("📚")
    setColor("emerald")
  }

  /** Resets form state and closes modal */
  const handleClose = () => {
    setTitle("")
    setEmoji("📚")
    setColor("emerald")
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="glass-card rounded-2xl p-6 mx-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Create New Book</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="p-2 rounded-xl hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Book Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="e.g., Project Ideas"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
                    autoFocus
                  />
                </div>

                {/* Emoji */}
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <div className="flex flex-wrap gap-2">
                    {emojis.map((e) => (
                      <motion.button
                        key={e}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setEmoji(e)}
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all",
                          emoji === e
                            ? "bg-primary/20 ring-2 ring-primary"
                            : "bg-secondary hover:bg-secondary/80"
                        )}
                      >
                        {e}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c) => (
                      <motion.button
                        key={c.value}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setColor(c.value)}
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                          c.class,
                          color === c.value
                            ? "ring-2 ring-white ring-offset-2 ring-offset-card"
                            : "opacity-60 hover:opacity-100"
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!title.trim()}
                    className="flex-1"
                  >
                    Create Book
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
