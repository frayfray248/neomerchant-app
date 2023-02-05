import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { useState } from 'react';

function LoginForm({ handleLogin }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')


    const handleLoginSubmit = (values, { setSubmitting }) => {

        handleLogin(values.username, values.password)
            .then(() => {
                setSubmitting(false)
            })
            .catch(message => {
                setErrorMessage(message)
            })
    }

    const validate = values => {

    }

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validate={validate}
            onSubmit={handleLoginSubmit}
        >
            {({

                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,

            }) => (

                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="loginFormUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control

                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}

                        />
                        {errors.username && touched.username && errors.username}
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="loginFormPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control

                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}

                        />
                        {errors.password && touched.password && errors.password}
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        Login
                    </Button>
                    {errorMessage}
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm