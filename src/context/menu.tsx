"use client"

import { createContext, type Dispatch, type SetStateAction, useCallback, useContext, useState } from "react"

declare type MenuContextProps = {
  setOpen: Dispatch<SetStateAction<boolean>>,
  toggleMenu: () => void,
  open: boolean,
}

const MenuContext = createContext<MenuContextProps>({
  setOpen: () => null,
  toggleMenu: () => null,
  open: false,
})

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false)
  const toggleMenu = useCallback(() => setOpen((current) => !current), [])
  const value = { setOpen, toggleMenu, open }
  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenuContext = () => useContext(MenuContext)
