import React from 'react';

const Heading = (props) => {
  return (
    <div>
        <h1 className='text-3xl font-bold p-4'>{props.title}</h1>
    </div>
  );
}

export default Heading;