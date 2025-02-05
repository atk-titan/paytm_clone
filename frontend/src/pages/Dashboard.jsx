import React, { useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/AppBar';
import Balance from '../components/Balance';
import SearchUsers from '../components/SearchUsers';
import Users from '../components/Users';
import axios from 'axios';

const Dashboard = () => {

  const [filter,setFilter] = useState("");
  const [balance,setBalance] = useState(-1);
  const [userList,setUserList] = useState([]);

  useEffect(()=>{
    fetchBalance();
    fetchUsers(filter);
  },[balance,filter]);
  
  const fetchBalance =async ()=>{
    const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
      headers:{
        Authorization:"Bearer "+localStorage.getItem('token')
      }
    });
    const balance = response.data.balance.Balance;
    if(!balance){
      Navigate("/login");
    }
    setBalance(balance);

  }

  const fetchUsers= async (filter)=>{
    const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
      headers:{
        Authorization:"Bearer "+localStorage.getItem('token')
      }
    });

    setUserList(response.data.user);
  }

  return (
    <div className='p-7'>
      <AppBar/>
      <Balance amount={balance}/>
      <SearchUsers onChange={(e)=>{
        setFilter(e.target.value);
      }}/>
      {userList.map((item)=>(
        <Users label={item.FirstName +' '+ item.LastName} _id={item._id}/>
      ))}
    </div>
  );
}

export default Dashboard;