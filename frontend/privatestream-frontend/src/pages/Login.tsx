import React, { useState } from "react";

const Login = (/*props:{isLoggedIn: boolean}*/) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = () => {};

  return (
    <div>
      <form>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={email}
          onChange={(e) => {
            console.log(e);
          }}
        />
      </form>
    </div>
  );
};

export default Login;
