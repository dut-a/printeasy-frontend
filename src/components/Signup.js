
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {Textfield} from "react-mdl";
import { createUser } from "../actions/users";

class Signup extends Component {

  constructor(props) {
    super(props)
    this.state = this.getAllFields();
  }

  getAllFields = () => {
    return {
      username: "",
      password: "",
      user_type: "",
      bio: "",
      picture: "",
      alt_picture: "",
      phone_number: "",
      email_address: "",
      physical_address: "", // TODO: Make this into an 'Address' object creation
      name: "", // merchant
      first_name: "", // customer
      middle_name: "", // customer
      last_name: "", // customer
      fax_number: "", // merchant
      website: "", // merchant
      business_hours: "", // merchant
      pic: ""
    };
  };

  getCustomerOnlyFields = () => {
    return (
      <span>
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
      </span>
    );
  }

  getMerchantOnlyFields = () => {
    return (
      <span>
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
      </span>
    );
  }

  updateData = e => {
    this.setState({
      [e.target.name]: e.target.value,
      picture: document.querySelector('input[type="file"]').files[0]
    })
  }

  createUser = e => {
    e.preventDefault();
    const userData = new FormData();
    for (let value in this.state) {
      userData.append(value, this.state[value]);
    }
    this.props.createUser(userData);
    this.setState(this.getAllFields()); // reset the component state values
    /** 
     * TODO: Ensure there is no error from user creation before sending to login.
     */
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="container" style={{backgroundColor: "rgba(255, 255, 255, 0.95)"}}>
        <h3>Create an Account</h3>
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

          <div className="mdl-textfield hidden">
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
            <label htmlFor="user_type">User Type</label>
            <select
              id="user_type"
              name="user_type"
              onChange={this.updateData}
              value={this.state.user_type}
              className="form-control form-control-sm"
              style={{ width: "200px" }}
              >
              <option value="" disabled>---select---</option>
              <option value="Customer">Customer</option>
              <option value="Merchant">Merchant</option>
            </select>
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
              rows={6}
              maxRows={12}
              style={{ width: "200px" }}
            />
          </div>

          <div className="mdl-textfield custom-file">
            <input
              id="picture"
              name="picture"
              accept="image/*"
              onChange={this.updateData}
              // value={this.state.picture} /* This will error out, don't do it! */
              className="custom-file-input"
              type="file"
            />
            <label
              className="custom-file-label"
              htmlFor="picture">Picture
            </label>
          </div>

          <div className="mdl-textfield">
            { /* Not textfield */}
            <Textfield
              id="alt_picture"
              name="alt_picture"
              onChange={this.updateData}
              value={this.state.alt_picture}
              label="Alt remote picture URL"
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

          { (this.state.user_type.toLowerCase() === "customer") ? this.getCustomerOnlyFields() : null }

          { (this.state.user_type.toLowerCase() === "merchant") ? this.getMerchantOnlyFields() : null } 

          <div>
            <input type="submit" value="Create Account" className="btn btn-success"
              style={{
                width: 25 + "%",
                height: 50 + "px",
                borderRadius: 50 + "px",
                fontSize: 1.95 + "em"
              }} />
          </div>
          <div style={{marginTop: "5%"}}>
            Already have an account yet? &nbsp;
            <Link to="/login" className="nav-item nav-link">
              <input type="submit" value="Login" className="btn btn-primary" />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createUser: user => dispatch(createUser(user))
  }
}

export default connect(null, mapDispatchToProps)(Signup);

