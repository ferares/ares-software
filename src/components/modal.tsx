"use client"

import { type MouseEvent, type PropsWithChildren, useCallback, useEffect, useRef, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { useCallOnEscContext } from "@/context/callOnEsc"
import { useTranslations } from "next-intl"

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
  const t = useTranslations("Labels")

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
      <div className="modal__content">
        <button type="button" className="modal__close" aria-label={t("close")} onClick={startClosing}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="modal__header">
          {title && (
            <h2 className="modal__title" id={`modal-${id}-title`}>
              {title}
            </h2>
          )}
        </div>
        <div className="modal__body">
          {children}
        </div>
      </div>
    </dialog>
  )
}
