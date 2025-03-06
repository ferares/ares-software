"use client"

import { type MouseEvent as ReactMouseEvent, useCallback, useEffect, useRef } from "react"

import Link from "next/link"

import { useTranslations } from "next-intl"

import { type  TranslationKey } from "@/i18n/request"

import { scrollIntoView } from "@/helpers/scroll"

import { useCallOnEscContext } from "@/context/callOnEsc"
import { useMenuContext } from "@/context/menu"

const links: { label: TranslationKey, target: string }[] = [
  { label: "Sections.About.title", target: "#about" },
  { label: "Labels.projects", target: "#projects" },
  { label: "Sections.Contact.title", target: "#contact" },
  { label: "Sections.Technologies.title", target: "#technologies" },
]

function Menu() {
  const ref = useRef<HTMLUListElement>(null)
  const { pushCallOnEsc, removeCallOnEsc } = useCallOnEscContext()
  const { setOpen, open } = useMenuContext()
  const t = useTranslations()

  const close = useCallback(() => setOpen(false), [setOpen])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!open) return
    const target = event.target as HTMLElement
    const clickOnMenuBtn = document.querySelector("[aria-controls='main-menu']")?.contains(target)
    if (ref.current && !ref.current.contains(target) && !clickOnMenuBtn) close()
  }, [open, close])
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [handleClickOutside])

  useEffect(() => {
    if (open) {
      pushCallOnEsc(close)
    } else {
      removeCallOnEsc(close)
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => removeCallOnEsc(close)
  }, [open, close, handleClickOutside, pushCallOnEsc, removeCallOnEsc])

  const handleClick = useCallback((event: ReactMouseEvent, target: string) => {
    event.preventDefault()
    scrollIntoView(target)
    close()
  }, [close])

  return (
    <div className="menu-wrapper">
      <nav id="main-menu" className={`menu ${open ? "show" : ""}`} aria-label={t("Labels.menu")}>
        <ul ref={ref} className="menu__content">
          {links.map((link, index) => {
            return (
              <li key={index}>
                <Link href={link.target} className="menu__link" onClick={(event) => handleClick(event, link.target)}>
                  { t(link.label) }
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Menu