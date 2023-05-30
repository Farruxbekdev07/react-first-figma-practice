import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sign_up } from "./Register/sign_up.js";
import vector from '../../media/icons/Vector.png';
import vector1 from '../../media/icons/Vector (1).png';
import vector2 from '../../media/icons/Vector (2).png';
import vector3 from '../../media/icons/Vector (3).png';
import '../../css/TS/App.css';
import { Button } from "antd";
import { GetUser } from "../../Utils/User_utils/User_utils.js";

function HeaderPage() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        async function get() {
            const getUser = await GetUser();
            setUser(getUser);
        }
        get()
    }, [user]);

    return (
        <header className="header">
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to={user ? '/dashboard' : '/login'}>Shop</Link>
                    {/* <Link to='/dashboard'>Shop</Link> */}
                </li>
                <li>
                    <Link to={user ? '/about' : '/login'}>About</Link>
                </li>
                <li>
                    <Link to={user ? '/contact' : '/login'}>Contact</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/dashboard">
                        <img src={vector3} alt="vector3"/>
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard">
                        <img src={vector2} alt="vector2"/>
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard">
                        <img src={vector1} alt="vector1"/>
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard">
                        <img src={vector} alt="vector"/>
                    </Link>
                </li>
            </ul>
        </header>
    );
};
// {localStorage.getItem('user') ? '/shop' : (localStorage.setItem('user', JSON.stringify('person')))}
export default HeaderPage;