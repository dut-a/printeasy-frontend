import React from 'react';
 
const Order = props => {
  return (
    <div className="print-list" onClick={() => props.handleClick(props.print)}>
      <h1>{props.print.print_type}</h1>
      <p>Ordered by: {props.print.ordered_by}</p>
      <p>Fulfilled by: {props.print.fulfilled_by}</p>
    </div>
  );
};
 
export default Order;

