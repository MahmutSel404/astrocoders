import React from 'react';


const apiBaseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_LOCAL_API_URL;

function UserRoleSelect({ user, setUser }) {
  const updateUserRole = (e) => {
    const role = e.currentTarget.value;

    fetch(`${apiBaseUrl}/admin/users/${user._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: role,
      }),
    })
      .then((res) => res.json())
      .then(() => setUser({ ...user, role: role }));
  };

  return (
    <div>
      <select
        className='custom-select'
        value={user.role}
        onChange={updateUserRole}
      >
        <option value='student'>Student</option>
        <option value='mentor'>Mentor</option>
        <option value='admin'>Admin</option>
      </select>
    </div>
  );
}

export default UserRoleSelect;