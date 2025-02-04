import React from 'react';

const AppBar = () => {
  return (
    <div className='h-16 p-3 text-xl shadow-md flex items-center justify-between text-md'>
        <div className='font-semibold text-slate-600'>
            <h3>PayTm App</h3>
        </div>
        <div className='flex items-center gap-3'>
            <h3 className='font-semibold text-slate-600'>Hello</h3>
            <div className='bg-slate-400 h-7 w-7 rounded-full flex justify-center'>
                U
            </div>
        </div>
    </div>
  );
}

export default AppBar;