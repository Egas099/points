import { FC } from 'react';
import stl from './Popup.module.css';
import { CSSTransition } from 'react-transition-group';
import '../../css/popup.css';

interface Props {
    show: boolean;
}

const MenuPopup: FC<Props> = ({ show, children }) => {
    return (
        <CSSTransition unmountOnExit in={show} timeout={500} classNames="mask">
            <div className={stl.mask}>
                <CSSTransition in={show} timeout={500} classNames="popup">
                    <div className={stl.wrapper}>
                        <div className={stl.content}>{children}</div>
                    </div>
                </CSSTransition>
            </div>
        </CSSTransition>
    );
};

export default MenuPopup;
