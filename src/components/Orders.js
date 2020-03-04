import React from 'react';
import { connect } from 'react-redux';
import { loggedIn, getRequestConfig, noData, getCurrentUserId, getCurrentUserType } from "../common/generalfuncs";
import { fetchOrders } from '../actions/orders';
import Order from './Order';

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

  renderOrders = () => this.getUserOrders().map(order => {
    return <Order key={order.id} print={order} handleClick={this.handleClick} />
  });
  
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
    console.log("CURRENT prints",this.props.prints)
    return (
      <div className="App">
        <div>
          <h1>My Orders</h1>
          <div className="container">
            <div className="row">
              <div className="col-10 note-list-container" style={{}}>
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


