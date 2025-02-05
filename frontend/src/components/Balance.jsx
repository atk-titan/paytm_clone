import React from 'react';

const Balance = (props) => {
  return (
    <div className='p-3 pt-14 text-xl font-semibold'>
        <h1>Your Balance Rs. {props.amount}</h1>
    </div>
  );
}

export default Balance;