export const getWinner = (
  board: (1 | 2)[][],
  size: number
): {
  winner: 1 | 2 | undefined
  winnerCoordinate: boolean[][]
} => {
  const winnerCoordinate = new Array(size)
    .fill(false)
    .map(() => new Array(size).fill(false))

  // check row
  for (let i = 0; i < size; i++) {
    const row = board[i]
    let last = row[0]
    let count = last !== undefined ? 1 : 0
    for (let j = 1; j < size; j++) {
      if (row[j] === last && last !== undefined) {
        count++

        if (count === size) {
          winnerCoordinate[i][j] = true
          winnerCoordinate[i][j - 1] = true
          winnerCoordinate[i][j - 2] = true
          return { winner: last, winnerCoordinate }
        }
      } else {
        count = 0
      }

      last = row[i]
    }
  }

  // check column
  for (let i = 0; i < size; i++) {
    let last = board[0][i]
    let count = last !== undefined ? 1 : 0
    for (let j = 1; j < size; j++) {
      if (board[j][i] === last && last !== undefined) {
        count++

        if (count === size) {
          winnerCoordinate[j][i] = true
          winnerCoordinate[j - 1][i] = true
          winnerCoordinate[j - 2][i] = true
          return { winner: last, winnerCoordinate }
        }
      } else {
        count = 0
      }

      last = board[j][i]
    }
  }

  // check cross
  let last = board[0][0]
  let count = last !== undefined ? 1 : 0
  for (let i = 1; i < size; i++) {
    if (board[i][i] === last) {
      count++

      if (count === size) {
        winnerCoordinate[i][i] = true
        winnerCoordinate[i - 1][i - 1] = true
        winnerCoordinate[i - 2][i - 2] = true
        return { winner: last, winnerCoordinate }
      }
    } else {
      count = 0
    }

    last = board[i][i]
  }

  last = board[0][size - 1]
  count = last !== undefined ? 1 : 0
  for (let i = 1; i < size; i++) {
    if (board[i][size - 1 - i] === last) {
      count++

      if (count === size) {
        winnerCoordinate[i][size - 1 - i] = true
        winnerCoordinate[i - 1][size - i] = true
        winnerCoordinate[i - 2][size + 1 - i] = true
        return { winner: last, winnerCoordinate }
      }
    } else {
      count = 0
    }

    last = board[i][size - 1 - i]
  }

  return { winner: undefined, winnerCoordinate }
}
