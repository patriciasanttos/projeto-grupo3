import React from "react";
import "./Modal.scss";

// Import Icons
import btnClose from "../../assets/icons/btn-close.svg";

function Modal({ isOpen, onModalClose, children, title }) {
  if (isOpen) {
    return (
      <div className="modal-container">
        <div className="background">
          <div className="modal">
            <div className="modalHeader">
              <h1>{title}</h1>
              <div className="closeModal">
                <button onClick={onModalClose}>
                  <img src={btnClose} alt={"button close"} />
                </button>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default Modal;
