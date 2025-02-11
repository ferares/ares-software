"use client"

import { type Dispatch, type SetStateAction, createContext, useContext, useState } from "react"

declare type ContextProps = {
  setMessage: Dispatch<SetStateAction<string | undefined>>
  message?: string
}

const ScreenReaderContext = createContext<ContextProps>({ setMessage: () => null, message: undefined })
 
export function ScreenReaderProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | undefined>()

  const value = { message, setMessage }

  return <ScreenReaderContext.Provider value={value}>{children}</ScreenReaderContext.Provider>
}

export const useScreenReaderContext = () => useContext(ScreenReaderContext)