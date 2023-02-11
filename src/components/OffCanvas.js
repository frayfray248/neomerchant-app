import Offcanvas from 'react-bootstrap/Offcanvas';
import ShoppingCart from './ShoppingCart';


// Catalog component for showing a grid of Products
const NMOffCanvas = ({ showOffCanvas, handleCloseOffCanvas, products, shoppingCartItems, handleRemoveItemFromCart }) => {
    return (
        <Offcanvas show={showOffCanvas} onHide={handleCloseOffCanvas} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ShoppingCart products={products} shoppingCartItems={shoppingCartItems} handleRemoveItemFromCart={handleRemoveItemFromCart}/>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default NMOffCanvas