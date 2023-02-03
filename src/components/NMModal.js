import Modal from 'react-bootstrap/Modal';


function NMModal({ show, handleCloseModal  }) {

  return (
    <Modal show={show} onHide={handleCloseModal} >
        <Modal.Header closeButton>
          <Modal.Title>Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
      </Modal>
  )
}

export default NMModal