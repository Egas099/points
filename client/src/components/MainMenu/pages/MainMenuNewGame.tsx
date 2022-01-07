import { FC } from 'react'
import { Link } from 'react-router-dom'

const MainMenuNewGame: FC = () => {
    return (
        <div>
            <h2>New game</h2>
            <Link className="menu__btn" to="/single">Single</Link>
            <Link className="menu__btn" to="/multiplayer">Multiplayer</Link>
            <Link className="menu__btn" to="/menu/">Back</Link>
        </div>
    )
}

export default MainMenuNewGame
