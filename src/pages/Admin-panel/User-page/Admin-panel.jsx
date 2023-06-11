import { Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import kodecolor from '../../../media/images/kodecolor.webp';
import profile from '../../../media/images/user-image.webp';
import '../../../css/TS/Profile-page/Profile-page.css';

function getUser(userId) {
    console.log(userId);
}

function AdminPanel() {
    console.log('admin');
    const [] = useState('')
    
    return (
        <>
            {/* <div>
                <h1>Admin Panel</h1>
                <Link to={'/dashboard/products'}>To Back</Link>
            </div> */}
            <header>
                <div className="kodecolor">
                    <img src={kodecolor} alt="" />
                    <p>Kodecolor</p>
                </div>
                <div className="input-wrapper">
                    <button><i class="fa-solid fa-magnifying-glass"></i></button>
                    <input type="text" name="search" id="search" placeholder="Search" />
                </div>
                <div>
                    <p>Find people</p>
                </div>
                <div className="message">
                    <p>Messages</p>
                    <button>4</button>
                </div>
                <div>
                    <p>My Contacts</p>
                </div>
                <div className="profile">
                    <img src={profile} alt="profile" />
                    <div className="notification"></div>
                </div>
            </header>
            <main>
                <Button>Get User</Button>
            </main>
        </>
    )
}
export { AdminPanel, getUser };