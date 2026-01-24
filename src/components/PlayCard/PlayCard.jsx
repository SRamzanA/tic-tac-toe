import { useState, useEffect } from "react"
import "./PlayCard.css"
import PlayerRegister from "../PlayerRegister/PlayerRegister"
import StaticticTable from "../StatisticTable/StatisticTable"

// Крестик
const Cross = () => (
  <div className="cross-container">
    <div className="cross-line cross-line-1"></div>
    <div className="cross-line cross-line-2"></div>
  </div>
)

// Нолик
const Circle = () => (
  <div className="circle-container">
    <div className="circle-outer"></div>
    <div className="circle-inner"></div>
  </div>
)

// Попап после победы
const WinPopup = ({ winner, onClose }) => {
  const [second, setSecond] = useState(3)

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    const secondInterval = setInterval(() => {
      setSecond(prev => prev - 1)
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(secondInterval)
      setSecond(3)
    }
  }, [onClose])

  return (
    <div className="win-popup">
      <h1>{winner} ПОБЕДИЛ</h1>
      <h2>НОВАЯ ИГРА ЧЕРЕЗ {second} СЕКУНДЫ</h2>
    </div>
  )
}

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтальные
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикальные 
  [0, 4, 8], [2, 4, 6]             // диагональные
]

export default function PlayCard() {
  const [grid, setGrid] = useState(Array(9).fill(null)) // клетки [null, null, null, null, null, null, null, null, null]
  const [isXTurn, setIsXTurn] = useState(true) // чей ход (true = x | false - o)
  const [scores, setScores] = useState({ player1: 0, player2: 0 })
  const [playerNames, setPlayerNames] = useState({ player1: "Игрок 1", player2: "Игрок 2" }) // Имена игроков
  const [showWinPopup, setShowWinPopup] = useState(false) // показ попап с победителем
  const [winnerMessage, setWinnerMessage] = useState("") // кто победил

  const [gameActive, setGameActive] = useState(true) // активна ли игра (активны ли кнопки)
  const [activeRenamePopup, setActiveRenamePopup] = useState(true) // активен ли попап ренейма
  const [activeStatisticPopup, setActiveStatisticPopup] = useState(false) // Активна ли таблица со статистикой

  const [generalStatistic, setGeneralStatistic] = useState({}) // Статистика по прошлым игрокам
  const [activePlayersData, setActivePlayersData] = useState({}) // Статистика по действующим игрокам

  // Пара игроков
  // {
  //   "Гриффиндор": {gameWins: 0, played: 1, details: {wins: 2, losses: 3, draw: 2}}
  //   "Экономический": {gameWins: 1, played: 1, details: {wins: 3, losses: 2, draw: 2}}
  // }

  useEffect(() => {
    setGeneralStatistic(JSON.parse(localStorage.getItem("generalStatistic")) || {})
    setActivePlayersData(JSON.parse(localStorage.getItem("activePlayers")) || {})
  }, [])

  const checkWinner = (currentGrid) => {
    for (const line of LINES) {
      const [a, b, c] = line
      if ( // все ли одинаковые и не пустые
        currentGrid[a] &&
        currentGrid[a] === currentGrid[b] &&
        currentGrid[a] === currentGrid[c]
      ) {
        return currentGrid[a] === "X" ? "player1" : "player2"
      }
    }

    // Все ли клетки заполнены
    if (currentGrid.every(cell => cell !== null)) {
      return "draw"
    }

    return null
  }

  const handleCellClick = (index) => {
    // Если клетка уже занята или игра неактивна, игнорируем клик
    if (grid[index] || !gameActive) return

    const newGrid = [...grid]
    newGrid[index] = isXTurn ? "X" : "O"

    setGrid(newGrid)

    const winner = checkWinner(newGrid)

    let data = Object.entries(activePlayersData) // Массив для статистики

    let playerScores = scores

    if (winner) {
      setGameActive(false)

      if (winner === "player1") {
        playerScores.player1 += 1
        data[0][1].details.wins += 1
        data[1][1].details.losses += 1
        setWinnerMessage(playerNames.player1)

      } else if (winner === "player2") {
        playerScores.player2 += 1
        data[1][1].details.wins += 1
        data[0][1].details.losses += 1
        setWinnerMessage(playerNames.player2)

      } else { // if draw
        setWinnerMessage("НИКТО НЕ")
        data[0][1].details.draw += 1
        data[1][1].details.draw += 1
      }

      setScores(playerScores)

      if (playerScores.player1 >= 3 || playerScores.player2 >= 3) {
        if (winner === "player1") {
          data[0][1].gameWins += 1
        } else {
          data[1][1].gameWins += 1
        }
        data[0][1].played += 1
        data[1][1].played += 1

        setActivePlayersData(Object.fromEntries(data))
        setActiveStatisticPopup(true)

        // Сохрание статистики в localStorage
        localStorage.setItem('generalStatistic', JSON.stringify(generalStatistic))
        localStorage.setItem('activePlayers', JSON.stringify(Object.fromEntries(data)))
        return
      }
      setShowWinPopup(true)

    } else { // Смена хода
      setIsXTurn(!isXTurn)
    }
  }

  const resetGrid = () => {
    setGrid(Array(9).fill(null))
    setIsXTurn(true)
    setGameActive(true)
    setShowWinPopup(false)
    setActiveStatisticPopup(false)
  }

  const resetGame = () => {
    resetGrid()
    setScores({ player1: 0, player2: 0 })
    setActiveRenamePopup(true)
  }

  const handleWinPopupClose = () => {
    resetGrid()
  }

  const renderCell = (index) => { // Рендер одной клетки
    const cellValue = grid[index]

    return (
      <div
        key={index}
        className="grid-cell"
        onClick={() => handleCellClick(index)}
      >
        {cellValue === "X" && <Cross />}
        {cellValue === "O" && <Circle />}
      </div> // Если null то пустая клетка
    )
  }

  function renamePlayers(playerName1, playerName2) {
    setPlayerNames({ player1: playerName1, player2: playerName2 })
    setGeneralStatistic(prev => ({ ...activePlayersData, ...prev }))
    setActivePlayersData({
      [playerName1]: { gameWins: 0, played: 0, details: { wins: 0, losses: 0, draw: 0 } },
      [playerName2]: { gameWins: 0, played: 0, details: { wins: 0, losses: 0, draw: 0 } }
    })

  }

  return (
    <div className="play-card">
      <h3 className="counter">
        {activeRenamePopup ? 'Игрок 1' : playerNames.player1} : <span style={{ color: "blue" }}>{scores.player1}</span> |
        {activeRenamePopup ? 'Игрок 2' : playerNames.player2} : <span style={{ color: "red" }}>{scores.player2}</span>
      </h3>

      <div className="turn-indicator">
        Сейчас ходит: {isXTurn ?
          `${activeRenamePopup ? 'Игрок 1' : playerNames.player1} (X)`
          :
          `${activeRenamePopup ? 'Игрок 2' : playerNames.player2} (O)`}
      </div>

      <div className="grid">
        {Array.from({ length: 9 }).map((_, index) => renderCell(index))}
      </div>

      <button className="reset-button" onClick={resetGame}>
        Новая игра
      </button>

      {showWinPopup && (
        <WinPopup
          winner={winnerMessage}
          onClose={handleWinPopupClose}
        />
      )}

      {activeRenamePopup && (
        <PlayerRegister
          activePopup={(value) => setActiveRenamePopup(value)}
          renamePlayers={(playerName1, playerName2) => renamePlayers(playerName1, playerName2)}
        />
      )}

      {activeStatisticPopup && (
        <StaticticTable
          generalStatistic={generalStatistic}
          activePlayersData={activePlayersData}
          newGame={() => resetGame()}
          resetGame={() => {
            resetGrid()
            setScores({ player1: 0, player2: 0 })
          }}
        />
      )}
    </div>
  )
}