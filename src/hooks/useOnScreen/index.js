import { useState, useEffect } from 'react'

const useOnScreen = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    if (ref?.current) {
      const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting))

      observer.observe(ref.current)
      return () => observer.disconnect()
    }
  }, [ref])

  return isIntersecting
}

export default useOnScreen
