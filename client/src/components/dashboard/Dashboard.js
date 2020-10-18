import React,{useEffect,Fragment} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Dashboard = ({ 
    auth: { user }
}) => {
    return <Fragment>
        <h1>Dashboard</h1>
        <h2> Welcome {user && user.name}</h2>

    </Fragment>
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Dashboard);