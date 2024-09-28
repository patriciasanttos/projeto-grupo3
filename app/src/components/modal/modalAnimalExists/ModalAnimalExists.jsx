import './ModalAnimalExists.scss'

const ModalAnimalExists = ({ animalId, onConfirm, onClose }) => {
  return (
    <div className='modal-animal-exists'>
      <div className="modal-animal-exists-title">
        <p>Um animal parecido já foi adicionado</p> <br /> ID: {animalId}
      </div>

      <div className="modal-confirm-actions">
        <button className="btn-modal" onClick={onConfirm}>
          Adicionar
        </button>
        <button className="btn-modal grey-btn" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ModalAnimalExists;
