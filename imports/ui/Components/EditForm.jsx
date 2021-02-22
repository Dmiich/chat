import React from "react";

export const EditForm = ({ editableInfo, setEditableInfo }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editableInfo) {
      return console.log("username dows not exist");
    }

    const username = editableInfo.username;
    const _id = editableInfo.userId;

    Meteor.call("users.edit", _id, username);

    setEditableInfo({
      userId: editableInfo.userId,
      username: "",
    });
  };
  const onInputChange = (privedValue) => {
    setEditableInfo((prev) => ({ ...prev, username: privedValue }));
  };

  return (
    <div>
      <hr></hr>
      <form className="EditUser" onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={editableInfo.username}
          onChange={(e) => onInputChange(e.target.value)}
        />
        <br />
        <button>Submit</button>
        <button onClick={() => setEditableInfo({ displayEdit: false })}>
          Cancel
        </button>
        <hr></hr>
      </form>
    </div>
  );
};
