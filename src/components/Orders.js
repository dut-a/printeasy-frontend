import React from 'react';
import { connect } from 'react-redux';
import { loggedIn, getRequestConfig, noData, getCurrentUserId, getCurrentUserType, formatDateForSort } from "../common/generalfuncs";
import { fetchOrders } from '../actions/orders';
import Order from './Order';
import $ from 'jquery';
import * as tableSorter from "tablesorter";

class Orders extends React.Component {

  componentDidMount() {
    if (loggedIn()) {
      this.props.fetchOrders(getRequestConfig());
    } else {
      this.props.history.push("/login");
    }
  }

  getUserOrders = () => this.props.prints.filter(or => {
    console.log("current order", or)
    let ownedOrders = [];
    console.log("current user type: ", getCurrentUserType());
    if (getCurrentUserType() === "merchant") {
      ownedOrders = or.fulfilled_by === getCurrentUserId();
    } else if (getCurrentUserType() === "customer") {
      ownedOrders = or.ordered_by === getCurrentUserId();
    }
    return ownedOrders;
  });

  displayRow = () => {
    return this.getUserOrders().map(order => {
      return (
          <tr>
            <td><img src={ require("../images/t/course_0065.jpg") } />{ order.print_type }</td>
            <td>{ order.doc_to_print.url }</td>
            <td data-date={ formatDateForSort(order.placed_on) }>{ order.placed_on }</td>

            { getCurrentUserType() === "merchant" ?
            <td>{ order.user.first_name} { order.user.last_name }</td>
            : null }
            { getCurrentUserType() === "customer" ?
            <td>{ order.service.user.name }</td>
            : null }
            <td>{ order.status }</td>
          </tr>
      );
    });
  }

  renderOrders = () => {
    return (
      <div>
        <header>
          <h1>My Orders</h1>
        </header>
        <article>
          <p>Your placed orders so far.</p>
          <table id="orders" className="focus-highlight">
            <thead>
              <tr>
                <th>Order type</th>
                <th>Document</th>
                <th>Placed on</th>
                { getCurrentUserType() === "merchant" ?
                <th>Customer</th>
                : null }
                { getCurrentUserType() === "customer" ?
                <th>Merchant</th>
                : null }
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              { this.displayRow() }
            </tbody>
          </table>
        </article>
      </div>
    );
  };
  
  handleLoading = () => {
    if (this.props.fetching) {
      return <div>Loading Data...</div>
    } else {
      return this.renderOrders();
    }
  }

  handleClick = order => {
    console.log("clicked:", order)
  }

  render() {

    $(document).ready(function() {
      $.tablesorter.addParser({
        id: "getDateAttr",
        is: function(sort) { return false; },
        format: function(sort, table, cell, cellIndex) {
          return $(cell).attr("data-date");
        },
        type: "text"
      });

      $("table#orders").tablesorter({
        sortList: [[2,0]],
        cssAsc: "sorted asc",
        cssDesc: "sorted desc",
        headers: { 3: { sorter: "getDateAttr" } }
      });
    });

    console.log("CURRENT prints",this.props.prints)
    return (
      <div className="App">
        <div>
          <div className="container">
            <div className="row">
              <div className="col-12 note-list-container" style={{}}>
                { this.getUserOrders().length > 0 ?
                  this.handleLoading() : noData() }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  let userOrders = state.prints.prints;
  if (userOrders === undefined) {
    userOrders = state.prints;
  }
  return {
    auth: state.auth,
    prints: userOrders,
    fetching: state.fetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: conf => dispatch(fetchOrders(conf))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);


