import { FC } from 'react'
import { Link } from 'react-router-dom'

const MainMenuSettings: FC = () => {
    return (
        <div>
            <h2>Settings</h2>
            <Link className="menu__btn" to="/menu/">Back</Link>
        </div>
    )
}

export default MainMenuSettings

