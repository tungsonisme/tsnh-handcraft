import * as React from "react"
import clsx from "../../utils/clsx"
import Board from "../Board"
import { BOX_WIDTH } from "./constants"
import styles from "./styles.module.scss"
import { getWinner } from "./utils"

export interface ITicTacToeProps {
  size?: number
}

const TicTacToe: React.FC<ITicTacToeProps> = ({ size = 3 }) => {
  const [turn, setTurn] = React.useState<1 | 2>(1)
  const [board, setBoard] = React.useState<(1 | 2)[][]>(() => {
    return new Array(size).fill(undefined).map(() => new Array(size).fill(undefined))
  })

  const { winner, winnerCoordinate } = getWinner(board, size)

  const boardRenderValue: React.ReactNode[][] = []
  board.forEach((row, rowIndex) => {
    boardRenderValue.push(
      row.map((item, colIndex) => {
        if (item === undefined) {
          return undefined
        }

        return (
          <div
            className={clsx(
              styles.wrapper,
              (() => {
                if (!winner) {
                  return undefined
                }

                if (winnerCoordinate[rowIndex][colIndex]) {
                  return winner === 1 ? styles.winner1 : styles.winner2
                }
              })()
            )}
            style={{ width: BOX_WIDTH, height: BOX_WIDTH }}
            key={colIndex}
          >
            {item === 1 ? (
              <div className={styles.round} />
            ) : (
              <div className={styles.cross}>
                <div />
                <div />
              </div>
            )}
          </div>
        )
      })
    )
  })

  return (
    <div>
      <Board
        value={boardRenderValue}
        size={size}
        boxWidth={BOX_WIDTH}
        onClick={(row, col) => {
          if (winner || board[row][col]) {
            return
          }

          setBoard((board) => {
            board[row][col] = turn
            return [...board]
          })

          setTurn(turn == 1 ? 2 : 1)
        }}
        primaryColor="white"
        secondaryColor="white"
      />

      <div style={{ marginTop: 10 }}>
        {winner ? `Player ${winner} wins` : `Player ${turn} turn`}
      </div>
    </div>
  )
}

export default TicTacToe
