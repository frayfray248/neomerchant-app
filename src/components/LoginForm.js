import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function LoginForm({ handleLogin }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')


    const handleLoginSubmit = (e) => {
        e.preventDefault();
        handleLogin(username, password)
        .catch(message => {
            setErrorMessage(message)
        }
            )
    }

    return (
        <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter email"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <p>{errorMessage}</p>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}

export default LoginForm