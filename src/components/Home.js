import React from "react";
import { connect } from "react-redux";
import { fetchServices } from "../actions/services";
import { loggedIn, getRequestConfig, noData } from "../common/generalfuncs";
import Service from "./Service";

class Home extends React.Component {

  componentDidMount() {
    if (loggedIn()) {
      this.props.fetchServices(getRequestConfig());
    } else {
      this.props.history.push("/login");
    }
  }

  getCurrentServices = () => this.props.services;

  renderServices = () => this.getCurrentServices().map(service => {
    return <Service key={service.id} service={service} handleClick={this.handleClick} />
  });
  
  handleLoading = () => {
    if (this.props.fetching) {
      return <div>Loading Data...</div>
    } else {
      return this.renderServices();
    }
  }

  handleClick = service => {
    console.log("clicked:", service)
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>Home</h1>
          <div className="container">
            <div className="row">
              <div className="col-10 note-list-container" style={{}}>
                { this.getCurrentServices().length > 0 ?
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
  let currentServices = state.services.services;
  if (currentServices === undefined) {
    currentServices = state.services;
  }
  return {
    auth: state.auth,
    services: currentServices,
    fetching: state.fetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchServices: conf => dispatch(fetchServices(conf))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

