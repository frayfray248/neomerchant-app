import Button from 'react-bootstrap/Button'

const ShoppingCartItemRow = ({ itemIndex, item, cartRowItem, handleRemoveItemFromCart }) => {

    const removeItemOnClick = () => {
        handleRemoveItemFromCart(itemIndex)
    }

    return (
        <tr>
            <td>{cartRowItem.title}</td>
            <td>{cartRowItem.quantity}</td>
            <td>${cartRowItem.price * cartRowItem.quantity}</td>
            <td><Button variant="danger" onClick={removeItemOnClick}>X</Button></td>
        </tr>
    )
}

export default ShoppingCartItemRow