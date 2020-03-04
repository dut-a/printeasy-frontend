import React, { Component } from 'react';
import { connect } from "react-redux";
import { Textfield } from "react-mdl";
import {
  loggedIn,
  formatDate,
  getCurrentUserId,
  getRequestConfig,
  getCurrentUserAddress,
  getServiceOfferings,
  roundNumber
} from '../common/generalfuncs';
import { createOrder } from '../actions/orders';
import { fetchUsers } from '../actions/users';
import { fetchServices } from '../actions/services';

class PlaceOrder extends Component {

  constructor(props) {
    super(props)
    this.state = this.getAllFields();
  }

  getAllFields = () => {
    return {
      print_type: "",
      number_of_copies: 1,
      ordered_by: getCurrentUserId(), // logged in user (id)
      payment_method: "Online",
      fulfilled_by: "",
      payment_status: "", // dependent on payment_method
      pickup_location: "", // dependent on pickup_type, selected merchant's location
      pickup_type: "",
      delivery_address: "", // dependent on pickup_type, logged in user's address
      placed_on: formatDate(new Date()), // current date
      estimated_completion_time: "", // dependent on print_type + number of copies
      status: "unstarted", // one of ["unstarted", "in progress", "completed"]; defaults to 'unstarted'
      user_id: getCurrentUserId(), // same as 'ordered_by'
      service_id: "", // selected 'print_type' (id)
      total_cost: 0.00
    };
  };

  componentDidMount() {
    if (loggedIn()) {
      this.props.fetchUsers(getRequestConfig());
      this.props.fetchServices(getRequestConfig());
    } else {
      this.props.history.push("/login");
    }
  }

  getCurrentServices = () => this.props.services;
  getCurrentUsers = () => this.props.users;
  getSelectedService = () => {
    return getServiceOfferings(this.getCurrentServices(), this.state.print_type).filter(so => so.user.name === this.getSelectedMerchant().name)[0];
  }

  // getServiceOfferings = () => {
  //   return this.getCurrentServices().filter(service => 
  //     service.service_type === this.state.print_type);
  // }
  getSelectedMerchant = () => {
    return JSON.parse(this.state.fulfilled_by);
  }

  getCompletionTime = () => {
    // service_type completion time * number of copies
    const t = parseInt(this.getSelectedService().time_to_complete.split(" ")[0]);
    const n = parseInt(this.state.number_of_copies);
    const total = t * n;
    const s = total === 1 ? "" : "s";
    return `${total} hour${s}`;
  }

  calculateTotal = () => {
    // service 'cost' * 'number of copies'
    const unitCost = parseInt(this.getSelectedService().cost);
    console.log("current service:", this.getSelectedService());
    // const unitCost = 5.05;
    const numCopies = parseInt(this.state.number_of_copies);
    console.log("currentTotal", roundNumber((unitCost * numCopies)))
    return roundNumber((unitCost * numCopies));
  }

  getFileToPrint = () => {
    let f = document.querySelector('input[type="file"]');
     return f !== null ? f.files[0] : null;
  }

  updateData = e => {
    this.setState({
      [e.target.name]: e.target.value,
      doc_to_print: this.getFileToPrint(),
      // total_cost: this.calculateTotal()
    });
  }

  createOrder = e => {
    e.preventDefault();
    const orderData = new FormData();
    const p_stat = this.state.payment_method.toLowerCase() === "online" ? "paid" : "unpaid";
    let modifiedStateData = {
      ...this.state,
      payment_status: p_stat, // dependent on payment_method
      fulfilled_by: this.getSelectedMerchant().id, // selected merchant (id)
      pickup_location: this.getSelectedMerchant().physical_address, // dependent on pickup_type, selected merchant's location
      delivery_address: getCurrentUserAddress(), // dependent on pickup_type, logged in user's address
      estimated_completion_time: this.getCompletionTime(), // dependent on print_type + number of copies
      service_id: this.getSelectedService().id, // selected 'service type' (id),
      total_cost: this.calculateTotal()
    }
    for (let value in modifiedStateData) {
      orderData.append(value, modifiedStateData[value]);
    }
    this.props.createOrder(orderData);
    this.setState(this.getAllFields()); // reset the component state values
    /** 
     * TODO: Ensure there is no error from user creation before sending to login.
     */
    this.props.history.push("/orders");
    // this.props.history.push("/home");
  }

