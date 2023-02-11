import Table from 'react-bootstrap/Table'
import ShoppingCartItemRow from './ShoppingCartItemRow'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'


const ShoppingCart = ({ products, shoppingCartItems, handleRemoveItemFromCart, handleChangeModalContent }) => {

    
    // create row item data from products and shopping cart items
    const cartRowItems = shoppingCartItems.map(item => {

        // select products from shopping cart
        const product = products.find(product => product._id === item._id)

        // merge selected products and shopping cart items
        return {...item, ...product}

    })
    
    // calculate total order cost
    const total = cartRowItems.reduce((total, item) => total + (item.price * item.quantity), 0)


    // checkout button pressed handler
    const checkoutPressed = (e) => {
        handleChangeModalContent('orderForm')
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {cartRowItems.map((cartRowItem, index) => <ShoppingCartItemRow key={index} itemIndex={index} cartRowItem={cartRowItem} handleRemoveItemFromCart={handleRemoveItemFromCart}/>)}
                <tr>
                    <th><Button onClick={checkoutPressed} variant="warning">Checkout</Button></th>
                    <th>Total:</th>
                    <th>${Math.round((total * 100)) / 100}</th>
                </tr>
            </tbody>
        </Table>
    )
}

export default ShoppingCart