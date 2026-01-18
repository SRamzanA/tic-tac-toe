import './StatisticTable.css'

export default function StaticticTable({ newGame, resetGame }) {
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
                    {/* Динамичные значения из localStorage */}
                    <tr>
                        <td>Player 1</td>
                        <td>3</td>
                        <td>4</td>
                        <td><a href="#">Подробная статистика</a></td>
                    </tr>

                    <tr>
                        <td>Player 2</td>
                        <td>1</td>
                        <td>4</td>
                        <td><a href="#">Подробная статистика</a></td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    )
}