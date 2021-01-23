import React from 'react';

function TypeSelect({ type, setType }) {
  return (
    <div className='col-12'>
      <label htmlFor='type'>Type</label>
      <select
        className='form-control'
        id='type'
        onChange={(e) =>
          setType(e.target.selectedIndex === 0 ? null : e.target.value)
        }
        required
      >
        <option>-</option>
        <option>Class</option>
        <option>Homework club</option>
        <option>Other</option>
      </select>
    </div>
  );
}

export default TypeSelect;
