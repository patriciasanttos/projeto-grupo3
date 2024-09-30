import "./ModalDeleteConfirm.scss";
import Modal from "../index";
import { BeatLoader } from "react-spinners";

const ModalDeleteConfirm = ({
  isOpen,
  onModalClose,
  onDeleteConfirm,
  message,
  loading,
}) => {
  return (
    <Modal isOpen={isOpen} onModalClose={onModalClose} title={"Confirmação"}>
      <div className="modal-confirm-message">{message}</div>

      <div className="modal-confirm-actions">
        {loading ? (
          <BeatLoader style={{marginTop: '30px'}} />
        ) : (
          <>
            <button onClick={onDeleteConfirm} className="btn-modal">
              Confirmar
            </button>
            <button onClick={onModalClose} className="btn-modal grey-btn">
              Cancelar
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalDeleteConfirm;
