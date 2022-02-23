import { FC } from 'react';
import styles from './Popup.module.css';
import PopupWrapper from './PopupWrapper';

interface Props {
    show: boolean;
    callback: () => void;
    title: string;
    text?: string;
    buttonText?: string;
}

const AlertPopup: FC<Props> = ({ show, title, text, callback, buttonText }) => {
    return (
        <PopupWrapper show={show}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.main}>
                        <h2>{title}</h2>
                        {text && <p>{text}</p>}
                    </div>
                    <button
                        className={styles.button}
                        onClick={() => callback()}
                    >
                        {buttonText ? buttonText : 'Ok'}
                    </button>
                </div>
            </div>
        </PopupWrapper>
    );
};

export default AlertPopup;
