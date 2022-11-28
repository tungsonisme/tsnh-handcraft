import * as React from "react"
import styles from "./styles.module.scss"

interface IColumnBase {
  title: React.ReactNode
  width?: number
  fixed?: "left"
}

interface IColumnWithDataIndex<T = any> extends IColumnBase {
  dataIndex: string
  render?: (data: any, record?: T) => JSX.Element | string
}

interface IColumnWithoutDataIndex<T = any> extends IColumnBase {
  render: (record: T) => JSX.Element | string
}

export type Column<T> = IColumnWithoutDataIndex<T> | IColumnWithDataIndex<T>

export interface ITableProps<T = any> {
  columns: Column<T>[]
  dataSource?: T[]
  stickyHeader?: number
}

const Table = <T extends any>({
  columns,
  dataSource,
  stickyHeader = 0,
}: ITableProps<T>): JSX.Element => {
  const headerRef = React.useRef<HTMLDivElement>(null)
  const bodyRef = React.useRef<HTMLDivElement>(null)
  const fixedLeftRef = React.useRef<HTMLDivElement>(null)

  const leftColumns: Column<T>[] = []
  let allowAddLeftColumns = false
  columns.forEach((column, index) => {
    if (index === 0 && column.fixed === "left") {
      allowAddLeftColumns = true
    }

    if (allowAddLeftColumns && column.fixed === "left") {
      leftColumns.push(column)
    }
  })

  React.useEffect(() => {
    const handleBodyScroll = () => {
      headerRef.current?.scrollTo(bodyRef.current?.scrollLeft as number, 0)
    }

    bodyRef.current?.addEventListener("scroll", handleBodyScroll)

    return () => {
      bodyRef.current?.removeEventListener("scroll", handleBodyScroll)
    }
  }, [])

  const renderColumn = (columns: Column<T>[]) => {
    const gridColumns = columns.map(({ width }) => (width ? `${width}px` : "1fr"))
    if (
      leftColumns.length === 0 &&
      columns.filter((width) => width).length === columns.length
    ) {
      gridColumns[gridColumns.length - 1] = "1fr"
    }
    const gridTemplateColumns = gridColumns.join(" ")

    return (
      <div className={stickyHeader ? styles.stickyHeaderTable : undefined}>
        <div ref={headerRef} className={styles.header}>
          <div className={styles.headerRow} style={{ gridTemplateColumns }}>
            {columns.map(({ title }, index) => (
              <div key={index} className={styles.headerRowCol}>
                {title}
              </div>
            ))}
          </div>
        </div>

        <div
          ref={bodyRef}
          className={styles.body}
          style={stickyHeader ? { height: stickyHeader } : undefined}
        >
          {dataSource?.map((data, index) => (
            <div key={index} className={styles.row} style={{ gridTemplateColumns }}>
              {columns.map((col, index) => (
                <div key={index} className={styles.rowCol}>
                  {(() => {
                    if ((col as IColumnWithDataIndex<T>).dataIndex) {
                      const { render, dataIndex } = col as IColumnWithDataIndex<T>

                      if (render) {
                        return render((data as Record<string, any>)[dataIndex], data)
                      } else {
                        return (data as Record<string, any>)[dataIndex]
                      }
                    } else {
                      const { render } = col as IColumnWithoutDataIndex<T>
                      return render(data)
                    }
                  })()}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div ref={fixedLeftRef} className={styles.fixedLeft}>
        {renderColumn(leftColumns)}
      </div>
      <div
        className={leftColumns.length > 0 ? styles.tableWithFixedLeft : undefined}
      >
        {renderColumn(columns)}
      </div>
    </div>
  )
}

export default Table
