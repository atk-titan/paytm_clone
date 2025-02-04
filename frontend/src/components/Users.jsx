import React from 'react';
import InputBox from './InputBox';

const Users = () => {
  return (
    <div className='p-3'>
        <InputBox label='Users' placeholder='Search Users...' type='text' for='dash'/>
    </div>
  );
}

export default Users;