  render() {
    // console.log("placeOrder(PROPS)", this.props)
    console.log("placeOrder(state)", this.state)
    // let user = this.getSelectedService() !== undefined ? this.getSelectedService().user : "no user"
    // let offerers = this.getServiceOfferings() !== [] ? this.getServiceOfferings() : "Nothing here"
    // let s = this.getSelectedService() !== undefined ? this.getSelectedService() : "no service"
    // console.log(user);
    // console.log(s);
    // console.log(offerers);
    if (this.state.fulfilled_by !== "")
        console.log(this.getSelectedService())
    // console.log("select mer", this.getSelectedMerchant());
    return (
      <div className="App">
        <div>
          <h1>Place Order</h1>
        <form onSubmit={this.createOrder}>
          <div className="mdl-textfield">
            <label htmlFor="print_type">Print type</label>
            <select
              id="print_type"
              name="print_type"
              onChange={this.updateData}
              value={this.state.print_type}
              className="form-control form-control-sm"
              style={{ width: "200px" }}
              >
              <option value="" disabled>---select---</option>
              {
                this.getCurrentServices().map(s => <option key={s.id} value={s.service_type}>{s.service_type}</option>)
              }
            </select>
          </div>
          <div className="mdl-textfield">
            <label htmlFor="fulfilled_by">Merchant</label>
            <select
              id="fulfilled_by"
              name="fulfilled_by"
              onChange={this.updateData}
              value={this.state.fulfilled_by}
              className="form-control form-control-sm"
              style={{ width: "200px" }}
              >
              <option value="" disabled>---select---</option>
              {
                getServiceOfferings(this.getCurrentServices(), this.state.print_type).map(offering => <option key={offering.user.id} value={JSON.stringify(offering.user)}>{offering.user.name}</option>)
              }
            </select>
          </div>

          <div className="mdl-textfield">
            <Textfield
              id="number_of_copies"
              name="number_of_copies"
              onChange={this.updateData}
              value={this.state.number_of_copies}
              pattern="[0-9]+"
              error="'Number of copies' must be a number."
              label="Number of copies"
              floatingLabel
              style={{ width: "200px" }}
            />
          </div>

          <div className="mdl-textfield">
            <label htmlFor="payment_method">Payment method</label>
            <select
              id="payment_method"
              name="payment_method"
              onChange={this.updateData}
              value={this.state.payment_method}
              className="form-control form-control-sm"
              style={{ width: "200px" }}
              >
              <option value="" disabled>---select---</option>
              <option value="In person">In person</option>
              <option value="Online">Online</option>
            </select>
          </div>

          <div className="mdl-textfield">
            <label htmlFor="pickup_type">Pickup type</label>
            <select
              id="pickup_type"
              name="pickup_type"
              onChange={this.updateData}
              value={this.state.pickup_type}
              className="form-control form-control-sm"
              style={{ width: "200px" }}
              >
              <option value="" disabled>---select---</option>
              <option value="In person">In person</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>

          <div className="mdl-textfield">
            <label
              htmlFor="doc_to_print">Document
            </label>
            <input
              id="doc_to_print"
              name="doc_to_print"
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.rtf,.txt"
              onChange={this.updateData}
              // value={this.state.doc_to_print} /* This will error out, don't do it! */
              className=""
              type="file"
            />
          </div>

          <div className="mdl-textfield">
            {/* TODO: make this work or delete it */}
            <label><strong>Total</strong>: </label>
            <span>${this.state.total_cost}</span>
          </div>
          <div>
            <input type="submit" value="Place order" className="btn btn-sm btn-success" />
          </div>
        </form>
        </div>
      </div>
    );
  }
};
const mapStateToProps = state => {

  let currentServices = state.services.services;
  if (currentServices === undefined) {
    currentServices = state.services;
  }

  let currentUsers = state.users.users;
  if (currentUsers === undefined) {
    currentUsers = state.users;
  }

  return {
    users: currentUsers,
    services: currentServices
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: conf => dispatch(fetchUsers(conf)),
    fetchServices: conf => dispatch(fetchServices(conf)),
    createOrder: order => dispatch(createOrder(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);

