
import C from "../constants";
import fetch from "isomorphic-fetch";
import React from 'react';
import { connect } from 'react-redux';
import { loggedIn, getRequestConfig, noData, getCurrentUserId, getCurrentUserType, formatDateForSort } from "../common/generalfuncs";
import { fetchOrders } from '../actions/orders';
import $ from 'jquery';

// eslint-disable-next-line
import tablesorter from 'tablesorter'; // though unused, don't remove; it breaks '$.tablesorter'

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrder: ""
    };
  }

  componentDidMount() {
    if (loggedIn()) {
      this.props.fetchOrders(getRequestConfig());
    } else {
      this.props.history.push("/login");
    }
  }

  getUserOrders = () => this.props.prints.filter(or => {
    // console.log("current order", or)
    let ownedOrders = [];
    // console.log("current user type: ", getCurrentUserType());
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
          <tr key={order.id} onClick={() => this.handleClick(order)}>
            <td><img src={ require("../images/digital_printing_tn.jpg") }
              alt={ order.print_type } />{ order.print_type }</td>
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

  displayOrderDetails = order => {
    return (
        <div>
          <p><img src={ require("../images/digital_printing_tn.jpg") }
              alt={ order.print_type } />{ order.print_type }</p>
          <p>{ order.doc_to_print.url }</p>
          <p data-date={ formatDateForSort(order.placed_on) }>{ order.placed_on }</p>

          { getCurrentUserType() === "merchant" ?
          <p>{ order.user.first_name} { order.user.last_name }</p>
          : null }
          { getCurrentUserType() === "customer" ?
          <p>{ order.service.user.name }</p>
          : null }
          <p>{ order.status }</p>
        </div>
    );
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
              { /* set initial order */
                // this.setState({currentOrder: this.getUserOrders()[0] })
              }
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
    this.setState({
      currentOrder: order
    });
    console.log("order (state):", this.state.currentOrder)
    // this.displayOrderDetails(order);
  }




editPrint = printData => dispatch => {
  let p = {"status": "EDITED"}
  let reqConf = {
    method: C.HTTP.PATCH,
    headers: C.HTTP.HEADERS,
    body: JSON.stringify(p)
  }
  // dispatch(startAdding());
  fetch(C.URLS.prints, reqConf)
    .then(response => response.json())
    .then(data => {
      // TODO: How about returning 'fetch' object from above and doing this 'then' in the calling context?
      // dispatch(addUser(data.user));
      console.log("PRINT data (PATCH)", data);
      // dispatch(finishAdding()); // TODO: should this be here?
    })
    .catch(error => {
      // dispatch(addError(error.message));
      // dispatch(finishAdding());
    });
}

  render() {

    // table data sorting
    $(function() {
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

    // console.log("CURRENT prints",this.props.prints)
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


