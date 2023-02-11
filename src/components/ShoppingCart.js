import Table from 'react-bootstrap/Table'
import ShoppingCartItemRow from './ShoppingCartItemRow'

const ShoppingCart = ({ products, shoppingCartItems }) => (
    <Table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            {shoppingCartItems.map((item, index) => {

                const product = products.find(product => product._id === item._id)

                return (
                    <ShoppingCartItemRow key={index} item={item} product={product}/>
                    )
            }
            )}
        </tbody>
    </Table>
)

export default ShoppingCart