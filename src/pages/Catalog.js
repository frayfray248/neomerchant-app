import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"

// components
import ProductCard from "../components/ProductCard"

// Catalog component for showing a grid of Products
const Catalog = ({ products }) => {
    return (
        <Container>
            <Row lg={3}>
                {
                    products.map((product, index) =>
                        <ProductCard
                            key={index}
                            title={product.title}
                            price={product.price}
                            description={product.description}
                            category={product.category}
                            image={product.image}
                        />)
                }
            </Row>
        </Container>
    )
}

export default Catalog