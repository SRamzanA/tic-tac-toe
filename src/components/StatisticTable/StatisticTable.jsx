import './StatisticTable.css'

export default function StaticticTable({ generalStatistic, activePlayersData, newGame, resetGame }) {

    // Теперь надо доделать показ данных, реализовать функцию показа подробной информации

    return (
        <div className="stat-popup">
            <div className="stat-buttons">
                <button className="stat-buttons__button" onClick={() => newGame()}>Новая игра</button>
                <button className="stat-buttons__button" onClick={() => resetGame()}>Начать заново</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Имя игрока</th>
                        <th>Победы</th>
                        <th>Игр сыграно</th>
                        <th>—</th>
                    </tr>
                </thead>

                <tbody>
                    {Object.entries(activePlayersData).map(([playerName, playerData], index) => {
                        return (
                            <tr key={index} className='activePlayers'>
                                <td>{'> ' + playerName}</td>
                                <td>{playerData.gameWins}</td>
                                <td>{playerData.played}</td>
                                <td><a href="#">Подробная статистика</a></td>
                            </tr>
                        )
                    })}

                    {Object.entries(generalStatistic).map(([playerName, playerData], index) => {
                        return (
                            <tr key={index}>
                                <td>{playerName}</td>
                                <td>{playerData.gameWins}</td>
                                <td>{playerData.played}</td>
                                <td><a href="#">Подробная статистика</a></td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>Test 1</td>
                        <td>3</td>
                        <td>4</td>
                        <td><a href="#">Подробная статистика</a></td>
                    </tr>

                    <tr>
                        <td>Test 2</td>
                        <td>1</td>
                        <td>4</td>
                        <td><a href="#">Подробная статистика</a></td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}