import Offcanvas from 'react-bootstrap/Offcanvas';


// Catalog component for showing a grid of Products
const NMOffCanvas = ({ showOffCanvas, handleCloseOffCanvas, products, shoppingCartItems }) => {
    return (
        <Offcanvas show={showOffCanvas} onHide={handleCloseOffCanvas} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul>
                {shoppingCartItems.map((item, index) => <li key={index}>{products.find(product => product._id === item._id).title} - {item.quantity}</li>)}
                </ul>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default NMOffCanvas