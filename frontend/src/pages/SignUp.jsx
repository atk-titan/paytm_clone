import React from 'react';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';

const SignUp = () => {
  return (
    <div className='h-screen  items-center grid grid-cols-3 place-items-center'>
      <div className='bg-slate-300 col-end-3 col-span-1'>
        <div className='m-28 px-10 py-4 flex items-center flex-col bg-white rounded-2xl text-center'>
          <Heading title="Sign Up" />
          <Subheading label="Enter your information to create your Account"/>
          <InputBox label='First Name' placeholder='john'/>
          <InputBox label='Last Name' placeholder='doe'/>
          <InputBox label='email' placeholder='jdoe@email.com'/>
          <InputBox label='Password' placeholder='password'/>
          <div className='w-full mt-8'>
            <Button label="Sign Up"/>
          </div>
          <BottomWarning label='Already have an Account' button='Sign In'/>
        </div>
      </div>
    </div>
  );
}

export default SignUp;