import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register}) => {
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password:'',
        password2:''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [ e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
            if(password !== password2){
                setAlert("Passwords do not match", 'danger');
            }else{
                register({name, email, password});
            }
    }

    return <Fragment>
        <h1>Sign up</h1>
        <form onSubmit={(e)=>onSubmit(e) }>
            <input type='text' placeholder="Name" name="name" value={name} onChange={e => onChange(e)} />
            <input type='email' placeholder="Email" name="email" value={email} onChange={e => onChange(e)} /> 
            <input type='password' placeholder="Password" name="password" value={password} onChange={e => onChange(e)} /> 
            <input type='password' placeholder="Confirm Password" name="password2" value={password2} onChange={e => onChange(e)} /> 
            <input type='submit' value="Register"/>
        </form>

    </Fragment>
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
}

export default connect(null, {setAlert, register})(Register);