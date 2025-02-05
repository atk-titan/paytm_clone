import React, { useState } from 'react';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import axios from 'axios';

const SignUp = () => {

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


  return (
    <div className='h-screen bg-slate-300 flex items-center justify-center lg:grid lg:grid-cols-3 place-items-center'>
     
        <div className=' lg:col-end-3 lg:col-span-1 px-10 py-4 flex items-center flex-col bg-white rounded-2xl text-center'>
          <Heading title="Sign Up" />
          <Subheading label="Enter your information to create your Account"/>
          <InputBox label='First Name' placeholder='john' type='text' onChange={(e)=>{
            setFirstName(e.target.value)
          }}/>
          <InputBox label='Last Name' placeholder='doe' type='text' onChange={(e)=>{
            setLastName(e.target.value)
          }}/>
          <InputBox label='email' placeholder='jdoe@email.com' type='email' onChange={(e)=>{
            setEmail(e.target.value)
          }}/>
          <InputBox label='Password' placeholder='password' type='password' onChange={(e)=>{
            setPassword(e.target.value)
          }}/>
          <div className='w-full mt-8'>
            <Button label="Sign Up" onClick={async ()=>{
              const response = await axios.post('http://localhost:3000/api/v1/user/signup',{
                UserName: email,
                FirstName:firstName,
                LastName:lastName,
                password:password
              });
              if(response.data.token){
                Navigate('/dashboard');
              }
              localStorage.setItem("token",response.data.token);
            }}/>
          </div>
          <BottomWarning label='Already have an Account' button='Sign In' to='/signin'/>
        </div>
      
    </div>
  );
}

export default SignUp;