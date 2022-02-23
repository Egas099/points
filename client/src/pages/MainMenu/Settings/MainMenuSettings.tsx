import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    BOT_MOVING_INTERVAL,
    CELL_CLONING_INTERVAL
} from '../../../data/constants';
import styles from './MainMenuSettings.module.css';

const MainMenuSettings: FC = () => {
    const [botMovingInterval, setBotMovingInterval] =
        useState(BOT_MOVING_INTERVAL);
    const [cellCloningInterval, setCellCloningInterval] = useState(
        CELL_CLONING_INTERVAL
    );
    const { goBack } = useHistory();

    function resetToDefault() {
        setBotMovingInterval(BOT_MOVING_INTERVAL);
        setCellCloningInterval(CELL_CLONING_INTERVAL);
    }

    return (
        <div className={styles.page_wrapper}>
            <div>
                <h2 className={styles.title}>Settings</h2>
                <div className={styles.block}>
                    <div className={styles.interval_title}>AI delay</div>
                    <div className={styles.interval_row}>
                        <input
                            type="range"
                            min="0"
                            max="500"
                            value={botMovingInterval}
                            onChange={event =>
                                setBotMovingInterval(+event.target.value)
                            }
                        />
                        <div className={styles.interval_value}>
                            {botMovingInterval}
                        </div>
                    </div>
                </div>
                <div className={styles.block}>
                    <div className={styles.interval_title}>
                        Clone animation delay
                    </div>
                    <div className={styles.interval_row}>
                        <input
                            type="range"
                            min="0"
                            max="500"
                            value={cellCloningInterval}
                            onChange={event =>
                                setCellCloningInterval(+event.target.value)
                            }
                        />
                        <div className={styles.interval_value}>
                            {cellCloningInterval}
                        </div>
                    </div>
                </div>
            </div>
            <button className={styles.button} onClick={resetToDefault}>
                Default
            </button>
            <button className={styles.button} onClick={goBack}>
                Back
            </button>
        </div>
    );
};

export default MainMenuSettings;
