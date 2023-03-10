import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"

// components
import ProductCard from "../components/ProductCard"

// Catalog component for showing a grid of Products
const Catalog = ({ products, handleAddProductToCart }) => {
    return (
        <>
        <Container>
        
            <Row xl={3} lg={2} md={2} sm={1} xs={1} >
                {
                    products.map((product, index) =>
                        <ProductCard
                            key={index}
                            productId={product._id}
                            title={product.title}
                            price={product.price}
                            description={product.description}
                            category={product.category}
                            image={product.image}
                            handleAddProductToCart={handleAddProductToCart}
                        />)
                }
            </Row>
        </Container>
        </>
    )
}

export default Catalog