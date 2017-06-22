import React, { Component } from 'react';
import backgroundImage      from '../../Image/background-login-screen.jpg';
import './Style/login-style.css';

class SignInPage extends Component {
    render() {
        return (
            <div className="sign-in-page">
                <div className="sign-in-group">
                    <h3 className="title"> Sign in </h3>
                    <form 
                        action="/sign-in" 
                        method="POST" 
                        id="login-form">
                        <input
                            type="text"
                            name="username"
                            id="input-email-sign-in"
                            placeholder="input your email ..."/>
                        <br />
                        <input 
                            type="password"
                            name="password"
                            id="input-password-sign-in"
                            placeholder="input your password ..."/>
                        <br />
                        <input 
                            type="submit"
                            id="login-email-btn"
                            value="Login"/>
                    </form>
                    <br/>
                    <a href="/sign-up"> Sign Up </a>
                    <br/>
                    <a href="/auth/fb" className="login-with-face">
                        <span> Login with  </span>
                        <i className="fa fa-facebook" />
                    </a>
                </div>
            </div>
        );
    }
}

export default SignInPage;