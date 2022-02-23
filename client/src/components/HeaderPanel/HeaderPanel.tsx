import { FC } from 'react';

import styles from './HeaderPanel.module.css';

interface HeaderButtonPanel {
    showMenu: () => void;
}

const HeaderButtonPanel: FC<HeaderButtonPanel> = ({ showMenu }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <button onClick={showMenu} className={styles.button}>
                    Menu
                </button>
            </div>
        </div>
    );
};

export default HeaderButtonPanel;
