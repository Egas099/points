import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SavesList from '../components/SavesList'

const MainMenuLoad: FC = () => {

    const [saves, setSaves] = useState([]);

    useEffect(loadSaves, []);

    function loadSaves() {
        setSaves(JSON.parse(localStorage.getItem('saves') || "[]"))
    }

    function clearSaves() {
        localStorage.setItem('saves', JSON.stringify([]))
        loadSaves();
    }

    return (
        <div>
            <h2>Loading</h2>
            <SavesList saves={saves} />
            <button
                className="menu__btn"
                onClick={clearSaves}
                disabled={Array.isArray(saves) && saves.length > 0 ? false : true}
            >
                Clear all
            </button>
            <Link className="menu__btn" to="/menu/">Back</Link>
        </div>
    )
}

export default MainMenuLoad
