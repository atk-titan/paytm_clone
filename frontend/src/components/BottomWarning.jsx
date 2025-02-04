import React from 'react';
import { useNavigate } from 'react-router-dom';

const BottomWarning = (props) => {
    const Navigate = useNavigate();

    const handleClick=()=>{
        const arr = props.button.toLowerCase().split(' ');
        let path='';
        for(let i=0;i<arr.length;i++){
            path+=arr[i];
        }
        path= '/'+path;
        Navigate(path);
    }

  return (
    <div className='w-full p-1.5'>
        {props.label}?{"  "} 
        <span className='cursor-pointer underline hover:text-slate-500' onClick={handleClick}>
            {props.button}
        </span>
    </div>
  );
}

export default BottomWarning;