import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root'); // Esto hace que el modal se sobreponga ante todo, lo que va dentro de los parentesis es el elemento html del index.html que contiene el id del root de la aplicacion, en este caso es un div con un id llamado root

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    console.log('cerrando modal');
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className='modal'
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
      <h1>Hola mundo</h1>
      <hr />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
        architecto animi nisi illo deleniti corrupti. Pariatur mollitia itaque
        unde reiciendis cum maxime magnam hic obcaecati ad! Praesentium facere
        quae et!
      </p>
    </Modal>
  );
};
