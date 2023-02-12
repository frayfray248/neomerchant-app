// This file contains a series of helper functions that make fetch calls to the api


// login function to login a user by making a POST request to /users/login and obtaining a JWT token
const login = (username, password) => {
    return (async () => {
        try {

            // fetch data
            const data = {
                username: username,
                password: password
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

            // bad response error
            if (res.status !== 200) throw body.message

            // missing token error
            if (!body.token) throw "No token in body"

            // save token
            localStorage.setItem('token', body.token)


        } catch (e) {
            throw e
        }
    })()
}

// function that creates a user's shopping cart by making a POST request to /shopping cart 
const createShoppingCart = (token) => {
    return (async () => {
        try {

            // get user's id from jwt token
            const userId = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).id

            // login post request
            const res = await fetch(`http://127.0.0.1:3001/shoppingcart`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const body = await res.json()

            // bad response error
            if (res.status !== 201) throw body.message

            return { products: body.products }

        } catch (e) {
            throw e
        }
    })()
}

// function that gets a user's shopping cart by making a GET request to /users/:userId/shoppingcart
const getShoppingCart = (token) => {
    return (async () => {
        try {

            const userId = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).id

            // login post request
            const res = await fetch(`http://127.0.0.1:3001/users/${userId}/shoppingcart`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const body = await res.json()

            // return false if "No shopping cart found" response
            if (res.status === 404 && body.message === "No shopping cart found") return false

            // bad response error
            if (res.status !== 200) throw body.message

            return { products: body.products }

        } catch (e) {
            throw e
        }
    })()
}

const updateShoppingCart = (token, shoppingCartItems) => {
    return (async () => {
        try {

            const userId = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).id

            // login post request
            const res = await fetch(`http://127.0.0.1:3001/users/${userId}/shoppingcart`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(shoppingCartItems)
            })

            const body = await res.json()

            // bad response error
            if (res.status !== 200) throw body.message

            return body

        } catch (e) {
            throw e
        }
    })()
}


// paypal create order
const createOrder = (token, shoppingCartItems) => {
    return (async () => {
        try {


            const res = await fetch('http://127.0.0.1:3001/orders', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(shoppingCartItems)
            })

            const body = await res.json()

            // bad response error
            if (res.status !== 200) throw body.message

            return body

        } catch(e) {
            throw e
        }
    })()
}


export default {
    login: login,
    createShoppingCart: createShoppingCart,
    getShoppingCart: getShoppingCart,
    updateShoppingCart: updateShoppingCart,
    createOrder : createOrder
}