import React from 'react';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';

const SignIn = () => {
  return (
    <div className='h-screen bg-slate-300 flex items-center justify-center lg:grid lg:grid-cols-3 place-items-center'>
     
        <div className=' lg:col-end-3 lg:col-span-1 px-6 py-4 pb-8 flex items-center flex-col bg-white rounded-2xl text-center'>
          <Heading title="Sign In" />
          <Subheading label="Enter your credentials to access your Account"/>
          <InputBox label='email' placeholder='jdoe@email.com' type='email'/>
          <InputBox label='Password' placeholder='password' type='password'/>
          <div className='w-full mt-8'>
            <Button label="Sign Ip"/>
          </div>
          <BottomWarning label="Don't have an Account" button='Sign Up' to='/signup'/>
        </div>
      
    </div>
  );
}

export default SignIn;