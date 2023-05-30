import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from '../../../media/images/sign-up-image.png';
import { Button, message } from "antd";
import Login from "./Login";
import { AddUser } from "../../../Utils/User_utils/User_utils";
import { createUserWithEmailAndPassword, getAuth, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase";
import googleImg from '../../../media/images/google.jpg';

function Sign_up() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const [value, setValue] = useState('')
    const [ userData, setUserData ] = useState([]);

    function sign_up(e) {
        e.preventDefault();
        if ( fullName !== '' && email !== '' && password !== '' && phone !== '' ) {
            AddUser( fullName, phone, email, password );
            message.success('Sign up succesfully');
            navigate('/dashboard');
        } else {
            message.error('Is Empty');
            // navigate('/sign-up');
        }
    }

    function withGoogle() {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email);
            message.success('Sign up with Google succesfully');
            navigate('/dashboard');
        })
    }

    return (
        <div className="container-fluid">
            <div className="wrapper">
                <img src={image} alt="image"/>
                <form>
                    <h1>Sign Up</h1>
                    <input id="name-input" type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <input type="number" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <input id="email-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input id="password-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label>Kim Uchun?</label>
                    <select>
                        <option>Admin</option>
                        <option>Sotuvchi</option>
                        <option>Hisobchi</option>
                    </select>
                    <div className="button-group">
                        <Button onClick={sign_up}>Sign Up</Button>
                        <Link to={'/login'}>Log In</Link>
                    </div>
                    <Button onClick={withGoogle} type="primary" className="google">
                        <img src={googleImg} alt="google" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export { Sign_up };