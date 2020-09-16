
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
// eslint-disable-next-line
import logo from "../logo.svg";
import "../App.css";
import "../App-more.css";
import "../css/little-app-table.css"
import "../css/generic.css"
// eslint-disable-next-line
import ServicesList from "./ServicesList";
import Home from "./Home";
import Orders from "./Orders";
import Profile from "./Profile";
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
        {/* <Home /> TODO: Make this a landing page on app launch */}
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/orders" component={Orders} />
          <Route path="/order" component={PlaceOrder} />
          <Route path="/profile" component={Profile} />
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

