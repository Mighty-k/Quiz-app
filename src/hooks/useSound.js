import { useCallback, useRef } from 'react'

const useSound = () => {
  const audioContextRef = useRef(null)

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return audioContextRef.current
  }

  const playTone = useCallback((frequency, duration, type = 'sine') => {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + duration)
  }, [])

  const playCorrect = useCallback(() => {
    playTone(523.25, 0.1, 'sine')
    setTimeout(() => playTone(659.25, 0.1, 'sine'), 100)
    setTimeout(() => playTone(783.99, 0.15, 'sine'), 200)
  }, [playTone])

  const playIncorrect = useCallback(() => {
    playTone(200, 0.2, 'sawtooth')
  }, [playTone])

  const playTick = useCallback(() => {
    playTone(800, 0.05, 'square')
  }, [playTone])

  const playComplete = useCallback(() => {
    playTone(523.25, 0.1, 'sine')
    setTimeout(() => playTone(659.25, 0.1, 'sine'), 100)
    setTimeout(() => playTone(783.99, 0.1, 'sine'), 200)
    setTimeout(() => playTone(1046.50, 0.2, 'sine'), 300)
  }, [playTone])

  const playWarning = useCallback(() => {
    playTone(440, 0.15, 'triangle')
  }, [playTone])

  return { playCorrect, playIncorrect, playTick, playComplete, playWarning }
}

export default useSound