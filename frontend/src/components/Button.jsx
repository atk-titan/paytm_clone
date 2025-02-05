import React from 'react';

const Button = (props) => {
    return (
      <button className="w-full py-3 px-6 bg-black text-white rounded-md hover:bg-slate-500 transition-colors" onClick={props.onClick}>
        {props.label}
      </button>
    );
}

export default Button;