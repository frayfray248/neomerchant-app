import Offcanvas from 'react-bootstrap/Offcanvas';


// Catalog component for showing a grid of Products
const NMOffCanvas = ({ showOffCanvas, handleCloseOffCanvas }) => {
    return (
        <Offcanvas show={showOffCanvas} onHide={handleCloseOffCanvas} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default NMOffCanvas