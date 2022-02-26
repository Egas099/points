import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { objectEquals } from '../../../logic/common';
import { createGameSettings } from '../../../logic/create';
import { resetSettings, setSettings } from '../../../store/actionCreator';
import { defaultSettings } from '../../../store/reducers/gameSettingReducer';
import styles from './MainMenuSettings.module.css';

const MainMenuSettings: FC = () => {
    const { goBack } = useHistory();
    const settings = useTypedSelector(state => state.settings);
    const dispatch = useDispatch();
    const [botMovingDelay, setBotMovingDelay] = useState(0);
    const [cellCloningDelay, setCellCloningDelay] = useState(0);

    const isDefaultSetting = () => objectEquals(defaultSettings, settings);
    const existUnappliedChanges = () =>
        objectEquals(
            createGameSettings(botMovingDelay, cellCloningDelay),
            settings
        );
        
    useEffect(() => {
        setBotMovingDelay(settings.botMovingDelay);
    }, [settings.botMovingDelay]);
    useEffect(() => {
        setCellCloningDelay(settings.cellCloningDelay);
    }, [settings.cellCloningDelay]);

    function resetToDefault() {
        dispatch(resetSettings());
    }

    function applyChanges() {
        const newSettings = {
            botMovingDelay: botMovingDelay,
            cellCloningDelay: cellCloningDelay
        };
        dispatch(setSettings(newSettings));
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
                            value={botMovingDelay}
                            onChange={event =>
                                setBotMovingDelay(+event.target.value)
                            }
                        />
                        <div className={styles.interval_value}>
                            {botMovingDelay}
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
                            value={cellCloningDelay}
                            onChange={event =>
                                setCellCloningDelay(+event.target.value)
                            }
                        />
                        <div className={styles.interval_value}>
                            {cellCloningDelay}
                        </div>
                    </div>
                </div>
            </div>
            <button
                className={styles.button}
                onClick={resetToDefault}
                disabled={isDefaultSetting()}
            >
                Default
            </button>
            <button
                className={styles.button}
                onClick={applyChanges}
                disabled={existUnappliedChanges()}
            >
                Apply
            </button>
            <button className={styles.button} onClick={goBack}>
                {!existUnappliedChanges() ? 'Cancel' : 'Back'}
            </button>
        </div>
    );
};

export default MainMenuSettings;
