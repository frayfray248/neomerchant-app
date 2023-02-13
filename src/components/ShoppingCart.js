import { PayPalButtons } from "@paypal/react-paypal-js"
import Table from 'react-bootstrap/Table'
import ShoppingCartItemRow from './ShoppingCartItemRow'
import api from "@/api/api"
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'


const ShoppingCart = ({ products, shoppingCartItems, handleRemoveItemFromCart, handleChangeModalContent }) => {


    // create row item data from products and shopping cart items
    const cartRowItems = shoppingCartItems.map(item => {

        // select products from shopping cart
        const product = products.find(product => product._id === item._id)

        // merge selected products and shopping cart items
        return { ...item, ...product }

    })

    // calculate total order cost
    const total = cartRowItems.reduce((total, item) => total + (item.price * item.quantity), 0)


    const createOrder = () => {
        return api.createOrder(localStorage.getItem('token'), shoppingCartItems)
        .then(data => data.id)
        .catch(e => console.log(e))
    }

    const onApprove = (data, actions) => {
        return actions.order.capture()
        .then(details => {
            alert("Transation completed by " + details.payer.name.given_name)
        })
    }


    return (
        <>
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
                    {cartRowItems.map((cartRowItem, index) => <ShoppingCartItemRow key={index} itemIndex={index} cartRowItem={cartRowItem} handleRemoveItemFromCart={handleRemoveItemFromCart} />)}
                    <tr>
                        <th></th>
                        <th>Total:</th>
                        <th>${Math.round((total * 100)) / 100}</th>
                    </tr>
                </tbody>
            </Table>
            <PayPalButtons 
            createOrder={createOrder}
            onApprove={onApprove}
            style={{ layout: "horizontal" }} />
        </>
    )
}

export default ShoppingCart