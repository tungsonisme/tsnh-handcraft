import * as React from "react"
import styles from "./styles.module.scss"

export interface ISliderProps {
  value?: number
  onChange?: (value: number) => void
  min: number
  max: number
}

const Slider: React.FC<ISliderProps> = ({ value, onChange, min, max }) => {
  const boundRef = React.useRef<{
    x: number
    width: number
  }>()
  const holderRef = React.useRef<HTMLDivElement>(null)
  const bgRef = React.useRef<HTMLDivElement>(null)
  const isMouseDown = React.useRef(false)
  const [left, setLeft] = React.useState(0)
  const [internalValue, setInternalValue] = React.useState(0)

  React.useEffect(() => {
    setLeft(((value ?? 0) / (max - min)) * 100)
    setInternalValue(value ?? 0)

    const handleMouseDown = () => {
      isMouseDown.current = true
      boundRef.current = bgRef.current?.getBoundingClientRect() as {
        x: number
        width: number
      }
    }

    const handleMouseUp = () => {
      if (isMouseDown.current === true) {
        setInternalValue((internalValue) => {
          onChange?.(internalValue)
          return internalValue
        })
      }
      isMouseDown.current = false
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (isMouseDown.current) {
        const { x = 0, width = 0 } = boundRef.current ?? {}
        const { pageX } = event

        if (pageX >= x && pageX <= x + width) {
          const left = pageX - x - 4
          const newValue = Math.ceil((left / width) * (max - min))
          setLeft(Math.ceil((left / width) * 100))
          setInternalValue(newValue)
        }
      }
    }

    holderRef.current?.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      holderRef.current?.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleBgClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const { x = 0, width = 0 } = bgRef.current?.getBoundingClientRect() as {
      x: number
      width: number
    }
    const { pageX } = e

    if (pageX >= x && pageX <= x + width) {
      const left = pageX - x - 4
      const newValue = Math.ceil((left / width) * (max - min))
      setLeft(Math.ceil((left / width) * 100))
      setInternalValue(newValue)
      onChange?.(newValue)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div ref={bgRef} className={styles.bg} onClick={handleBgClick} />

      <div ref={holderRef} className={styles.holder} style={{ left: `${left}%` }}>
        <div className={styles.circle} />
      </div>

      <div className={styles.value} style={{ left: `${left}%` }}>
        {internalValue}
      </div>
    </div>
  )
}

export default Slider
