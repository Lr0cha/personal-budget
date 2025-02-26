import "./styles.css";

interface DelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }: DelModalProps) => {
  return isOpen ? (
    <div className="modal-container">
      <div className="overlay"></div>
      <div className="modal">
        <h3 className="text-lg font-semibold mb-4">
          Tem certeza que deseja excluir?
        </h3>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ConfirmDeleteModal;
