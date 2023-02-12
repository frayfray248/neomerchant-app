import Head from "next/head";
import { useState, useEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// components
import Catalog from "./Catalog";
import Modal from "../components/NMModal";
import NavigationBar from "@/components/NavBar"
import LoginForm from "@/components/LoginForm";
import OrderForm from "@/components/OrderForm";
import NMOffCanvas from "@/components/OffCanvas";

// api
import api from "../api/api";



export default function Home() {

    // state
    const [products, setProducts] = useState([])                    // products array
    const [showModal, setShowModal] = useState(false)               // show modal boolean
    const [modalTitle, setModalTitle] = useState("")                // modal title
    const [modalContent, setModalContent] = useState("")            // modal content
    const [showOffCanvas, setShowOffCanvas] = useState(false)       // logged in boolean
    const [loggedIn, setLoggedIn] = useState(false)                 // logged in boolean
    const [shoppingCartItems, setShoppingCartItems] = useState([])  // shopping cart products

    // modal show/hide handlers
    const handleCloseModal = () => setShowModal(false)
    const handleShowModal = () => setShowModal(true)

    // offcanvas show/hide handlers
    const handleCloseOffCanvas = () => setShowOffCanvas(false)
    const handleShowOffCanvas = () => setShowOffCanvas(true)

    // add product to shopping cart handler
    const handleAddProductToCart = (productId) => {
        (async () => {
            try {

                // check if logged in
                if (!loggedIn) {
                    handleShowModal()
                    handleChangeModalContent("loginForm")
                    return
                }

                // getting shopping cart items
                const newShoppingCartItems = [...shoppingCartItems]

                // find existing item to add
                const existingItem = newShoppingCartItems.find(item => item._id === productId)

                // increment quantity of existing item if found
                if (existingItem) {
                    existingItem.quantity++
                }
                // add new item if not existing already
                else {
                    newShoppingCartItems.push({
                        _id: productId,
                        quantity: 1
                    })
                }

                // get shopping cart 
                let shoppingCart = await api.getShoppingCart(localStorage.getItem('token'))

                // create shopping cart if user doesn't have one
                if (!shoppingCart) shoppingCart = await api.createShoppingCart(localStorage.getItem('token'))

                // set shopping cart 
                shoppingCart.products = newShoppingCartItems

                // update shopping cart api call
                const updatedShoppingCart = await api.updateShoppingCart(localStorage.getItem('token'), shoppingCart)

                // set shopping cart items to items returned from updated shopping cart api call
                setShoppingCartItems(updatedShoppingCart.products)

            } catch (e) {
                alert(e)
            }
        })()
    }

    const handleRemoveItemFromCart = (index) => {

        // get shopping cart items
        const newShoppingCartItems = [...shoppingCartItems]

        // remove item
        newShoppingCartItems.splice(index, 1)

            ; (async () => {
                try {

                    // get shopping cart 
                    let shoppingCart = await api.getShoppingCart(localStorage.getItem('token'))

                    // create shopping cart if user doesn't have one
                    if (!shoppingCart) shoppingCart = await api.createShoppingCart(localStorage.getItem('token'))

                    // set shopping cart 
                    shoppingCart.products = newShoppingCartItems

                    // update shopping cart api call
                    const updatedShoppingCart = await api.updateShoppingCart(localStorage.getItem('token'), shoppingCart)

                    // set shopping cart items to items returned from updated shopping cart api call
                    setShoppingCartItems(updatedShoppingCart.products)
                } catch (e) {
                    alert(e)
                }
            })()
    }


    // login handler
    const handleLogin = (username, password) => {
        return (async () => {
            try {
                await api.login(username, password)
                setLoggedIn(true)
                setShowModal(false)
                const shoppingCart = await api.getShoppingCart(localStorage.getItem('token'))
                if (shoppingCart) setShoppingCartItems(shoppingCart.products)
            } catch (e) {
                throw e
            }
        })()
    }

    // logout handler
    const handleLogout = () => {
        localStorage.removeItem('token')
        setLoggedIn(false)
        setShoppingCartItems([])
    }


    // modal content handler for changing the content of the modal
    const handleChangeModalContent = (content) => {
        if (content === "loginForm") {
            setModalContent(<LoginForm handleLogin={handleLogin} />)
            setModalTitle("Login")
        }
        else if (content === "orderForm") {
            setModalContent(<OrderForm />)
            setModalTitle("Order")
            handleShowModal()
        }
        else {
            setModalContent("")
        }
    }

    // useEffect block for when the component loads
    useEffect(() => {
        (async () => {

            // fetch
            const res = await fetch("http://127.0.0.1:3001/products")
            const newProducts = await res.json()

            // update state
            setProducts(newProducts)

            // get token from local storage
            const token = localStorage.getItem('token')

            // logged in initialization
            if (token) {

                // get token expiry
                const expiry = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp

                const now = Math.floor(Date.now() / 1000)

                // delete token if expired
                if (now > expiry) {
                    localStorage.removeItem('token')
                }
                // set logged in state and get shopping cart 
                else {
                    setLoggedIn(true)
                    const shoppingCart = await api.getShoppingCart(token)

                    if (shoppingCart) setShoppingCartItems(shoppingCart.products)
                    console.log(shoppingCartItems)
                }
            }




        })()
    }, [])


    return (
        <>

            <Head>
                <title>NeoMerchant</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <PayPalScriptProvider options={{ "client-id": "AXEYztEFtSFaeVoeyJ0fQW-z-TR6PBTOB30V4Jph5tx6iS3rpxPK2MAY9ZsGTpqr0Po61SN5p3IzmPz3" }} >

                {/* MODAL */}
                <Modal show={showModal} title={modalTitle} handleCloseModal={handleCloseModal} >
                    {modalContent}
                </Modal>
                {/* NAV BAR */}

                <NavigationBar
                    handleShowModal={handleShowModal}
                    handleShowOffCanvas={handleShowOffCanvas}
                    handleChangeModalContent={handleChangeModalContent}
                    handleLogOut={handleLogout}
                    numProductsInCart={shoppingCartItems}
                    loggedIn={loggedIn}
                    shoppingCartItems={shoppingCartItems}
                />

                {/* VIEWS */}
                <Catalog products={products} handleAddProductToCart={handleAddProductToCart} />
                <NMOffCanvas
                    showOffCanvas={showOffCanvas}
                    handleCloseOffCanvas={handleCloseOffCanvas}
                    products={products}
                    shoppingCartItems={shoppingCartItems}
                    handleRemoveItemFromCart={handleRemoveItemFromCart}
                    handleChangeModalContent={handleChangeModalContent}
                />
            </PayPalScriptProvider>
        </>
    )
}
