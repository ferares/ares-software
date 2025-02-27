"use client"

import { type ComponentProps, type RefObject, useCallback, useEffect, useRef } from "react"

import { useCallOnEscContext } from "@/context/callOnEsc"

export interface DropdownProps extends Omit<ComponentProps<"div">, "className"> {
  open: boolean
  togglerRef: RefObject<HTMLElement | null>,
  onOpen?: () => void
  onClose?: () => void
}

export default function Dropdown({ children, open, onOpen, onClose, togglerRef, ...props }: DropdownProps) {
  const { pushCallOnEsc, removeCallOnEsc } = useCallOnEscContext()
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!open) return
    const target = event.target as HTMLElement
    if (ref.current && !ref.current.contains(target) && togglerRef.current && (!togglerRef.current.contains(target))) onClose?.()
  }, [onClose, togglerRef, open])
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose, handleClickOutside])

  useEffect(() => {
    if (open) {
      if (onClose) pushCallOnEsc(onClose)
    } else {
      if (onClose) removeCallOnEsc(onClose)
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => onClose && removeCallOnEsc(onClose)
  }, [open, onClose, onOpen, handleClickOutside, pushCallOnEsc, removeCallOnEsc])
  
  return (
    <div ref={ref} className={`dropdown-menu ${open ? "show" : ""}`} role="" aria-hidden={!open} {...props}>
      {children}
    </div>
  )
}