
import React from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux"
import {Textfield} from "react-mdl"

class Signup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    this.setState({
      username: "",
      password: "",
    })

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "applicatin/json"
      },
      body: JSON.stringify({user: this.state})
    }

    fetch("http://localhost:3000/api/v1/login", reqObj)
    .then(resp => resp.json())
    .then(data => {
      if (!data.error) {
        localStorage.setItem("auth_token", data.auth_token)
        this.props.loginUser({username: data.user.username, id: data.user.id}) 
        this.props.history.push("/home") 
      } else {
        alert(data.error)
      }
      // redirect to about page
    })
  }

  render() {
    return (
      <div>
        <h3>Sign UP</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="mdl-textfield">
            <Textfield
              id="username"
              name="username"
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
              value={this.state.password}
              label="Password"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>
          <div>
            <input type="submit" value="Create Account" className="btn btn-sm btn-success" />
          </div>
          <div>
            Already have an account yet? &nbsp;
            <Link to="/login" className="nav-item nav-link">
              <input type="submit" value="Login" className="btn btn-sm btn-primary" />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => {
      dispatch({type: "LOGIN_USER", user})
    }
  }
}

export default connect(null, mapDispatchToProps)(Signup);

