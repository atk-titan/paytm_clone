import React from 'react';

const Subheading = (props) => {
  return (
    <h3 className=' text-slate-600 text-md mb-4'>
        {props.label}
    </h3>
  );
}

export default Subheading;