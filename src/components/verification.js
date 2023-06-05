import React, { useContext } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

import { TextField } from '@mui/material';
import Button from "@mui/material/Button";
import LockResetIcon from "@mui/icons-material/LockReset";
import { API } from '../global';
import UserContext from '../context/UserContext';

function Verification() {
    let navigate = useNavigate();
    const userContextData = useContext(UserContext);
    let mail = userContextData.mailid;
    let { values, touched, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: `${mail}`,
            vercode: '',
        },
        validationSchema: yup.object({
            email: yup.string().required().email(),
            vercode: yup.number().required()
        }),
        onSubmit: async (values) => {

            try {
                const res = await axios.post(`${API}/user/verify`, values);
                userContextData.setforgotUser(res.data);

                if (res.data) {
                    alert("verified successfully");
                    navigate('/ChangePassword');
                }
                else {
                    alert(res.data.message);
                }
            } catch (error) {
                console.log(error);
                alert(error.response.data.message);
            }
        }
    })
    return (

        <>
            <form onSubmit={handleSubmit} className="forgot-form form">
                <h3>Enter a verification code</h3>

                <TextField
                    type={"number"}
                    className="form-control form-control-user mb-2"
                    name={'vercode'}
                    value={values.vercode}
                    onChange={handleChange}
                    placeholder="----"
                    error={touched.vercode && errors.vercode ? true : false}
                    helperText={touched.vercode && errors.vercode ? errors.vercode : null}

                />

                <Button
                    type="submit"
                    className="verify-user-button"
                    variant="contained"
                    endIcon={<LockResetIcon />}

                >
                    verify
                </Button>


            </form>
        </>

    )
}

export default Verification