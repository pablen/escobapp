import React from 'react'

import styles from './ScoreBoard.module.css'

const ScoreBoard: React.FC<Props> = ({
  playerStackLength,
  aiStackLength,
  playerSweeps,
  playerPoints,
  aiPoints,
  aiSweeps,
}) => (
  <table className={styles.container}>
    <thead>
      <tr>
        <th className={styles.header} />
        <th className={styles.header}>Vos</th>
        <th className={styles.header}>
          <span className="visuallyHidden">Máquina</span>🤖
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Por cartas acumuladas</td>
        <td>
          <span data-testid="playerPointsByCards">
            {playerStackLength > aiStackLength ? '1' : '0'}
          </span>{' '}
          <span className={styles.cardsAmount}>
            ({playerStackLength} cartas)
          </span>
        </td>
        <td>
          <span data-testid="aiPointsByCards">
            {playerStackLength < aiStackLength ? '1' : '0'}
          </span>{' '}
          <span className={styles.cardsAmount}>({aiStackLength} cartas)</span>
        </td>
      </tr>
      <tr>
        <td>Por escobas</td>
        <td data-testid="playerPointsBySweeps">{playerSweeps}</td>
        <td data-testid="aiPointsBySweeps">{aiSweeps}</td>
      </tr>
      <tr>
        <td>Puntos</td>
        <td
          data-testid="playerPointsTotal"
          className={playerPoints > aiPoints ? styles.win : styles.loose}
        >
          {playerPoints}
        </td>
        <td
          data-testid="aiPointsTotal"
          className={playerPoints < aiPoints ? styles.win : styles.loose}
        >
          {aiPoints}
        </td>
      </tr>
    </tbody>
  </table>
)

type Props = {
  aiPoints: number
  aiStackLength: number
  aiSweeps: number
  playerPoints: number
  playerStackLength: number
  playerSweeps: number
}

export default ScoreBoard
