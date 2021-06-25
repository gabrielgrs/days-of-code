import { useState, useEffect } from 'react'

const useOnScreen = (ref, reload) => {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {}, [])

  useEffect(() => {
    if (ref?.current) {
      const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting))

      observer.observe(ref.current)
      return () => observer.disconnect()
    }
  }, [ref, reload])

  return isIntersecting
}

export default useOnScreen
