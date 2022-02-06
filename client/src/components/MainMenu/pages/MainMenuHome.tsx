import { FC } from 'react'
import { Link } from 'react-router-dom'

const MainMenuHome: FC = () => {

    return (
        <div>
            <Link className="menu__btn" to="new_game/">Play</Link>
            <Link className="menu__btn" to="load">Loading</Link>
            <Link className="menu__btn" to="settings">Settings</Link>
            <Link className="menu__btn" to="/about">About</Link>
        </div>
    )
}

export default MainMenuHome
