import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from "react-router-dom";
import { ChatSessions } from "/imports/api/chatSessions/collections"

export const ChatBox = ({ user }) => {

    const params = useParams();
    console.log('dima', params);

    const { chatSession, targetUser, isLoading } = useTracker(() => {
        const handler = Meteor.subscribe('chatSessions.single', params.chatSessionID);

        // const handlerUser = Meteor.subscribe
        if (!handler.ready()) {
            return { isLoading: true }
        }
        const fetchedChatSession = ChatSessions.findOne(params.chatSessionID);
        const { participants } = fetchedChatSession;

        const curruser = Meteor.user();
        const targetUserId = participants[0] === curruser._id ? participants[1] : participants[0]

        const handler2 = Meteor.subscribe('users.single', targetUserId)

        if (!handler2.ready()) {
            return { isLoading: true }
        }
        const targetUserObj = Meteor.users.find().fetch();

        const targetUserUsername = targetUserObj[0].username === curruser.username ? targetUserObj[1].username : targetUserObj[0].username

        console.log("target user username", targetUserUsername)


        console.log('Other user ID', targetUserId)

        return { chatSession: fetchedChatSession, targetUser: targetUserUsername, isLoading: false }
    })
    console.log(targetUser)


    return (
        <div className="ChatBoxWrapper">
            <div className="ChatBoxHeader">{targetUser}</div>
            <div className="ChatBoxContent">
                <div className="MessageWrapper">
                    <div className="Message Outgoing">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</div>
                </div>
                <div className="MessageWrapper">
                    <div className="Message Outgoing"> llljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkllljnlnjlkv.</div>
                </div>
                <div className="MessageWrapper">
                    <div className="Message Incoming">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</div>
                </div>
            </div>
            <div className="InputArea">
                <textarea
                    className="ChatInput"
                    placeholder="Add new text"
                />
                <button onClick={() => console.log(user)}>Enter</button>
            </div>
        </div>
    )
}