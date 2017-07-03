import React, { Component } from 'react';
import userMG               from '../../js/user.js';
import backgroundImage      from '../../Image/background-login-screen.jpg';
import './Style/login-style.css';

class SignUpPage extends Component {
    render() {
        return (
            <div className="sign-up-page">
                <div className="sign-up-group">
                    <h1 className="title-app"> Chat together </h1>
                    <h3 className="title"> Sign up </h3>
                    <form id="register-form">
                        <input
                            type="text"
                            name="name"
                            id="input-name-sign-up"
                            placeholder="input your name ..."/>
                        <br />
                        <input
                            type="text"
                            name="username"
                            id="input-email-sign-up"
                            placeholder="input your email ..."/>
                        <br />
                        <input 
                            type="password"
                            name="password"
                            id="input-password-sign-up"
                            placeholder="input your password ..."/>
                        <br />
                        <input 
                            type="submit"
                            id="register-email-btn"
                            value="Register"/>
                    </form>
                </div>
            </div>
        );
    }

    componentDidMount() {
        document.getElementById('register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name     = document.getElementById('input-name-sign-up').value;
            const email    = document.getElementById('input-email-sign-up').value;
            const password = document.getElementById('input-password-sign-up').value;
            if(name && email && password){
                userMG.register(name, email, password, (err, result) => {
                    if(err){
                        console.log(result);
                        return alert('Loi: ' + JSON.stringify(result));
                    }

                    window.location.href = '/sign-in';
                    alert(result);
                })
            }else{
                alert('Mot so thong tin co trong xin moi nhap lai');
            }
        })
    }
}

export default SignUpPage;