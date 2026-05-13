"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"

import AlertComponent from "@/components/alert"
import ScreenReaderAlert from "@/components/screenReaderAlert"

const DEFAULT_TIMEOUT = 5000

// This is to ensure every alert is unique so they always trigger a re-render
// even if two content-identical alerts are triggered on after the other
let alertId = 0

export type AlertType = "info" | "success" | "danger"

export type Alert = {
  id: number
  type: AlertType
  content: string
  timeout: number
}

type ScreenReaderAlert = {
  id: number
  type: "off" | "assertive" | "polite"
  content: string
  timeout: number
}

declare type AlertsContextProps = {
  pushAlert: (type: Alert["type"], content: string, timeout?: number) => void,
  pushScreenReaderAlert: (type: ScreenReaderAlert["type"], content: string) => void,
}

const AlertsContext = createContext<AlertsContextProps>({
  pushAlert: () => null,
  pushScreenReaderAlert: () => null,
})

export function AlertsProvider({ children }: { children: React.ReactNode }) {
  // Visible alerts
  const [alerts, setAlerts] = useState<Alert[]>([])
  // Screen reader alerts
  const [screenReaderAlerts, setScreenReaderAlerts] = useState<ScreenReaderAlert[]>([])
  const currentScreenReaderTimeout = useRef<NodeJS.Timeout | null>(null)

  const currentAlert = alerts[0]
  const currentScreenReaderAlert = screenReaderAlerts[0]

  // Visible alerts
  const pushAlert = useCallback((type: Alert["type"], content: string, timeout?: number) => {
    const newAlert: Alert = { id: alertId++, type, content, timeout: timeout ?? DEFAULT_TIMEOUT }
    setAlerts((prevAlerts) => [...prevAlerts, newAlert])
  }, [])

  const removeAlert = useCallback(() => setAlerts((prevAlerts) => prevAlerts.slice(1)), [])

  // Screen reader alerts
  const pushScreenReaderAlert = useCallback((type: ScreenReaderAlert["type"], content: string) => {
    console.log("pushScreenReaderAlert", content)
    const newScreenReaderAlert: ScreenReaderAlert = { id: alertId++, type, content, timeout: 500 }
    setScreenReaderAlerts((prevAlerts) => [...prevAlerts, newScreenReaderAlert])
  }, [])

  const removeScreenReaderAlert = useCallback(() => {
    if (currentScreenReaderTimeout.current) {
      clearTimeout(currentScreenReaderTimeout.current)
    }
    currentScreenReaderTimeout.current = null
    setScreenReaderAlerts((prevAlerts) => prevAlerts.slice(1))
  }, [])

  useEffect(() => {
    if (currentScreenReaderAlert && !currentScreenReaderTimeout.current) {
      currentScreenReaderTimeout.current = setTimeout(
        removeScreenReaderAlert,
        currentScreenReaderAlert.timeout
      )
    }
  }, [currentScreenReaderAlert, removeScreenReaderAlert])
  
  const value = { pushAlert, pushScreenReaderAlert }
  return (
    <AlertsContext.Provider value={value}>
      {children}
      {currentAlert && (
        <AlertComponent timeout={currentAlert.timeout} removeAlert={removeAlert} type={currentAlert.type} key={currentAlert.id}>
          {currentAlert.content}
        </AlertComponent>
      )}
      {currentScreenReaderAlert && (
        <ScreenReaderAlert type={currentScreenReaderAlert.type} key={currentScreenReaderAlert.id}>
          {currentScreenReaderAlert.content}
        </ScreenReaderAlert>
      )}
    </AlertsContext.Provider>
  )
}

export const useAlertsContext = () => useContext(AlertsContext)
