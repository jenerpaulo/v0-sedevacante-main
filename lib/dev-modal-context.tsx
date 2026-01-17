"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { DevModal } from "@/components/dev-modal"

interface DevModalContextType {
  showModal: () => void
}

const DevModalContext = createContext<DevModalContextType | undefined>(undefined)

export function DevModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const showModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <DevModalContext.Provider value={{ showModal }}>
      {children}
      <DevModal isOpen={isOpen} onClose={closeModal} />
    </DevModalContext.Provider>
  )
}

export function useDevModal() {
  const context = useContext(DevModalContext)
  if (!context) {
    throw new Error("useDevModal must be used within DevModalProvider")
  }
  return context
}
