import * as React from "react"
import styles from "./styles.module.scss"

export interface ICarouselProps {
  contents: {
    key: string
    content: React.ReactNode
  }[]
}

const SPEED = 1

const Carousel: React.FC<ICarouselProps> = ({ contents }) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const isMouseDown = React.useRef(false)
  const [x, setX] = React.useState(0)

  React.useEffect(() => {
    const handleMouseDown = () => {
      isMouseDown.current = true
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isMouseDown.current) {
        setX((currentX) => currentX + e.movementX * SPEED)
      }
    }

    const handleMouseUp = () => {
      isMouseDown.current = false

      setX((currentX) => {
        const { width } = wrapperRef.current?.getBoundingClientRect() as {
          width: number
        }

        return (
          Math.min(
            Math.max(Math.round(currentX / width), -(contents.length - 1)),
            0
          ) * width
        )
      })
    }

    wrapperRef.current?.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      wrapperRef.current?.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  const handleLeftClick = () => {
    const { width } = wrapperRef.current?.getBoundingClientRect() as {
      width: number
    }
    setX((currentX) => currentX + width)
  }

  const handleRightClick = () => {
    const { width } = wrapperRef.current?.getBoundingClientRect() as {
      width: number
    }
    setX((currentX) => currentX - width)
  }

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {contents.map((item) => (
        <div
          className={styles.item}
          key={item.key}
          style={{
            transform: `translateX(${x}px)`,
            transitionDuration: isMouseDown.current ? "0ms" : "500ms",
          }}
        >
          {item.content}
        </div>
      ))}
      <div className={styles.left} onClick={handleLeftClick}>
        Left
      </div>
      <div className={styles.right} onClick={handleRightClick}>
        Right
      </div>
    </div>
  )
}

export default Carousel
