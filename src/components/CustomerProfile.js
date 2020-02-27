import React from 'react';
import {connect} from 'react-redux'

class CustomerProfile extends React.Component {

  componentDidMount() {
    const token = localStorage.getItem('auth_token')
    if(!token) {
      this.props.history.push('/login')
    } else {
      const reqObj = {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          "Accept": "applicatin/json",
          'Authorization': `Bearer ${token}`
        }
      }

      fetch('http://localhost:3000/api/v1/profile', reqObj)
      .then(resp => resp.json())
      .then(data => {
        this.props.loginUser({username: data.user.username, id: data.user.id}) 

        console.log('user data', data)
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>My Profile</h1>
          <p>Implement Logged in user's details here...</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile);


