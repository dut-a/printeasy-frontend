
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {Textfield} from "react-mdl";
import C from '../constants';
import { createUser } from "../actions/users";

class Signup extends Component {
  getFields = () => {
    return {
      username: "",
      password: "",
      user_type: "",
      bio: "",
      picture: "",
      phone_number: "",
      email_address: "",
      physical_address: "", // TODO: Make this into an 'Address' object creation
      name: null, // merchant
      first_name: null, // customer
      middle_name: null, // customer
      last_name: null, // customer
      fax_number: null, // merchant
      website: null, // merchant
      business_hours: null // merchant
    };
  };

  constructor(props) {
    super(props)
    this.state = this.getFields();
  }

  updateData = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createUser = e => {
    e.preventDefault();
    const reqObj = {
      method: C.HTTP.POST,
      headers: C.HTTP.HEADERS,
      body: JSON.stringify({user: this.state})
    };

    fetch(C.URLS.USERS, reqObj)
    .then(resp => resp.json())
    .then(data => {
      console.log("USER data (Login)", data);
      if (!data.error) {
        this.props.history.push("/login");
      } else {
        console.log(data.error);
      }
    });

    // reset state
    this.setState(this.getFields());
  }

  render() {
    console.log("values in state (Login)", this.state);
    return (
      <div>
        <h3>Sign UP</h3>
        <form onSubmit={this.createUser}>
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
            { /* Not textfield */}
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
          <div className="mdl-textfield">
            { /* Not textfield */}
            <Textfield
              id="user_type"
              name="user_type"
              onChange={this.updateData}
              value={this.state.user_type}
              label="User Type"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>
          <div className="mdl-textfield">
            { /* Not textfield */}
            <Textfield
              id="bio"
              name="bio"
              onChange={this.updateData}
              value={this.state.bio}
              label="Bio"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>
          <div className="mdl-textfield">
            { /* Not textfield */}
            <Textfield
              id="picture"
              name="picture"
              onChange={this.updateData}
              value={this.state.picture}
              label="Picture"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>
          <div className="mdl-textfield">
            { /* Not textfield */}
            <Textfield
              id="phone_number"
              name="phone_number"
              onChange={this.updateData}
              value={this.state.phone_number}
              label="Phone Number"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>
          <div className="mdl-textfield">
            { /* Not textfield */}
            <Textfield
              id="email_address"
              name="email_address"
              onChange={this.updateData}
              value={this.state.email_address}
              label="Email Address"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>
          <div className="mdl-textfield">
            <Textfield
              id="physical_address"
              name="physical_address"
              onChange={this.updateData}
              value={this.state.physical_address}
              label="Physical Address"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>

          { /** BEGIN: customer-specific */}
          <div className="mdl-textfield">
            <Textfield
              id="first_name"
              name="first_name"
              onChange={this.updateData}
              value={this.state.first_name}
              label="First Name"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>
          
          { /* TODO: Group customer-specific fields in a method */
          (this.state.user_type === "customer") ?
          <div className="mdl-textfield">
            <Textfield
              id="middle_name"
              name="middle_name"
              onChange={this.updateData}
              value={this.state.middle_name}
              label="Middle Name"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>
          : null }
          <div className="mdl-textfield">
            <Textfield
              id="last_name"
              name="last_name"
              onChange={this.updateData}
              value={this.state.last_name}
              label="Last Name"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>
          { /** END: customer-specific */}

          { /** BEGIN: merchant-specific */}
          { /* TODO: Group merchant-specific fields in a method */
          (this.state.user_type === "merchant") ?
          <div className="mdl-textfield">
            <Textfield
              id="name"
              name="name"
              onChange={this.updateData}
              value={this.state.name}
              label="Company Name"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>
          : null }
          <div className="mdl-textfield">
            { /* Not textfield */}
            <Textfield
              id="fax_number"
              name="fax_number"
              onChange={this.updateData}
              value={this.state.fax_number}
              label="Fax Number"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>
          <div className="mdl-textfield">
            { /* Not textfield */}
            <Textfield
              id="website"
              name="website"
              onChange={this.updateData}
              value={this.state.website}
              label="Website"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>
          <div className="mdl-textfield">
            <Textfield
              id="business_hours"
              name="business_hours"
              onChange={this.updateData}
              value={this.state.business_hours}
              label="Business Hours"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>
          { /** END: merchant-specific */}

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
    createUser: user => dispatch(createUser(user))
  }
}

export default connect(null, mapDispatchToProps)(Signup);

