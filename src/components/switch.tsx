"use client"

import { useCallback, useEffect, useRef } from "react"

import { type IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface SwitchProps {
  className?: string,
  ariaLabel: string,
  leftIcon: IconDefinition,
  rightIcon: IconDefinition,
  onChange: () => void,
  state: "left" | "right",
}

function Switch({ className, ariaLabel, leftIcon, rightIcon, onChange, state }: SwitchProps) {
  const btnRef = useRef<HTMLButtonElement>(null)
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (
      ((event.key === "ArrowLeft") && (state === "right")) ||
      ((event.key === "ArrowRight") && (state === "left"))
    ) {
      onChange()
    }
  }, [onChange, state])

  useEffect(() => {
    const btnElement = btnRef.current
    btnElement?.addEventListener("keydown", handleKeyDown)
    return () => btnElement?.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown, btnRef])

  return (
    <button ref={btnRef} type="button" className={`switch ${className}`} onClick={onChange} aria-label={ariaLabel}>
      <span className={`switch__indicator switch__indicator--${state}`}>
        {state === "right" ? <FontAwesomeIcon icon={rightIcon} /> : <FontAwesomeIcon icon={leftIcon} />}
      </span>
    </button>
  )
}

export default Switch