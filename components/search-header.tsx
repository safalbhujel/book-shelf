"use client"

import { useState } from "react"
import { Search, Bell, Menu, X, Sparkles, Home, BookOpen, Star, Clock, Tags, FolderOpen, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

/**
 * Props for the SearchHeader component.
 * @typedef {Object} SearchHeaderProps
 * @property {string} searchQuery - Current search query value
 * @property {(query: string) => void} onSearchChange - Callback when search input changes
 */
interface SearchHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

/** Navigation menu items displayed on mobile menu */
const navItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BookOpen, label: "All Books", active: false },
  { icon: Star, label: "Favorites", active: false },
  { icon: Clock, label: "Recent", active: false },
  { icon: Tags, label: "Tags", active: false },
  { icon: FolderOpen, label: "Archive", active: false },
]

/**
 * SearchHeader component - Top header with search functionality and user menu.
 * Includes responsive mobile menu, notifications, and user profile.
 * Adapts layout based on viewport size (md breakpoint).
 *
 * @component
 * @param {SearchHeaderProps} props - Component props
 * @returns {React.ReactElement} Header with search and navigation
 *
 * @example
 * <SearchHeader
 *   searchQuery={query}
 *   onSearchChange={handleSearchChange}
 * />
 */
export function SearchHeader({ searchQuery, onSearchChange }: SearchHeaderProps) {
  // Mobile menu state for responsive navigation
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm"
      >
        {/* Mobile menu button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-xl hover:bg-secondary transition-colors mr-2"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </motion.button>

        {/* Logo on mobile */}
        <div className="md:hidden flex items-center gap-2 mr-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search books and notes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary h-10"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-4 ml-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-xl hover:bg-secondary transition-colors"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 p-1.5 md:pr-4 rounded-full bg-secondary cursor-pointer"
          >
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary/20 text-primary text-sm font-medium">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">John Doe</p>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-sidebar z-50 md:hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-foreground">My Notes</h1>
                    <p className="text-xs text-muted-foreground">Digital Library</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-3 py-4">
                <div className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        item.active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                      {item.active && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </nav>

              {/* Storage info */}
              <div className="p-4 mx-3 mb-4 rounded-xl glass-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">Storage</span>
                  <span className="text-xs text-muted-foreground">2.4 GB / 5 GB</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "48%" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>
              </div>

              {/* Settings */}
              <div className="p-3 border-t border-sidebar-border">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
