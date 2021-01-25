import React from 'react';
import MentorsNavbar from '../navbar/MentorsNavbar';
import { NavLink } from 'react-router-dom';
import { useUserProfile } from "../providers/UserProvider"

const MentorsView = (props) => {
  const user = useUserProfile();
  return (
    <div>
      <MentorsNavbar
        background='#aaa'
        hoverBackground='#ddd'
        linkColor='#eee'
      />
      <div className='welcome'>
        <h1 className='mb-4'> Welcome {user && user.name}</h1>
      </div>
      <div className='home'>
        <div className='col-6'>
          <NavLink to='/groups' className='btn btn-primary col-10 mb-4'>
            Show Groups
          </NavLink>
          <NavLink to='/attendees' className='btn btn-primary col-10 mb-4'>
            Show Attendees
          </NavLink>
          <NavLink to='/create-code' className='btn btn-primary col-10 mb-4'>
            Create a class code
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MentorsView;
