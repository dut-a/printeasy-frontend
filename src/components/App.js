
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
// eslint-disable-next-line
import logo from "../logo.svg";
import "../App.css";
// eslint-disable-next-line
import ServicesList from "./ServicesList";
import Home from "./Home";
import CustomerOrders from "./CustomerOrders";
import CustomerProfile from "./CustomerProfile";
import Help from "./Help";
import PlaceOrder from "./PlaceOrder";
import Login from "./Login";
import TopNav from "./TopNav";
// eslint-disable-next-line
import Footer from "./Footer";
import Signup from "./Signup";

const App = () => {
  return (
    <Router>
      <div className="App">
        <TopNav icon="paint brush" title="PrintEasy" description="Want it on paper? just PrintEasy!" />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/orders" component={CustomerOrders} />
          <Route path="/order" component={PlaceOrder} />
          <Route path="/profile" component={CustomerProfile} />
          <Route path="/help" component={Help} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;

