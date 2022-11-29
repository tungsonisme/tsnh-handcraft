import * as React from "react"
import styles from "./styles.module.scss"
import { DnDList } from "./types"

export interface IDragAndDropProps {
  list: DnDList
  onDragEnd?: (list: DnDList) => void
}

const DragAndDrop: React.FC<IDragAndDropProps> = ({ list, onDragEnd }) => {
  const itemRef = React.useRef<Record<string, HTMLDivElement>>({})
  const [draggingKey, setDraggingKey] = React.useState<string>()
  const [draggingStyle, setDraggingStyle] = React.useState<{
    left: number
    top: number
    width: number
    height: number
  }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })
  const [simulatedList, setSimulatedList] = React.useState<DnDList>()

  const handleMouseUp = () => {
    onDragEnd?.(
      simulatedList?.map((simulatedItem) =>
        list.find((item) => item.key === simulatedItem.key)
      )
    )
    setDraggingKey(undefined)
    setSimulatedList(undefined)
  }

  const handleDocumentMouseMove = (e: MouseEvent) => {
    if (!draggingKey) {
      return
    }

    const { movementX, movementY } = e

    setDraggingStyle((currentStyle) => ({
      ...currentStyle,
      left: currentStyle?.left + movementX,
      top: currentStyle?.top + movementY,
    }))

    const newSimulatedList: DnDList = []

    const pushFakeItem = () => {
      newSimulatedList.push({
        key: draggingKey ?? "",
        content: (
          <>
            {list.find((item) => item.key === draggingKey)?.content}
            <div className={styles.cover} />
          </>
        ),
      })
    }

    let added = false
    list
      .filter((item) => item.key !== draggingKey)
      .reverse()
      .forEach((item) => {
        if (!added) {
          const { y, height } = itemRef.current?.[item.key].getBoundingClientRect()

          if (draggingStyle.top > y + height / 2) {
            added = true
            pushFakeItem()
          }
        }

        newSimulatedList.push(item)
      })

    if (!added) {
      pushFakeItem()
    }

    setSimulatedList(newSimulatedList.reverse())
  }

  React.useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleDocumentMouseMove)

    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", handleDocumentMouseMove)
    }
  }, [handleMouseUp, handleDocumentMouseMove])

  return (
    <div>
      <div>
        {(draggingKey ? simulatedList ?? [] : list)?.map(({ key, content }) => (
          <div
            ref={(ref) => (itemRef.current[key] = ref)}
            key={key}
            className={styles.item}
            onMouseDown={(e) => {
              setSimulatedList([...list])
              setDraggingKey(key)

              const { x, y, width, height } = (
                e.target as HTMLDivElement
              ).getBoundingClientRect()
              setDraggingStyle({
                left: x,
                top: y,
                width,
                height,
              })
            }}
          >
            {content}
          </div>
        ))}
      </div>

      {draggingKey && (
        <div className={styles.freeItem} style={draggingStyle}>
          {list.find((item) => item.key === draggingKey)?.content}
        </div>
      )}
    </div>
  )
}

export default DragAndDrop
