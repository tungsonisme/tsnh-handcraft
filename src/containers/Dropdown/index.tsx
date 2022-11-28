import * as React from "react"
import styles from "./styles.module.scss"

export interface IDropdownProps {
  dropdown?: React.ReactNode
  trigger?: "hover" | "click"
}

const Dropdown: React.FC<IDropdownProps> = ({
  dropdown,
  trigger = "click",
  children,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const [dropdownShow, setDropdownShow] = React.useState(false)

  React.useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setDropdownShow(false)
      }
    }

    document.addEventListener(
      trigger === "click" ? "click" : "mousemove",
      handleDocumentClick
    )
    return () => {
      document.removeEventListener(
        trigger === "click" ? "click" : "mousemove",
        handleDocumentClick
      )
    }
  }, [])

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div
        className={styles.content}
        onClick={() => {
          if (trigger === "click") {
            setDropdownShow(true)
          }
        }}
        onMouseEnter={() => {
          if (trigger === "hover") {
            setDropdownShow(true)
          }
        }}
      >
        {children}
      </div>

      {dropdown && (
        <div
          className={styles.dropdown}
          style={dropdownShow ? { visibility: "visible", opacity: 1 } : undefined}
          onClick={() => setDropdownShow(false)}
        >
          {dropdown}
        </div>
      )}
    </div>
  )
}

export default Dropdown
