import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useParams } from "react-router-dom";
import { ChatSessions } from "/imports/api/chatSessions/collections";
import { Messages } from "/imports/api/Messages/collections";
import { HomeHacker } from "/imports/ui/Components/HomeHacker.jsx";
import { Meteor } from "meteor/meteor";

export const ChatBox = ({ user }) => {
  const [text, setText] = useState("");

  const params = useParams();

  const {
    targetUser,
    chatMessages,
    isLoading,
    isHomeHacker,
  } = useTracker(() => {
    const handler = Meteor.subscribe(
      "chatSessions.single",
      params.chatSessionID
    );
    if (!ChatSessions.findOne(params.chatSessionID)) {
      return { isHomeHacker: true };
    }
    if (!handler.ready()) {
      return {
        isLoading: true,
      };
    }

    const fetchedChatSession = ChatSessions.findOne(params.chatSessionID);

    const { participants } = fetchedChatSession;

    const curruser = Meteor.user();
    const targetUserId =
      participants[0] === curruser._id ? participants[1] : participants[0];

    const handler2 = Meteor.subscribe("users.single", targetUserId);

    if (!handler2.ready()) {
      return { isLoading: true };
    }

    const targetUserObj = Meteor.users.find().fetch();

    const targetUserUsername =
      targetUserObj[0].username === curruser.username
        ? targetUserObj[1].username
        : targetUserObj[0].username;

    const handler3 = Meteor.subscribe(
      "messages.singleSession",
      params.chatSessionID
    );
    if (!handler3.ready()) {
      return { chatMessages: [] };
    }
    const fetchedMessages = Messages.find().fetch();

    fetchedMessages.map((currMes) => {
      if (currMes.userID !== Meteor.user()._id) {
        Messages.update(
          { _id: currMes._id },
          {
            $set: {
              isRead: true,
            },
          }
        );
      }
    });

    return {
      chatSession: fetchedChatSession,
      targetUser: targetUserUsername,
      chatMessages: fetchedMessages,
      isLoading: false,
      isHomeHacker: false,
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      return setText("");
    }
    if (isHomeHacker) {
      return setText("");
    }
    Meteor.call("messages.insert", text, params.chatSessionID);

    setText("");
  };

  return (
    <div className="ChatBoxWrapper">
      <div className="ChatBoxHeader">{targetUser}</div>
      <div className="ChatBoxContent">
        <div className="MessageWrapper">
          {isHomeHacker ? (
            <HomeHacker />
          ) : isLoading ? (
            "Loading..."
          ) : (
            chatMessages.map((currMesage) => (
              <div className="MessageWrapper" key={currMesage._id}>
                <div
                  className={`Message ${
                    currMesage.userID === Meteor.user()._id
                      ? "Outgoing"
                      : "Incoming"
                  }`}
                >
                  {currMesage.text}
                  {currMesage.isRead ? (
                    <div className="Arrow">&#10004;</div>
                  ) : (
                    <div className="ArrowNot">&#x2713;</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="InputArea">
        <textarea
          className="ChatInput"
          placeholder="Add new text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button onClick={handleSubmit}>Enter</button>
      </div>
    </div>
  );
};
