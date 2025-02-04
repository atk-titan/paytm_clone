import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/AppBar';
import Balance from '../components/Balance';
import Users from '../components/Users';

const Dashboard = () => {
  const Navigate = useNavigate();

  return (
    <div className='p-7'>
      <AppBar/>
      <Balance/>
      <Users/>
    </div>
  );
}

export default Dashboard;