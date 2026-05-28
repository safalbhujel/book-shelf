"use client"

import { motion } from "framer-motion"
import { 
  BookOpen, 
  Home, 
  Star, 
  Clock, 
  Settings, 
  Sparkles,
  FolderOpen,
  Tags
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BookOpen, label: "All Books", active: false },
  { icon: Star, label: "Favorites", active: false },
  { icon: Clock, label: "Recent", active: false },
  { icon: Tags, label: "Tags", active: false },
  { icon: FolderOpen, label: "Archive", active: false },
]

export function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="hidden md:flex w-64 h-screen bg-sidebar border-r border-sidebar-border flex-col"
    >
      {/* Logo */}
      <div className="p-6">
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">My Notes</h1>
            <p className="text-xs text-muted-foreground">Digital Library</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {navItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ x: 4 }}
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
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                />
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
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          />
        </div>
      </div>

      {/* Settings */}
      <div className="p-3 border-t border-sidebar-border">
        <motion.button
          whileHover={{ x: 4 }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
        >
          <Settings className="w-5 h-5" />
          Settings
        </motion.button>
      </div>
    </motion.aside>
  )
}
