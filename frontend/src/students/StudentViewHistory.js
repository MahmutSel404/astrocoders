import React, { useState, useEffect, useContext } from "react";
// import Navbar from "../Navbar";
import "../App.css";
import { UserContext } from "../providers/UserProvider";
import Logout from "../authentication/Logout";

const StudentViewHistory = (props) => {
  const user = useContext(UserContext);
  const [students, setStudents] = useState("");
 

  const email = user && user.email;

  useEffect(() => {
    const apiBaseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_PROD_API_URL
        : process.env.REACT_APP_LOCAL_API_URL;
        
    email &&
    fetch(`${apiBaseUrl}/studentsView/history?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      });
  }, [email]);
  // useEffect(() => {
  //     async function fetchData() {
  //         try {
  //             const response = await fetch(
  //                 `${apiBaseUrl}/studentsView/history?email=${email}`
  //             );
  //             const json = await response.json();
  //             setStudents(json.data.children.map(it => it.data));
  //         } catch (e) {
  //             console.error(e);
  //         }
  //     };
  //     fetchData();
  // }, []);

  return (
    <div>
      {email ? (
        <div className="table">
          <table className="table table-striped container bg-white table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Location</th>
                <th scope="col">Group</th>
                <th scope="col">Type</th>
                <th scope="col">Module</th>
                <th scope="col">Lesson</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Code</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            {students ? (
              <tbody>
                {students.map((data, i) => {
                  return (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{data.name ? data.name : null}</td>
                      <td>{data.email ? data.email : null}</td>
                      <td>
                        {data.class_code && data.class_code.location
                          ? data.class_code && data.class_code.location.name
                          : null}
                      </td>
                      <td>
                        {data.class_code && data.class_code.group
                          ? data.class_code && data.class_code.group.name
                          : null}
                      </td>
                      <td>
                        {data.class_code && data.class_code.type
                          ? data.class_code.type
                          : null}
                      </td>
                      <td>
                        {data.class_code && data.class_code.syllabus
                          ? data.class_code && data.class_code.syllabus.module
                          : null}
                      </td>
                      <td>
                        {data.class_code && data.class_code.lesson
                          ? data.class_code && data.class_code.lesson.name
                          : null}
                      </td>

                      <td>{data.date ? data.date : null}</td>
                      <td>{data.time ? data.time : null}</td>
                      <td>{data.code ? data.code : null}</td>
                      <td>{data.notes ? data.notes : null}</td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <th>You have not attended any class yet</th>
                </tr>
              </tbody>
            )}
          </table>
          <Logout />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default StudentViewHistory;
