import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';


// Product Card for displaying information of a product
const ProductCard = ({ title, description, price, category, image }) => {
    return (
        <Col >
        
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{category}</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Text>$ {price}</Card.Text>
                <Button variant="primary">Add to Cart</Button>
            </Card.Body>
        </Card>
        </Col>
    )
}

export default ProductCard