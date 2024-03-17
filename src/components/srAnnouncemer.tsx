'use client'

import { useScreenReaderContext } from '@/context/screenReader'

function SRAnnouncer() {
  const { message } = useScreenReaderContext()
  
  return (
    <div className="visually-hidden" aria-live="polite" aria-atomic="true">
      {message}
    </div>
  )
}

export default SRAnnouncer