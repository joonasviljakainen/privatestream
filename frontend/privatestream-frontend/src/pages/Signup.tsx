import React, { useState } from "react";
import { LoginCredentials } from "../../../../backend/privatestream-backend/typings/LoginCredentials";
import { signup } from "../sessions/SessionManager";
import { Redirect } from "react-router-dom";

const Signup = (/*props:{isLoggedIn: boolean}*/) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<object | undefined>(undefined);
  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setPwd(e.target.value);
  };
  const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setUsername(e.target.value);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials: LoginCredentials = { username: username, password: pwd };
    console.log(credentials);
    try {
      const response = await signup(credentials);
      setRedirect(true);
      // TODO
    } catch (e) {
      setError(e);
    }
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={submitForm}>
        <label htmlFor="usr">Username</label>
        <input
          id="usr"
          type="text"
          value={username}
          onChange={updateUsername}
        />
        <label htmlFor="pwd">Password</label>
        <input type="password" id="pwd" value={pwd} onChange={updatePassword} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
