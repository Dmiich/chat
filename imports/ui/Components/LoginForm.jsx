import { Meteor } from "meteor/meteor";
import React, { useState } from 'react';
import { WrongAuth } from './WrongAuth'

export const LoginForm = () => {

    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("password");

    const [InvalidCredentials, setInvalidCredentials] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        Meteor.loginWithPassword(username, password, (e) => {
            if (e) {
                setInvalidCredentials(true)
            }
        })
    };

    return (
        <div className="LoginForm">

            <form onSubmit={submit} className="login-form">
                <label htmlFor="username"></label>

                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <br />
                <label htmlFor="password"></label>

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <br />
                <button type="submit">Log In</button>
                <br />
                <br />
                <br />
                
            </form>
            {InvalidCredentials && <WrongAuth />}
        </div>
    )
}