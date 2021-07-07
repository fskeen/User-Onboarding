import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { TOS } from './Data.js'
import UserList from './UserList'

function SignUpForm ({errors, touched, values, handleSubmit, status}) {

    const [userList, setUserList] = useState([])

    useEffect (() => {
        if (status) {
            setUserList([...userList, status])
        }
    }, [ status ]);

    return (
        <div>
        <Form>
            <h1>Create your villainous account</h1>
            
            <div className="name-wrapper">
                <div className="option">
                    <label htmlFor="firstname">Fiendish first name</label>
                        <Field
                            type="text"
                            name="firstname"
                            placeholder="First name"
                            id="firstname" />
                        {touched.firstname && errors.firstname && <p className="error-text">{errors.firstname}</p>}
                </div>
                
                <div className="option">
                    <label htmlFor="lastname">Nefarious last name</label>
                    <Field
                        type="text"
                        name="lastname"
                        placeholder="Last name" 
                        id="lastname" />
                    {touched.lastname && errors.lastname && <p className="error-text">{errors.lastname}</p>}
                </div>  
            </div>
            
            <label htmlFor="title" className="title">Evil Title</label>
            <Field
                component="select"
                name="title"
                placeholder=""
                id="title" >
                <option>the Sad and Title-less</option>
                <option>the Depraved</option>
                <option>the Terrible</option>
                <option>the Malevolent</option>
                <option>the Vile</option>
                <option>the Cruel</option>
            </Field>    
            {touched.title && errors.email && <p className="error-text">{errors.title}</p>}
            
            <br/>
            <label htmlFor="email">Where should we send comments, questions, threats and/or pledges of fealty?</label>
            <Field
                type="email"
                name="email"
                placeholder="Email address"
                id="email" />
            {touched.email && errors.email && <p className="error-text">{errors.email}</p>}
            
            <div className="password-wrapper">
                <div className="option">
                    <label htmlFor="password">Password</label>
                        <Field
                            type="password"
                            name="password"
                            placeholder="Password"
                            id="password" />
                        {touched.password && errors.password && <p className="error-text">{errors.password}</p>}
                </div>

                <div className="option">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        id="confirmPassword" />
                    {touched.confirmPassword && errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                </div>
                
            </div>
            
            <p>Terms of Unholy Service</p>
            <section className="TOS">
            
                {TOS}
            </section>
            
            <div className="TOS-checkbox">
                <Field
                    type="checkbox"
                    name="TOS"
                    checked={values.TOS}
                    id="TOS" />
                    <label htmlFor="TOS">By selecting this, you are confirming that you have read the Terms of Unholy Service</label>
                {touched.TOS && errors.TOS && <p className="error-text">{errors.TOS}</p>}
            </div>
            
            
            <button type="submit">Create villainous account</button>
        </Form>
        <UserList userList={userList} />
        </div>
    )
}

const FormikSignUpForm = withFormik({
    mapPropsToValues({firstname, lastname, email, password, confirmPassword, TOS}) {
        return {
            firstname: firstname || '',
            lastname: lastname || '',
            email: email || '',
            password: password || '',
            confirmPassword: confirmPassword || '',
            TOS: TOS || false
        };
    },

    validationSchema: Yup.object().shape({
        firstname: Yup.string().required("You must enter a first name.").label(),
        lastname: Yup.string().required("You must enter a first name."),
        title: Yup.string().required("Select a title, foul fiend!"),
        email: Yup.string().email("Not a valid email address.").required("You must enter a valid email address."),
        password: Yup.string().min(8, "Password must be at least 8 characters.").required("You must enter a password."),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords do not match.").required("You must confirm your password."),
        TOS: Yup.bool().oneOf([true],"You must accept the terms and conditions to continue.")
    }),

    handleSubmit(values, { setStatus, resetForm }) {
        axios
            .post('https://reqres.in/api/users/', values)
            .then(res => {
                setStatus(res.data);
                console.log(res.data)
                resetForm();
            })
            .catch(err => console.log(err.response));
    }

})(SignUpForm);

export default FormikSignUpForm;