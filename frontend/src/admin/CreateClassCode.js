import React, { useState } from 'react';
import AdminNavbar from '../navbar/AdminNavbar';
import LocationSelect from './LocationSelect';
import GroupSelect from './GroupSelect';
import ModuleSelect from './ModuleSelect';
import ModuleLessonSelect from './ModuleLessonSelect';
import TypeSelect from './TypeSelect';
import Swal from 'sweetalert2';
import '../App.css';

const CreateClassCode = (props) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const body = JSON.stringify({
      location: selectedLocation,
      group: selectedGroup,
      type,
      date,
      time,
      syllabus: selectedModule,
      lesson: selectedLesson,
    });

    const apiBaseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_PROD_API_URL
        : process.env.REACT_APP_LOCAL_API_URL;

    fetch(`${apiBaseUrl}/admins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        Swal.fire(
          'Success!',
          'Your class code has been generated with code: ' + response.code,
          'success'
        );
        props.history.push('/');
      })
      .catch((error) =>
        Swal.fire(
          'Error',
          'An error occured while creating the class code.',
          'error'
        )
      );
  }

  return (
    <div className=''>
      <AdminNavbar background='#888' hoverBackground='#ccc' linkColor='#eee' />
      <div className='wrapper home'>
        <div className='col-md-4  col-sm-6'>
          <span></span>
          <div className='text-center margin-top'>
            <h2 style={{ color: 'white' }}>Create Class Code</h2>
            <hr></hr>
          </div>
          <form className='create-code-container' onSubmit={handleSubmit}>
            <div>
              <LocationSelect
                selectedLocation={selectedLocation}
                setSelectedLocation={(value) => {
                  setSelectedLocation(value);
                  setSelectedGroup(null);
                }}
              />
            </div>
            <GroupSelect
              selectedLocation={selectedLocation}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
            />
            <ModuleSelect
              selectedModule={selectedModule}
              setSelectedModule={(value) => {
                setSelectedModule(value);
                setSelectedLesson(null);
              }}
            />
            <ModuleLessonSelect
              selectedModule={selectedModule}
              selectedLesson={selectedLesson}
              setSelectedLesson={setSelectedLesson}
            />
            <TypeSelect type={type} setType={setType} />
            <div className='col-12'>
              <label htmlFor='date'>Date</label>
              <input
                className='form-control'
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              ></input>
            </div>

            <div className='col-12 '>
              <label htmlFor='time'>Time</label>
              <input
                className='form-control'
                type='time'
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              ></input>
            </div>
            <hr></hr>
            <div className='text-center'>
              <button type='submit' className='btn btn-info'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClassCode;
