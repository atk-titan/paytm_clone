import React, { useState } from 'react';
import Heading from '../components/Heading';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import axios from 'axios';

const Send = () => {

  const Navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const id=searchParams.get("id");
  const name=searchParams.get("name");

  const [amount,setAmount] = useState(0);

  const transferFund = async ()=>{
    const response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
      amount:amount,
      to: id,
    },{
      headers:{
        Authorization:"Bearer "+localStorage.getItem("token")
      }
    });

    if(response.data.msg==="Transfer successful"){
      alert(response.data.msg)
      Navigate('/dashboard')
    }
  }

  return (
    <div className='h-screen w-screen bg-slate-100 flex items-center justify-center md:grid md:grid-cols-4'>
      <div className='p-7 bg-white shadow-2xl rounded-2xl flex-col w-[80%] md:col-end-4 md:col-span-2 text-center'>
        <Heading title='Send Money'/>
        <div className='mt-7 flex items-center'>
            <div className='h-10 w-10 rounded-full bg-slate-400 flex items-center justify-center'>
                {name[0].toUpperCase()}
            </div>
            <h1 className='pl-2'>{name.toUpperCase()}</h1>
        </div>
        <InputBox label='Amount' placeholder='amount' type='number' onChange={(e)=>{
              setAmount(Number(e.target.value));
        }}/>
        <div className='mt-14'>
          <Button label="Send" onClick={transferFund}/>
        </div>
      </div>
    </div>
  );
}

export default Send;