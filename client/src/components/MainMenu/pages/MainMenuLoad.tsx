import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSaves } from '../../../hooks/useSaves';
import SavesList from '../components/SavesList';

const MainMenuLoad: FC = () => {
    const [savesList, setSavesList] = useState([]);
    const { getSaves, setSaves } = useSaves();

    useEffect(loadSaves, []);

    function loadSaves() {
        setSavesList(getSaves());
    }

    function clearSaves() {
        setSaves([]);
        loadSaves();
    }
    const savesExist =
        Array.isArray(savesList) && savesList.length > 0 ? false : true;
    return (
        <div>
            <h2>Loading</h2>
            <SavesList saves={savesList} />
            <button
                className="menu__btn"
                onClick={clearSaves}
                disabled={savesExist}
            >
                Clear all
            </button>
            <Link className="menu__btn" to="/menu/">
                Back
            </Link>
        </div>
    );
};

export default MainMenuLoad;
