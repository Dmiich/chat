import React from 'react';
import { LoginForm } from './Components/LoginForm'



export const LoggedOutLayout = () => {
    return (
        
        <div >
            {/* <Router>
                <NavBar />
            </Router> */}
            
            <div className="logIn">
                <h1>Logged Out Layout</h1>
                <hr></hr>
            </div>
            <LoginForm />
        </div>
    )
}