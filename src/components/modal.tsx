"use client"

import { type MouseEvent, type PropsWithChildren, useCallback, useEffect, useRef, useState } from "react"

import { useCallOnEscContext } from "@/context/CallOnEsc"
import Image from "next/image"

export interface ModalProps {
  id: string
  className?: string
  title?: string
  open: boolean
  onClose: () => void
  labelledBy: string
}

export default function Modal({ id, className, open, onClose, title, children, labelledBy }: PropsWithChildren<ModalProps>) {
  const { pushCallOnEsc, removeCallOnEsc } = useCallOnEscContext()
  const [hiding, setHiding] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Show closing animation before closing
  const startClosing = useCallback(() => setHiding(true), [])

  // Close after closing animation
  const handleClose = useCallback(() => {
    if (!hiding) return
    onClose()
    dialogRef.current?.close()
    setHiding(false)
  }, [hiding, onClose])

  // Open modal when open prop updates
  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal()
      pushCallOnEsc(startClosing)
    } else {
      if (dialogRef.current?.open) startClosing()
      else removeCallOnEsc(startClosing)
    }
  }, [open, pushCallOnEsc, removeCallOnEsc, startClosing])

  // Close the modal on backdrop click
  const onClick = useCallback((event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) setHiding(true)
  }, [])

  return (
    <dialog ref={dialogRef} onClick={onClick} className={`modal ${hiding ? "hide" : (open ? "show" : "")} ${className}`} aria-labelledby={labelledBy} onTransitionEnd={handleClose}>
      <div className="modal-content">
        <div className="modal-header">
          {title && (
            <h3 id={`modal-${id}-title`}>
              {title}
            </h3>
          )}
          <button type="button" className="modal-close" aria-label="Close" onClick={startClosing}>
            <Image src="/icons/close.svg" alt="" width={25} height={25} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </dialog>
  )
}
