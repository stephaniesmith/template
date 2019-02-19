import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startLogin } from '../actions/auth';

export const Login = ({ startLogin }) => {
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">React App</h1>
        <p>App tagline.</p>
        <button className="button" onClick={startLogin}>Login with Google</button>
      </div>
    </div>
  );
};

Login.propTypes = {
  startLogin: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(Login);

