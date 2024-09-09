import React from "react";
import styles from "./Styles.module.css";

// Import Icons
import btnClose from "../../assets/icons/btn-close.svg";

function Modal({ isOpen, onModalClose, children, title }) {
  if (isOpen) {
    return (
      <div className={styles.background}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h1>{title}</h1>
            <div className={styles.closeModal}>
              <button onClick={onModalClose}>
                <img src={btnClose} alt={"button close"} />
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  }

  return null;
}

export default Modal;
