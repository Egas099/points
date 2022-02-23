import { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { POPUP_TIMEOUT } from '../../data/constants';
import styles from './Popup.module.css';
import './popupTransitions.css';

interface Props {
    show: boolean;
    timeout?: number;
}

const PopupWrapper: FC<Props> = ({
    show,
    timeout = POPUP_TIMEOUT,
    children
}) => {
    return (
        <CSSTransition
            unmountOnExit
            in={show}
            timeout={timeout}
            classNames="mask"
        >
            <div className={styles.mask}>
                <CSSTransition in={show} timeout={timeout} classNames="popup">
                    {children}
                </CSSTransition>
            </div>
        </CSSTransition>
    );
};

export default PopupWrapper;
