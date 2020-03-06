import React from 'react';
import {connect} from 'react-redux'
import { loggedIn } from '../common/generalfuncs';

class Help extends React.Component {

  componentDidMount() {
    if (loggedIn()) {
      // this.props.fetchUsers(getRequestConfig());
      // this.props.fetchServices(getRequestConfig());
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>Help</h1>
          <p>Implement tip on how to use this system here...</p>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => {
      dispatch({type: 'LOGIN_USER', user})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Help);


