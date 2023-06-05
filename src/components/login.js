import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../global";


export function Login() {

    const navigate = useNavigate();


    const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
        useFormik({
            initialValues: {
                email: "",
                password: "",
            },
            validationSchema: yup.object({
                email: yup.string().required().email(),
                password: yup.string().required().min(8),
            }),
            onSubmit: async (values) => {
                try {
                    const users = await axios.post(`${API}/user/login`, values);

                    if (users.data.token) {
                        localStorage.setItem('token', users.data.token);
                        localStorage.setItem('email', users.data.email);
                        alert(users.data.message)

                        navigate('/home');
                    } else {
                        alert("Invalid credentials");
                    }


                } catch (error) {
                    alert(error.response.data.message)
                    console.log(error)
                }
            },
        });

    return (
        <>

            <form onSubmit={handleSubmit} className="login-form form">
                <h3>Welcome to Movie App</h3>
                <TextField
                    id="email"
                    type="text"
                    label="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email ? true : false}
                    helperText={touched.email && errors.email ? errors.email : null}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && errors.password ? true : false}
                    helperText={
                        touched.password && errors.password ? errors.password : null
                    }
                />
                <Button type="submit" variant="contained">
                    Submit
                </Button>
                <div className="signup-forgot d-flex justify-content-between">
                    <p><Link to="/register" className="link-primary">
                        Don't have an account? Sign Up
                    </Link></p>
                    <Link to="/ForgotPassword" className="link-danger text-danger">
                        Forgot password?
                    </Link>
                </div>
            </form>
        </>
    );
}
