import Modal from 'react-bootstrap/Modal';


function NMModal({ show }) {

  return (
    <Modal show={show} >
        <Modal.Header closeButton>
          <Modal.Title>Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
      </Modal>
  )
}

export default NMModal