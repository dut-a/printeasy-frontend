import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { FaPrint } from 'react-icons/fa'

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'yellow'
    };
  }

  handleLogout = () => {
    localStorage.removeItem('auth_token');
    this.props.logout();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to='/home' className="navbar-brand">
            <div><FaPrint style={{marginRight: "4%"}}/>{this.props.title}</div>
            <div style={{fontSize: "8px"}}>{this.props.description}</div>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#top-navigation" aria-controls="top-navigation" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="top-navigation">
            <div className="navbar-nav">
              <Link to='/home' className="nav-item nav-link active">
                Home <span className="sr-only">(current)</span>
              </Link>
              <Link to='/orders' className="nav-item nav-link">
                My Orders
              </Link>
              <Link to='/order' className="nav-item nav-link">
                Place Order
              </Link>
              <Link to='/profile' className="nav-item nav-link">
                My Profile
              </Link>
              <Link to='/help' className="nav-item nav-link">
                help
              </Link>
            </div>
          </div>

          <div className="float-right">
            <div className="item">
              {
                this.props.auth
                ? 
                <div onClick={this.handleLogout} className="btn btn-sm btn-warning">Logout</div>
                  :
                <Link to='/login' className="btn btn-sm btn-primary">Login</Link>
              }
            </div>
          </div>
        </nav> { /* End: <nav> */ }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps= (dispatch) => {
  return {
    logout: () => {
      dispatch({type: 'LOGOUT'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopNav));

