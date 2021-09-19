import { FC } from 'react'
import stl from './Popup.module.css'
import { CSSTransition } from 'react-transition-group';
import "../../css/popup.css"

interface Props {
    show: boolean;
    callback: Function;
    title: string;
    text?: string;
}

const ModalWimdow: FC<Props> = ({ show, title, text, callback }) => {
    return (
        <CSSTransition unmountOnExit in={show} timeout={500} classNames="mask">
            <div className={stl.mask} >
                <CSSTransition in={show} timeout={500} classNames="popup">
                    <div className={stl.wrapper}>
                        <div className={stl.content}>
                            <div className={stl.main}>
                                <h2>
                                    {title}
                                </h2>
                                {text ? <p>{text}</p> : <></>}
                            </div>
                            <button className={stl.button} onClick={() => callback()}>Ok</button>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        </CSSTransition>
    )
}

export default ModalWimdow
