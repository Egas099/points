import { FC } from 'react'
import { Link } from 'react-router-dom'

const MainMenuLoad: FC = () => {
    return (
        <div>
            <h2>Load</h2>
            <Link className="menu__btn" to="/menu/">Back</Link>
        </div>
    )
}

export default MainMenuLoad
