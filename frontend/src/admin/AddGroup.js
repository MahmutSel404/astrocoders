import React, { useState } from "react";
import "../App.css";
import Swal from "sweetalert2";

const AddGroup = ( {props} ) => {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const body = JSON.stringify({
      name,
    });

    fetch(`http://localhost:9000/location/${props.id}/group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((response) => {
        props.onAddGroup();
        Swal.fire(
          "Success!",
          "Your location has been submitted",
          response.name,
          "success"
        );

        // props.history.push("/");
      })
      .catch((error) =>
        Swal.fire(
          "Error",
          "An error occurred while creating the new location.",
          "error"
        )
      );
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="form-row align-items-center">
          <div className="col-md-9">
            <input
              placeholder="Add a new Group"
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <button type="submit" className="btn-sm btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddGroup;