import { FC } from 'react';
import styles from './Popup.module.css';
import { Link } from 'react-router-dom';
import PopupWrapper from './PopupWrapper/PopupWrapper';

export interface MenuPopupActions {
    continue: () => void;
    save?: () => void;
    reset?: () => void;
}
interface Props {
    show: boolean;
    actions: MenuPopupActions;
}

const MenuPopup: FC<Props> = ({ show, actions }) => {
    return (
        <PopupWrapper show={show}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h2>Pause</h2>
                    <button
                        className={styles.button}
                        onClick={actions.continue}
                    >
                        Continue
                    </button>

                    <button
                        className={styles.button}
                        disabled={actions.save === undefined}
                        onClick={actions.save}
                    >
                        Save
                    </button>
                    <Link to="/menu/play/load" className={styles.button}>
                        Load
                    </Link>
                    <Link to="/menu/settings" className={styles.button}>
                        Settings
                    </Link>
                    <button
                        className={styles.button}
                        disabled={actions.reset === undefined}
                        onClick={actions.reset}
                    >
                        Reset
                    </button>
                    <Link to="/menu/" className={styles.button}>
                        Main menu
                    </Link>
                </div>
            </div>
        </PopupWrapper>
    );
};

export default MenuPopup;
