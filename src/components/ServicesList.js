import React from 'react';
import { connect } from 'react-redux'


class ServicesList extends React.Component {
  state = { foo: 'bar'}
  
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>{/*-- temp --*/}<h1>All services</h1></span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loader: state.loader
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    thunkPlaceholder: () => {
      // dispatch(thunkPlaceholder())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ServicesList);