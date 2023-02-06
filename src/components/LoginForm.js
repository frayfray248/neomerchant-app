import NMButton from './NMButton';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { useState } from 'react';

function LoginForm({ handleLogin }) {

    const [errorMessage, setErrorMessage] = useState('')

    // login form submit handler
    const handleLoginSubmit = (values, { setSubmitting }) => {

        // call login handler
        handleLogin(values.username, values.password)
            // successful login
            .then(() => {
                setSubmitting(false)
            })
            // error
            .catch(message => {
                setErrorMessage(message)
            })
    }

    // validation function. Only checks for missing fields
    const validate = values => {

        const errors = {}

        if (!values.username) {
            errors.username = "Username required"
        }

        if (!values.password) {
            errors.password = "Password required"
        }

        return errors
    }

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validate={validate}
            onSubmit={handleLoginSubmit}
        >
            {({
                // formik properties
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,

            }) => (


                <Form onSubmit={handleSubmit}>
                    {/* USERNAME */}
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

                    {/* PASSWORD */}
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

                    {/* SUBMIT (LOGIN) */}
                    <NMButton type="submit" disabled={isSubmitting}>
                        Login
                    </NMButton>
                    {errorMessage}
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm