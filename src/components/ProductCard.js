import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import NMButton from './NMButton';
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
          <NMButton onClick={handleAddToCartPressed} variant="primary">Add to Cart</NMButton>
        </StyledButtonContainer>
      </StyledCard>
    </Col>
  );
};

export default ProductCard;
