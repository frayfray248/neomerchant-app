import Head from "next/head";
import { useState, useEffect } from "react";

// components
import Catalog from "./Catalog";


export default function Home() {

    // state for storing products
    const [products, setProducts] = useState([])


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
            <Catalog products={products}/>
        </>
    )
}
