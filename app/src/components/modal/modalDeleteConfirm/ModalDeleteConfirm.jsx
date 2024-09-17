import './ModalDeleteConfirm.scss'
import Modal from "../index";

const ModalDeleteConfirm = ({ isOpen, onModalClose, onDeleteConfirm, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
      title={"Confirmação"}
    >
        <div className="modal-confirm-message">
      {message}
      </div>

      <div className="modal-confirm-actions">
        <button onClick={onDeleteConfirm} className="btn-modal">
          Confirmar
        </button>
        <button onClick={onModalClose} className="btn-modal grey-btn">
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default ModalDeleteConfirm;
