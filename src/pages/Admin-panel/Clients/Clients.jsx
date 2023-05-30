import React, { useEffect } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import searchImg from '../../../media/icons/编组.png';
import filter2 from '../../../media/images/filter_2.png';
import filter from '../../../media/images/filter.png';
import category from '../../../media/images/down_strelka.png';
import strelka from '../../../media/images/strelka.png';
import table2 from '../../../media/images/google.jpg';
import user from '../../../media/images/google.jpg';
import { Button, Pagination } from "antd";
import '../../../css/TS/App.css';
import '../../../css/TS/Products/Product.css';
import '../../../css/TS/Clients/clients.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Pages } from "../Products/Custom-Hooks/Pages";
import { GetUser } from "../../../Utils/User_utils/User_utils";

function ClientPage() {
    const [user, setUser] = useState([]);
    const [newUser, setNewUser] = useState([]);

    useEffect(() => {
        async function get() {
            const client = await GetUser();
            setNewUser(client);
        }
        get();
    }, [user]);

    return (
        <>
            <Dashboard />
            <main className="dashboard-main">
                <div className="products">
                    <h1 className="titles">Order List</h1>
                    <div className="clients-card-wrapper">
                        <div className="clients-card-title">
                            <p>Clients</p>
                            <p>Email</p>
                            <p>Joined</p>
                            <p>Action</p>
                        </div>
                        <div className="wrapper">
                        {
                            newUser.map((item, id) => {
                                return (
                                    <>
                                        <div className="clients-card">
                                            <div>
                                                <img src={table2} alt="user image" />
                                                <p>{item.fullNames}</p>
                                            </div>
                                            <p>{item.emails}</p>
                                            <p>{item.date}</p>
                                            <Button>Action</Button>
                                        </div>
                                    </>
                                )
                            })
                        }
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
export { ClientPage };