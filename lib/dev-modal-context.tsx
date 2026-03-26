"use client"

import { createContext, useContext, useState, useEffect, useRef, useCallback, type ReactNode } from "react"
import { DevModal } from "@/components/dev-modal"

interface DevModalContextType {
  showModal: () => void
}

const DevModalContext = createContext<DevModalContextType | undefined>(undefined)

export function DevModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const initialRef = useRef(false)

  const showModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    // Popup com delay de 3 segundos na primeira abertura
    if (!initialRef.current) {
      initialRef.current = true
      const timeout = setTimeout(() => {
        setIsOpen(true)
      }, 3000)

      // Loop a cada 5 minutos
      intervalRef.current = setInterval(() => {
        setIsOpen(true)
      }, 5 * 60 * 1000)

      return () => {
        clearTimeout(timeout)
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }
  }, [])

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
