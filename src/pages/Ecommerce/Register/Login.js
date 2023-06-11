import React, { useEffect, useRef, useState } from "react";
import image from '../../../media/images/sign-up-image.png';
import { Link, useNavigate } from "react-router-dom";
import { Sign_up } from "./sign_up";
import { Button, message } from "antd";
import '../../../css/TS/App.css';
import { signInWithEmailAndPassword, signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../../../firebase";
import { Authentication } from "../../../Utils/Auth/Auth";
import { GetUser, setLocalStorage } from "../../../Utils/User_utils/User_utils";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [value, setValue] = useState('');
    const [user, setUser] = useState([]);
    const [forgotPassword, setForgotPassword] = useState('');
    const navigate = useNavigate();

    function login(e) {
        e.preventDefault();
        if (email !== '' && password !== '') {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLocalStorage(email);
                navigate('/dashboard');
                message.success('Sign In Succesfully');
                const user = auth.currentUser;
                console.log(user, 'auth');
                console.log(userCredential.user.uid, 'user credential');
            }).catch((err) => {
                // console.log(err);
                setForgotPassword('Forgot password?');
                message.error(`Email or password error`);
            })
        } else {
            message.error(`${email} is not defined`);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                const name = user.providerId;
                navigate('/dashboard');
                // console.log(name, 'id');
                // console.log(uid, 'uid');
            } else {
                navigate('/login');
                // console.log('error');
            }
        });
    }, [])

    return (
        <>
            <div className="container-fluid">
                <div className="wrapper">
                    <img src={image} alt="image"/>
                    <form>
                        <div>
                            <h1>Log In</h1>
                            <input id="email-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input id="password-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div className="button-group">
                                <Button onClick={login}>Log In</Button>
                                <Link to={'/sign-up'}>Sign Up</Link>
                            </div>
                            <div className="button-group">
                                <Link to={''}>{forgotPassword}</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Authentication />
            {/* {
                user.map(item => <p>{item.fullNames}</p>)
            } */}
        </>
    )
}

export default Login;