import React from 'react';
import InputBox from './InputBox';

const SearchUsers = (props) => {
  return (
    <div className='p-3'>
        <InputBox label='Users' placeholder='Search Users...' type='text' for='dash'onChange={props.onChange}/>
    </div>
  );
}

export default SearchUsers;