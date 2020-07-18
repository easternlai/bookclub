import React, {Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {Link, Redicrect } from 'react-router-dom';
import ProtoTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login  }) =>{

    const [formData, setFormData ] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e=> setFormData ({...formData, [e.target.name]: e.target.vaule});

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    }

    <Fragment>
        
    </Fragment>
}

Login.propTypes = {
 login: PropTypes.func.isRequired
}

export default connect (null, { login })(Login);