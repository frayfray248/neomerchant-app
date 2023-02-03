import Head from "next/head";
import { useState, useEffect } from "react";

// components
import Catalog from "./Catalog";
import Modal from "../components/NMModal";
import NavigationBar from "@/components/NavBar"
import LoginForm from "@/components/LoginForm";


export default function Home() {

    const [products, setProducts] = useState([])                // products array
    const [showModal, setShowModal] = useState(false)           // show modal boolean
    const [modalContent, setModalContent] = useState("")        // modal content

    // modal show/hide handlers
    const handleCloseModal = () => setShowModal(false)
    const handleShowModal = () => setShowModal(true)

    // modal content handler for changing the content of the modal
    const handleChangeModalContent = (content) => {
        if (content === "loginForm") {
            setModalContent(<LoginForm />)
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
            <NavigationBar handleShowModal={handleShowModal} handleChangeModalContent={handleChangeModalContent}/>

            {/* VIEWS */}
            <Catalog products={products} />
        </>
    )
}
