import { useEffect, useState } from "preact/hooks"

// Custom hook
export const useTimer = () => {
  const startTime = 0

  const [paused, setPaused] = useState<boolean>(false)

  const [timer, setTimer] = useState<number>(0)
  useEffect(() => {
    let interval = setInterval(() => {
      if (paused) return
      setTimer((currTime) => currTime + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  function resetTimer() {
    setTimer(startTime)
    setPaused(false)
  }

  function pauseTimer() {
    setPaused(true)
  }

  return [timer, resetTimer, pauseTimer] as const
}
