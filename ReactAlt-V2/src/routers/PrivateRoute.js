import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route {...rest} component={props => isAuthenticated
      ? (
        <div>
          <Header/>
          <Component {...props}/>
        </div>
      )
      : <Redirect to="/"/>}
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  component: PropTypes.func
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
