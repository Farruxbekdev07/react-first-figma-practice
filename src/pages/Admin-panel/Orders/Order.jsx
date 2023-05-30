import React, { useEffect } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import searchImg from '../../../media/icons/编组.png';
import filter2 from '../../../media/images/filter_2.png';
import filter from '../../../media/images/filter.png';
import category from '../../../media/images/down_strelka.png';
import strelka from '../../../media/images/strelka.png';
import '../../../css/TS/App.css';
import { useState } from "react";
import action from '../../../media/images/action.png';
import '../../../css/TS/Orders/order.css';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { Button } from "antd";

function Order() {
    const userEmail = localStorage.getItem('email')
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState([]);
    const [newOrders, setNewOrders] = useState([]);

    async function getOrder() {
        const docSnap = await getDocs(collection(db, `${userEmail}.order`));
        return docSnap.docs.map((item) => {
            return {...item.data(), id: item.id};
        }); 
    }

    async function Buy(id) {
        const docRef = doc(db, `${userEmail}.order`, id);
        const docSnap = (await getDoc(docRef)).data();
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        try {
            const docRef = await addDoc(collection(db, `${userEmail}.sales`), {
              names: docSnap.names,
              prices: docSnap.prices,
              totals: docSnap.totals,
              quantity: docSnap.quantity,
              discounts: docSnap.discounts,
              images: docSnap.images,
              id: Math.floor(Math.random() * 100),
              created: `${day}/${month}/${year}`,
            });
            console.log("Document written with product name: ");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async function Remove(id) {
        const userEmail = localStorage.getItem('email');
        const docRef = doc(db, `${userEmail}.order`, id);
        await deleteDoc(docRef);
    }

    useEffect(() => {
        async function get() {
            const order = await getOrder();
            setNewOrders(order);
        }
        get()
    }, [orders])

    return (
        <>
            <Dashboard />
            <main className="dashboard-main">
                <div className="products">
                    <div className="wrapper-title">
                        <h1>Order List</h1>
                    </div>
                    <div className="wrapper">
                        <div className="wrapper-header">
                            <div className="search-wrapper">
                                <img src={searchImg} />
                                <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" />
                            </div>
                            <div className="button-wrapper">
                                <button onClick={() => getOrder()}>
                                    <img className="filter" src={filter2} alt="filter2" />
                                </button>
                                <button className="category">
                                    Status
                                    <img src={category} alt="category" />
                                </button>
                                <button className="category">
                                    Data
                                    <img src={strelka} alt="strelka" />
                                </button>
                            </div>
                        </div>
                        <div className="orders">
                            <div className="order-card-wrapper">
                                <div className="order-card-wrapper-title">
                                    <p>ID</p>
                                    <p>Name</p>
                                    <p>Price</p>
                                    <p>Total</p>
                                    <p>Status</p>
                                    <p>Discount</p>
                                    <p>Action</p>
                                </div>
                                {
                                    newOrders.filter((item) => {
                                        return search.toLowerCase() === ''
                                        ? item
                                        : item.names.toLowerCase().includes(search);
                                    }).map((item, id) => {
                                        return (
                                            <div className="order-card" key={id}>
                                                {/* <p>{item.id}</p> */}
                                                <p>2515</p>
                                                <p>{item.names}</p>
                                                <p>${item.prices}</p>
                                                <p>${item.totals}</p>
                                                <button className="status">Active</button>
                                                <p>{item.discounts}%</p>
                                                <div class="dropdown-center">
                                                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Action
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li onClick={(e) => e.preventDefault()}>
                                                            <a class="dropdown-item" onClick={() => Buy(item.id)} >Buy</a>
                                                        </li>
                                                        <li onClick={(e) => e.preventDefault()}>
                                                            <a class="dropdown-item" onClick={() => Remove(item.id)} >Remove</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
export { Order };