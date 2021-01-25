import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import AdminNavbar from '../navbar/AdminNavbar';
import { useUserProfile } from '../providers/UserProvider';

function Home(props) {
  const user = useUserProfile();
console.log(user)
  return (
    <div>
      <AdminNavbar background='#aaa' hoverBackground='#ddd' linkColor='#eee' />
{/* 
      <div className='welcomeAdmin'>
        <h1> Welcome {user && name}</h1>
      </div> */}

      <div className='home'>
        <div className='text-center pb-5'>
          <h1>Attend Class</h1>
          <hr style={{ color: 'white' }}></hr>
          <h5 style={{ color: 'white' }}> Welcome {user.name}</h5>
        </div>
        <div className='col-4'>
          <NavLink to='/createCode' className='btn btn-primary col-12'>
            Create a class code
          </NavLink>
          <hr></hr>
          <NavLink to='/locations' className='btn btn-primary col-12'>
            Add-Delete Locations
          </NavLink>
          <hr></hr>
          <NavLink to='/groups' className='btn btn-primary col-12'>
            Groups
          </NavLink>
          <hr></hr>
          <NavLink to='/attendees-admin' className='btn btn-primary col-12'>
            Attendees
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home;
