import React from 'react';

const Button = (props) => {
    return (
      <button className="w-full p-2 bg-black text-white rounded hover:bg-slate-500 transition-colors" onClick={props.onClick}>
        {props.label}
      </button>
    );
}

export default Button;