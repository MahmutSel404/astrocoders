import React from 'react';
import { signOutWithGoogle } from '../firebase';
import { useHistory } from 'react-router-dom';

export default function Logout() {
  const history = useHistory();
  const handleSignOut = () => {
    signOutWithGoogle(() => {
      history.push('/login');
    });
  };
  return (
    <button onClick={handleSignOut} className='btn btn-link logOut'>
      Sign out
    </button>
  );
}
