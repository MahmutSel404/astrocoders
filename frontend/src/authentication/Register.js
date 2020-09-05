import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../firebase";
import { Button, FormGroup, FormControl } from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const createUserWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <form className="" onSubmit={createUserWithEmailAndPasswordHandler}>
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            className="form-control "
            name="displayName"
            value={displayName}
            id="displayName"
            onChange={(event) => setDisplayName(event.target.value)}
          />

          <FormGroup controlId="email">
            {/* <ControlLabel>Email</ControlLabel> */}
            <label>Email</label>
            <FormControl
              autoFocus
              type="email"
              name="userEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
         
          <FormGroup controlId="password">
            <label htmlFor="userPassword">Password</label>
            {/* <ControlLabel>Password</ControlLabel> */}
            <FormControl
              id="userPassword"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <button
            className=""
            onClick={() => {
              createUserWithEmailAndPasswordHandler();
            }}
          >
            Sign up
          </button>
        </form>
        <p className="text-center my-3">or</p>
        <button
          className=""
          onClick={signInWithGoogle}
        >
          Sign In with Google
        </button>
        <p className="text-center my-3">
          Already have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-600">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;