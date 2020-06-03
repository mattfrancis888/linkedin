import React from "react";
import ReactDOM from "react-dom";
const Modal = (props) => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="modal">
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="modalBox"
            >
                {props.actions}
            </div>
        </div>,
        document.querySelector("#modal")
    );
};
export default Modal;
