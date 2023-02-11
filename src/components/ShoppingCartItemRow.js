const ShoppingCartItemRow = ({ item, product}) => (
    <tr>
        <td>{product.title}</td>
        <td>{item.quantity}</td>
        <td>${product.price * item.quantity}</td>
    </tr>
)

export default ShoppingCartItemRow