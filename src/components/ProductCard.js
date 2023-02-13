import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import Button from './Button'
import { CartPlus } from 'react-bootstrap-icons'
import { useState } from 'react';

const StyledCardImage = styled(Card.Img)`
    height: 300px;
    object-fit: contain;
`

const StyledCard = styled(Card)`
  height: 100%;
  box-shadow: 10px 10px 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`

const StyledButton = styled.button`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    transition: color 0.2s ease-in-out;

    &:hover {
        color: green;
    }
`

const ProductCard = ({ productId, title, description, price, category, image, handleAddProductToCart }) => {

    const [cardProductId, setCardProductId] = useState(productId)

    const handleAddToCartPressed = (e) => {
        handleAddProductToCart(cardProductId)
    }

    return (
        <Col className="p-4">
            <StyledCard>
                <StyledCardImage variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>{category}</Card.Subtitle>
                    <Card.Text>$ {price}</Card.Text>
                </Card.Body>
                <StyledButtonContainer>
                    <Button 
                    onClick={handleAddToCartPressed}
                    hoverColor="green"
                    ><CartPlus size="4em" variant="primary">Add to Cart</CartPlus></Button>
                </StyledButtonContainer>
            </StyledCard>
        </Col>
    );
};

export default ProductCard;
