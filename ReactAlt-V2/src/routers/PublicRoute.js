import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route {...rest} component={props => isAuthenticated
      ? <Redirect to="/dashboard"/>
      : <Component {...props}/>}
    />
  );
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  component: PropTypes.func
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);
