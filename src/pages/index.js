import Head from "next/head";
import { useState, useEffect } from "react";

// components
import Catalog from "./Catalog";
import Modal from "../components/NMModal";
import NavigationBar from "@/components/NavBar"
import LoginForm from "@/components/LoginForm";


export default function Home() {

    // state
    const [products, setProducts] = useState([])                // products array
    const [showModal, setShowModal] = useState(false)           // show modal boolean
    const [modalContent, setModalContent] = useState("")        // modal content
    const [loggedIn, setLoggedIn] = useState(false)             // logged in boolean

    // modal show/hide handlers
    const handleCloseModal = () => setShowModal(false)
    const handleShowModal = () => setShowModal(true)


    // login handler
    const handleLogin = (username, password) => {
        return (async () => {
            try {

                // fetch data
                const data = {
                    username : username,
                    password : password
                }

                // login post request
                const res = await fetch("http://127.0.0.1:3001/users/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                
                const body = await res.json()

                if (!res.ok) throw body.message

                if (!body.token) throw "No token in body"

                // save token
                localStorage.setItem('token', body.token)
                setLoggedIn(true)

                setShowModal(false)

            } catch(e) {
                throw e
            }
        })()
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setLoggedIn(false)
    }


    // modal content handler for changing the content of the modal
    const handleChangeModalContent = (content) => {
        if (content === "loginForm") {
            setModalContent(<LoginForm handleLogin={handleLogin}/>)
        }
        else {
            setModalContent("")
        }
    }


    // fetch products from API
    useEffect(() => {
        (async () => {

            // fetch
            const res = await fetch("http://127.0.0.1:3001/products")
            const newProducts = await res.json()

            // update state
            setProducts(newProducts)

            

        })()
    }, [])


    return (
        <>

            <Head>
                <title>NeoMerchant</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* MODAL */}
            <Modal show={showModal} handleCloseModal={handleCloseModal}>
                {modalContent}
            </Modal>
            {/* NAV BAR */}
            <NavigationBar 
            handleShowModal={handleShowModal} 
            handleChangeModalContent={handleChangeModalContent}
            handleLogOut={handleLogout}
            loggedIn={loggedIn}
            />

            {/* VIEWS */}
            <Catalog products={products} />
        </>
    )
}
