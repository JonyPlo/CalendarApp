import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDateModalOpen } = useSelector((state) => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  // Esta funcion se utilizaria como toggle en caso que queramos usar una sola funcion para abrir y cerrar el modal
  const toggleDateModal = () => {
    isDateModalOpen ? openDateModal() : closeDateModal();
  };

  return {
    //* Properties
    isDateModalOpen,

    //* Methods
    closeDateModal,
    openDateModal,
    toggleDateModal,
  };
};
