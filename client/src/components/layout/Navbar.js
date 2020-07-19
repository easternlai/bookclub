import React, {Fragment} from 'react';
import {Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({auth: {isAuthenticated, loading }, logout}) => {
    const authLinks = (
        <ul>
            <li>
                <Link to="/Dashboard">Dashboard</Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to="/Register">Register</Link>
            </li>
            <li> 
                <Link to="/Login">Login</Link>
            </li>
            <li>
                <a onClick={logout}>
                    Logout
                </a>
            </li>
        </ul>
    );

    return (
        <nav>
            <h1>
                <Link to="/">
                    Book Club
                </Link>
            </h1>
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
        </nav>
    )
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);