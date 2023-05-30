import React from "react";
import { Link, useNavigate } from "react-router-dom";
import more from '../../../media/icons/more-app.png';
import sales from '../../../media/icons/编组 2.png';
import bag from '../../../media/icons/shopping-bag.png';
import search from '../../../media/icons/编组.png';
import bell from '../../../media/icons/bell.png';
import moon from '../../../media/icons/Vector (4).png';
import user from '../../../media/icons/Ellipse 814.png';
import xontaxta from '../../../media/images/xontaxta.jpg';
import '../../../css/TS/Dashboard/Dashboard.css';
import { Products } from '../Products/Products.js';
import { Button } from "antd";
import { GetUser } from "../../../Utils/User_utils/User_utils";
import { UserSignOut } from '../../../Utils/Auth/Auth';
import { Purchase } from "../Products/Detail/Purchase";
import { AdminPanel } from "../User-page/Admin-panel";

function Dashboard() {
    const navigate = useNavigate();

    function Log() {
        UserSignOut();
        navigate('/login');
    };

    return (
        <>
            <header className="dashboard-header">
                <div className="search-wrapper">
                    <img src={search} />
                    <input type="text" placeholder="Search" />
                </div>
                <div className="user-wrapper">
                    <i class="fa-solid fa-cart-shopping" onClick={() => navigate('/dashboard/products/purchase')}></i>
                    <img src={moon} className="me-0"/>
                    <img src={bell} />
                    <Link to={'/admin-panel'}>
                        <img className="user" src={user} onClick={() => AdminPanel()} />
                    </Link>
                    <button onClick={Log} className="log_out"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out</button>
                </div>
            </header>
            <nav className="sidebar">
                <h1>
                    <img src={xontaxta} alt="xontaxta"/>
                </h1>
                <ul>
                    <li className="active">
                        <Link className ="link active" to='/dashboard/dashboardPage'>
                            <img className="image" src={more} />
                            <span onClick={() => active('0')}>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to='/dashboard/products'>
                            <img className="image" src={bag} />
                            <span onClick={() => active('1')}>Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to='/dashboard/clients'>
                            <img className="image" src={bag} />
                            <span onClick={() => active('2')}>Clients</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to='/dashboard/sales'>
                            <img className="image" src={sales} />
                            <span onClick={() => active('3')}>Sales</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to='/dashboard/category'>
                            <img className="image" src={bag} />
                            <span onClick={() => active('4')}>Category</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to='/dashboard/supplier'>
                            <img className="image" src={bag} />
                            <span onClick={() => active('5')}>Supplier</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to='/dashboard/order'>
                            <img className="image" src={sales} />
                            <span onClick={() => active('6')}>Order</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to='/dashboard/coupons'>
                            <img className="image" src={bag} />
                            <span onClick={() => active('7')}>Coupons</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

function active(id) {
    const li = document.getElementsByTagName('li')
    const link = document.getElementsByClassName('link')

    if (id == '0') {
        console.log('link activated');
        li[0].classList.add('active')
        li[1].classList.remove('active')
        li[2].classList.remove('active')
        li[3].classList.remove('active')
        li[4].classList.remove('active')
        li[5].classList.remove('active')
        li[6].classList.remove('active')
        li[7].classList.remove('active')

        link[0].classList.add('active')
        link[1].classList.remove('active')
        link[2].classList.remove('active')
        link[3].classList.remove('active')
        link[4].classList.remove('active')
        link[5].classList.remove('active')
        link[6].classList.remove('active')
        link[7].classList.remove('active')

    }
    else if (id == '1') {
        li[0].classList.remove('active')
        li[1].classList.add('active')
        li[2].classList.remove('active')
        li[3].classList.remove('active')
        li[4].classList.remove('active')
        li[5].classList.remove('active')
        li[6].classList.remove('active')
        li[7].classList.remove('active')

        link[0].classList.remove('active')
        link[1].classList.add('active')
        link[2].classList.remove('active')
        link[3].classList.remove('active')
        link[4].classList.remove('active')
        link[5].classList.remove('active')
        link[6].classList.remove('active')
        link[7].classList.remove('active')
    }
    else if (id == '2') {
        li[0].classList.remove('active')
        li[1].classList.remove('active')
        li[2].classList.add('active')
        li[3].classList.remove('active')
        li[4].classList.remove('active')
        li[5].classList.remove('active')
        li[6].classList.remove('active')
        li[7].classList.remove('active')

        link[0].classList.remove('active')
        link[1].classList.remove('active')
        link[2].classList.add('active')
        link[3].classList.remove('active')
        link[4].classList.remove('active')
        link[5].classList.remove('active')
        link[6].classList.remove('active')
        link[7].classList.remove('active')
    }
    else if (id == '3') {
        li[0].classList.remove('active')
        li[1].classList.remove('active')
        li[2].classList.remove('active')
        li[3].classList.add('active')
        li[4].classList.remove('active')
        li[5].classList.remove('active')
        li[6].classList.remove('active')
        li[7].classList.remove('active')

        link[0].classList.remove('active')
        link[1].classList.remove('active')
        link[2].classList.remove('active')
        link[3].classList.add('active')
        link[4].classList.remove('active')
        link[5].classList.remove('active')
        link[6].classList.remove('active')
        link[7].classList.remove('active')
    }
    else if (id == '4') {
        li[0].classList.remove('active')
        li[1].classList.remove('active')
        li[2].classList.remove('active')
        li[3].classList.remove('active')
        li[4].classList.add('active')
        li[5].classList.remove('active')
        li[6].classList.remove('active')
        li[7].classList.remove('active')

        link[0].classList.remove('active')
        link[1].classList.remove('active')
        link[2].classList.remove('active')
        link[3].classList.remove('active')
        link[4].classList.add('active')
        link[5].classList.remove('active')
        link[6].classList.remove('active')
        link[7].classList.remove('active')
    }
    else if (id == '5') {
        li[0].classList.remove('active')
        li[1].classList.remove('active')
        li[2].classList.remove('active')
        li[3].classList.remove('active')
        li[4].classList.remove('active')
        li[5].classList.add('active')
        li[6].classList.remove('active')
        li[7].classList.remove('active')

        link[0].classList.remove('active')
        link[1].classList.remove('active')
        link[2].classList.remove('active')
        link[3].classList.remove('active')
        link[4].classList.remove('active')
        link[5].classList.add('active')
        link[6].classList.remove('active')
        link[7].classList.remove('active')
    }
    else if (id == '6') {
        li[0].classList.remove('active')
        li[1].classList.remove('active')
        li[2].classList.remove('active')
        li[3].classList.remove('active')
        li[4].classList.remove('active')
        li[5].classList.remove('active')
        li[6].classList.add('active')
        li[7].classList.remove('active')

        link[0].classList.remove('active')
        link[1].classList.remove('active')
        link[2].classList.remove('active')
        link[3].classList.remove('active')
        link[4].classList.remove('active')
        link[5].classList.remove('active')
        link[6].classList.add('active')
        link[7].classList.remove('active')
    }
    else if (id == '7') {
        li[0].classList.remove('active')
        li[1].classList.remove('active')
        li[2].classList.remove('active')
        li[3].classList.remove('active')
        li[4].classList.remove('active')
        li[5].classList.remove('active')
        li[6].classList.remove('active')
        li[7].classList.add('active')

        link[0].classList.remove('active')
        link[1].classList.remove('active')
        link[2].classList.remove('active')
        link[3].classList.remove('active')
        link[4].classList.remove('active')
        link[5].classList.remove('active')
        link[6].classList.remove('active')
        link[7].classList.add('active')
    }
}

function DashboardPage() {
    return (
        <>
            <Dashboard />
            <main className="dashboard-main">
                <h1>Dashboard</h1>
                <Button onClick={() => GetUser()}>Get Data</Button>
            </main>
        </>
    );
};

export { Dashboard, DashboardPage };