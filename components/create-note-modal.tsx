"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus } from "lucide-react"
import type { Note } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface CreateNoteModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateNote: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void
}

export function CreateNoteModal({ isOpen, onClose, onCreateNote }: CreateNoteModalProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [pinned, setPinned] = useState(false)

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase()
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    onCreateNote({
      title: title.trim(),
      content: content.trim(),
      tags,
      pinned,
    })

    setTitle("")
    setContent("")
    setTags([])
    setPinned(false)
  }

  const handleClose = () => {
    setTitle("")
    setContent("")
    setTags([])
    setPinned(false)
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50"
          >
            <div className="glass-card rounded-2xl p-6 mx-4 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Create New Note</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="p-2 rounded-xl hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="noteTitle">Title</Label>
                  <Input
                    id="noteTitle"
                    type="text"
                    placeholder="Note title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
                    autoFocus
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="noteContent">Content</Label>
                  <Textarea
                    id="noteContent"
                    placeholder="Write your note..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary min-h-[120px] resize-none"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Add a tag..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary flex-1"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleAddTag}
                      disabled={!tagInput.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <motion.span
                          key={tag}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm flex items-center gap-1"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-primary/70"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pin toggle */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPinned(!pinned)}
                    className={cn(
                      "w-11 h-6 rounded-full transition-colors relative",
                      pinned ? "bg-primary" : "bg-secondary"
                    )}
                  >
                    <motion.div
                      animate={{ x: pinned ? 20 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-white"
                    />
                  </button>
                  <Label className="cursor-pointer" onClick={() => setPinned(!pinned)}>
                    Pin this note
                  </Label>
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
                    disabled={!title.trim() || !content.trim()}
                    className="flex-1"
                  >
                    Create Note
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
