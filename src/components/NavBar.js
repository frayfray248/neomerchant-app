import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Link from 'next/link'
import styled from 'styled-components';
import React from 'react';
import { Cart3 } from 'react-bootstrap-icons'
import { Person } from 'react-bootstrap-icons'

const StyledNavBar = styled(Navbar)`
    box-shadow: 10px 10px 10px;
`


// Navigation bar to navigate to the sites pages
const NavigationBar = ({ handleShowModal, handleChangeModalContent, handleShowOffCanvas, handleLogOut, loggedIn, shoppingCartItems }) => {

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
                        loggedIn ?
                            <Nav.Link className="m-2" onClick={handleShoppingCartPressed}>
                                <Cart3 className="me-2" size="2em" />
                                {
                                    shoppingCartItems.length > 0 ? <span className="me-2"><b>({shoppingCartItems.length})</b></span> 
                                    : 
                                    <span className="me-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                }
                            </Nav.Link>
                            : ""
                    }

                    <NavDropdown className="m-2" title={<Person size="2.0em" />} id="basic-nav-dropdown">

                        {
                            loggedIn ?
                                <NavDropdown.Item href="#action/3.1" onClick={handleLogoutPressed}>Logout</NavDropdown.Item>
                                :
                                <NavDropdown.Item href="#action/3.2" onClick={handleLoginPressed}>Login</NavDropdown.Item>

                        }
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </StyledNavBar>
    )
}

export default NavigationBar