import * as React from "react"
import clsx from "../../utils/clsx"
import styles from "./styles.module.scss"

export interface IBoardProps {
  value?: React.ReactNode[][]
  size: number
  boxWidth: number
  onClick?: (row: number, col: number) => React.ReactNode
  primaryColor?: string
  secondaryColor?: string
}

const Board: React.FC<IBoardProps> = ({
  value,
  size,
  boxWidth,
  onClick,
  primaryColor,
  secondaryColor,
}) => {
  const array = new Array(size).fill(size)
  const gridTemplate = array.map(() => `${boxWidth}px`).join(" ")

  return (
    <div
      className={styles.wrapper}
      style={{ gridTemplateColumns: gridTemplate, gridTemplateRows: gridTemplate }}
    >
      {array.map((_, rowIndex) =>
        array.map((_, colIndex) => {
          let bgStyle
          let style
          if (rowIndex % 2 === 1) {
            bgStyle = colIndex % 2 === 0 ? styles.whiteBox : styles.blackBox
            style =
              colIndex % 2 === 0
                ? { background: primaryColor }
                : { background: secondaryColor }
          } else {
            bgStyle = colIndex % 2 === 1 ? styles.whiteBox : styles.blackBox
            style =
              colIndex % 2 === 1
                ? { background: secondaryColor }
                : { background: secondaryColor }
          }

          return (
            <div
              key={colIndex}
              className={clsx(styles.box, bgStyle)}
              style={style}
              onClick={() => {
                onClick?.(rowIndex, colIndex)
              }}
            >
              {value?.[rowIndex]?.[colIndex]}
            </div>
          )
        })
      )}
    </div>
  )
}

export default Board
