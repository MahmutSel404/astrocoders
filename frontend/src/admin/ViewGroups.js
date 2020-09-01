import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import DeleteGroup from "./DeleteGroup";

const ViewGroups = ({id}) => {
  const [group, setGroup] = useState("");

  useEffect(() => {
    fetch(`http://localhost:9000/location/${id}`)
      // , { query: { location, groups, type } }
      .then((res) => res.json())
      .then((data) => setGroup(data));
  }, [setGroup]);
    { console.log(group) }
  if (!group) {
    return <div>Loading...</div>;
  }

  return (
      
    <div>

      <div className="">
        <h4></h4>
      </div>
      <div className="table">
        <table className="table">
          {/* <thead>
            <tr>
              <th scope="col">#</th>
                          <th scope="col">Group Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead> */}

          {group ? (
            <tbody>
              {group.groups.map((data, i) => {
                return (
                   
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{data.name}</td>
                        <td><DeleteGroup props={data._id}/></td>
                  </tr>
                 
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <th>No groups added yet</th>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default ViewGroups;
