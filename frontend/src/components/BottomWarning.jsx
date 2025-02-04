import React from 'react';
import { useNavigate } from 'react-router-dom';

const BottomWarning = (props) => {
    const Navigate = useNavigate();

    const handleClick=()=>{
        Navigate(props.to);
    }

  return (
    <div className='w-full p-1.5'>
        {props.label}?{"  "} 
        <span className='cursor-pointer underline hover:text-slate-500 transition-colors' onClick={handleClick}>
            {props.button}
        </span>
    </div>
  );
}

export default BottomWarning;