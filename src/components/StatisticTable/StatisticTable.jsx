import './StatisticTable.css'

export default function StaticticTable({ generalStatistic, activePlayersData, newGame, resetGame }) {
    
    function openDetailsInfo(name, data) {
        alert(`
            Имя игрока: ${name}

            Матчей выиграно: ${data.gameWins}
            Матчей сыграно: ${data.played}

            Игр выиграно: ${data.details.wins}
            Игр проиграно: ${data.details.losses}
            Игр закончилось ничьей: ${data.details.draw}
        `)
    }

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
                                <td><span className='details-button' onClick={() => openDetailsInfo(playerName, playerData)}>Подробная статистика</span></td>
                            </tr>
                        )
                    })}

                    {Object.entries(generalStatistic).map(([playerName, playerData], index) => {
                        return (
                            <tr key={index}>
                                <td>{playerName}</td>
                                <td>{playerData.gameWins}</td>
                                <td>{playerData.played}</td>
                                <td><span className='details-button' onClick={() => openDetailsInfo(playerName, playerData)}>Подробная статистика</span></td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>Test 1</td>
                        <td>3</td>
                        <td>4</td>
                        <td><span className='details-button'>Подробная статистика</span></td>
                    </tr>

                    <tr>
                        <td>Test 2</td>
                        <td>1</td>
                        <td>4</td>
                        <td><span className='details-button'>Подробная статистика</span></td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}