import React from 'react';

const Balance = () => {
    const amount = 10000;
  return (
    <div className='p-3 pt-14 text-xl font-semibold'>
        <h1>Your Balance Rs. {amount}</h1>
    </div>
  );
}

export default Balance;