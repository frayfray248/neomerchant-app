import Head from "next/head";
import { useState, useEffect } from "react";

// components
import Catalog from "./Catalog";
import Modal from "../components/NMModal";
import NavigationBar from "@/components/NavBar"


export default function Home() {

    const [products, setProducts] = useState([])        // products array
    const [showModal, setShowModal] = useState(false)   // show modal boolean

    // modal handler
    const handleCloseModal = () => setShowModal(false)
    const handleShowModal = () => setShowModal(true)


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
            <Modal show={showModal} handleCloseModal={handleCloseModal}/>
            <NavigationBar handleShowModal={handleShowModal}/>
            <Catalog products={products}/>
        </>
    )
}
