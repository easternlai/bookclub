import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export const Landing = ({isAuthenticated}) => {
    if(isAuthenticated){
        return <Redirect to='/dashboard'/>;
    }

    return (
        <section>
        <h1>Book Club Landing</h1>
        <Link to='/register'>Sign up</Link>
        <Link to='/login'>Login</Link>
        </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);