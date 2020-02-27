import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'yellow'
    };
  }

  handleLogout = () => {
    localStorage.removeItem('auth_token');
    this.props.logout();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          PrintEasy &copy; { (new Date()).getFullYear() }
          <a href='https://www.dutad.com' className="nav-item nav-link" target="_blank">Dut A.</a> All rights reserved.
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps= (dispatch) => {
  return {
    logout: () => {
      dispatch({type: 'LOGOUT'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Footer));

