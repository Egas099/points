import { FC } from 'react';
import stl from './Popup.module.css';
import { CSSTransition } from 'react-transition-group';
import '../../css/popupTransitions.css';

interface Props {
    show: boolean;
    callback: () => void;
    title: string;
    text?: string;
    buttonText?: string;
}

const ModalWimdow: FC<Props> = ({
    show,
    title,
    text,
    callback,
    buttonText
}) => {
    return (
        <CSSTransition unmountOnExit in={show} timeout={500} classNames="mask">
            <div className={stl.mask}>
                <CSSTransition in={show} timeout={500} classNames="popup">
                    <div className={stl.wrapper}>
                        <div className={stl.content}>
                            <div className={stl.main}>
                                <h2>{title}</h2>
                                {text && <p>{text}</p>}
                            </div>
                            <button className="btn" onClick={() => callback()}>
                                {buttonText ? buttonText : 'Ok'}
                            </button>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        </CSSTransition>
    );
};

export default ModalWimdow;
