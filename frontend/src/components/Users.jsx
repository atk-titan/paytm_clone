import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Users = (props) => {
    const Navigate = useNavigate();
  return (
    <div className='h-14 p-4 w-full flex items-center justify-between text-xl'>
        <div className='flex items-center'>
            <div className='h-7 w-7 rounded-full bg-slate-400 flex items-center justify-center'>
                {props.label[0].toUpperCase()}
            </div>
            <h1 className='pl-2'>{props.label}</h1>
        </div>
        <div className='text-sm font-bold' >
            <Button label='Send Money' onClick={()=>Navigate("/send?id="+props._id+"&name="+props.label)}/>
        </div>
    </div>
  );
}

export default Users;