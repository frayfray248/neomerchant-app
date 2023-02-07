import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link'
import styled from 'styled-components';
import NMButton from './NMButton';

const StyledNavBar = styled(Navbar)`
    box-shadow: 10px 10px 10px;
`

// Navigation bar to navigate to the sites pages
const NavigationBar = ({ handleShowModal, handleChangeModalContent, handleShowOffCanvas, handleLogOut, loggedIn, className}) => {

    const handleLoginPressed = () => {
        handleShowModal()
        handleChangeModalContent("loginForm")
    }

    const handleLogoutPressed = () => {
        handleLogOut()
    }

    const handleShoppingCartPressed = () => {
        handleShowOffCanvas()
    }

    return (
        <StyledNavBar bg="light" expand="lg">
            <Container >
                <Navbar.Brand href="#home">NeoMerchant</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="/#catalog" passHref legacyBehavior><Nav.Link>Catalog</Nav.Link></Link>
                    </Nav>

                    {
                        loggedIn ? <NMButton 
                        className="m-2"
                        onClick={handleShoppingCartPressed}
                        > Cart </NMButton> : ""
                    }
                    

                    <NMButton onClick={
                        loggedIn ? handleLogoutPressed : handleLoginPressed
                    }>{loggedIn ? "Log out" : "Login"}</NMButton>
                </Navbar.Collapse>
            </Container>
        </StyledNavBar>
    )
}

export default NavigationBar