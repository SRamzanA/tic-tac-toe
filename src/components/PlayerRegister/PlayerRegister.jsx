import { useState } from 'react'
import './PlayerRegister.css'

export default function Playerreg({ activePopup, renamePlayers }) {
    const [playerName1, setPlayerName1] = useState("")
    const [playerName2, setPlayerName2] = useState("")
    const [renameIdenticalError, setRenameIdenticalError] = useState(false)
    const [renameEmptyError, setRenameEmptyError] = useState(false)

    function validationName(e) {
        setRenameIdenticalError(false)
        setRenameEmptyError(false)
        if (e.target.value.length <= 50) {
            return true
        } else {
            return false
        }
    }

    function startGame(e) {
        e.preventDefault()
        if (playerName1.trim() == "" || playerName2.trim() == "") {
            setRenameEmptyError(true)
        } else if (playerName1 == playerName2) {
            setRenameIdenticalError(true)
        } else {
            renamePlayers(playerName1, playerName2)
            activePopup(false)
        }
    }

    return (
        <div className="form-popup">
            <form className='reg-form'>
                <h2 className='reg-form__text'>Введите имя первого игрока</h2>
                <input className='reg-form__input' type="text" placeholder='Игрок 1' value={playerName1} onChange={(e) => validationName(e) && setPlayerName1(e.target.value)}/>
                <h2 className='reg-form__text'>Введите имя второго игрока</h2>
                <input className='reg-form__input' type="text" placeholder='Игрок 2' value={playerName2} onChange={(e) => validationName(e) && setPlayerName2(e.target.value)}/>

                <button className='reg-form__button' onClick={(e) => startGame(e)}>Начать игру</button>

                {renameIdenticalError && (
                    <span className='reg-form__error'>Имена не должны быть одинаковыми</span>
                )}
                {renameEmptyError && (
                    <span className='reg-form__error'>Имена не должны быть пустыми</span>
                )}
            </form>
        </div>
    )
}