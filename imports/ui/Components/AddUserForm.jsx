import React, { useState } from "react";

export const AddUserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      return console.log("username or password dows not exist");
    }

    Meteor.call("users.insert", username, password);

    setUsername("");
    setPassword("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="AddUser"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        className="AddUser"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>ADD</button>
      <hr></hr>
    </form>
  );
};
