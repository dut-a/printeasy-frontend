import React from 'react';
 
const Service = props => {
  return (
    <div className="service-list" onClick={() => props.handleClick(props.service)}>
      <h1>{props.service.service_type}</h1>
      <p>Offered by: {props.service.user.name}</p>
    </div>
  );
};
 
export default Service;

