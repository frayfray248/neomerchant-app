import Button from './Button'
import { CartX } from 'react-bootstrap-icons'

const ShoppingCartItemRow = ({ itemIndex, item, cartRowItem, handleRemoveItemFromCart }) => {

    const removeItemOnClick = () => {
        handleRemoveItemFromCart(itemIndex)
    }

    return (
        <tr>
            <td>{cartRowItem.title}</td>
            <td>{cartRowItem.quantity}</td>
            <td>${cartRowItem.price * cartRowItem.quantity}</td>
            <td><Button variant="danger" onClick={removeItemOnClick} color="red"><CartX size="2em"/></Button></td>
        </tr>
    )
}

export default ShoppingCartItemRow