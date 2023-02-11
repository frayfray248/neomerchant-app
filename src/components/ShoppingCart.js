import Table from 'react-bootstrap/Table'
import ShoppingCartItemRow from './ShoppingCartItemRow'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'


const ShoppingCart = ({ products, shoppingCartItems, handleRemoveItemFromCart }) => {

    

    const cartRowItems = shoppingCartItems.map(item => {

        const product = products.find(product => product._id === item._id)

        return {...item, ...product}

    })
    
    const total = cartRowItems.reduce((total, item) => total + (item.price * item.quantity), 0)

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
                    <th><Button variant="warning">Checkout</Button></th>
                    <th>Total:</th>
                    <th>${Math.round((total * 100)) / 100}</th>
                </tr>
            </tbody>
        </Table>
    )
}

export default ShoppingCart