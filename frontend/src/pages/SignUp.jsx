import React from 'react';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';

const SignUp = () => {
  return (
    <div className='h-screen bg-slate-300 flex items-center justify-center lg:grid lg:grid-cols-3 place-items-center'>
     
        <div className=' lg:col-end-3 lg:col-span-1 px-10 py-4 flex items-center flex-col bg-white rounded-2xl text-center'>
          <Heading title="Sign Up" />
          <Subheading label="Enter your information to create your Account"/>
          <InputBox label='First Name' placeholder='john' type='text'/>
          <InputBox label='Last Name' placeholder='doe' type='text'/>
          <InputBox label='email' placeholder='jdoe@email.com' type='email'/>
          <InputBox label='Password' placeholder='password' type='password'/>
          <div className='w-full mt-8'>
            <Button label="Sign Up"/>
          </div>
          <BottomWarning label='Already have an Account' button='Sign In' to='/signin'/>
        </div>
      
    </div>
  );
}

export default SignUp;