
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Textfield } from "react-mdl";
import C from '../constants';
import { loginUser } from "../actions/users";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "dut",
      password: "dut"
    };
  }

  updateData = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  login = e => {
    e.preventDefault();
    const reqObj = {
      method: C.HTTP.POST,
      headers: C.HTTP.HEADERS,
      body: JSON.stringify({ user: this.state })
    };

    fetch(C.URLS.LOGIN, reqObj)
      .then(resp => resp.json())
      .then(data => {
        console.log("login", data)
        if (!data.error) {
          localStorage.setItem(C.LS.USER, JSON.stringify({
            auth_token: data.auth_token,
            user_id: data.user.id,
            username: data.user.username,
            user_type: data.user.user_type.toLowerCase(),
            addr: data.user.physical_address
          }));
          this.props.loginUser({
            id: data.user.id,
            username: data.user.username
          });
          this.props.history.push("/home");
        } else {
          console.log("ERROR -> Login():", data.error);
        }
    });

    // reset state
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
      <div>
        <h3>Sign in</h3>
        <form onSubmit={this.login}>
          <div className="mdl-textfield">
            <Textfield
              id="username"
              name="username"
              onChange={this.updateData}
              value={this.state.username}
              label="Username"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>
          <div className="mdl-textfield">
            <Textfield
              id="password"
              name="password"
              onChange={this.updateData}
              value={this.state.password}
              label="Password"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>
          <div>
            <input type="submit" value="Login" className="btn btn-success" />
          </div>
          <div style={{marginTop: "5%"}}>
            Don't have an account yet? &nbsp;&nbsp;
            <Link to="/signup" className="nav-item nav-link">
              <input type="submit" value="Create Account" className="btn btn-primary" />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(loginUser(user))
  };
};

export default connect(null, mapDispatchToProps)(Login);

