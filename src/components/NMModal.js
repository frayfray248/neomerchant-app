import Modal from 'react-bootstrap/Modal';


function NMModal({ show, title, handleCloseModal, children }) {
 
  return (
    <Modal show={show} onHide={handleCloseModal} >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
      </Modal>
  )
}

export default NMModal