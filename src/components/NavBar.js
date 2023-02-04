import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link'
import Button from 'react-bootstrap/Button'

// Navigation bar to navigate to the sites pages
const NavigationBar = ({ handleShowModal, handleChangeModalContent, handleLogOut, loggedIn }) => {

    const handleLoginPressed = () => {
        handleShowModal()
        handleChangeModalContent("loginForm")
    }

    const handleLogoutPressed = () => {
        handleLogOut()
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">NeoMerchant</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="/#catalog" passHref legacyBehavior><Nav.Link>Catalog</Nav.Link></Link>
                    </Nav>
                    <Button variant="outline-primary" onClick={
                        loggedIn ? handleLogoutPressed : handleLoginPressed
                        }>{loggedIn ? "Log out" : "Login"}</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar