import React from "react";
import {connect} from "react-redux";
import C from "../constants";
import { loginUser } from "../actions/users";

class Home extends React.Component {

  componentDidMount() {
    const token = localStorage.getItem(C.LS.AUTH);
    if (!token) {
      this.props.history.push("/login");
    } else {
      const reqObj = {
        method: C.HTTP.GET,
        headers: {
          ...C.HTTP.HEADERS,
          "Authorization": `Bearer ${token}`
        }
      };

      fetch(C.URLS.PROFILE, reqObj)
      .then(resp => resp.json())
      .then(data => {
        this.props.loginUser({
          username: data.user.username,
          id: data.user.id
        });
        console.log("user data", data);
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>Home</h1>
          <p>Implement listing of all available services here...</p>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(loginUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

