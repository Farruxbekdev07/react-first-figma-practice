import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dashboard } from "../../Dashboard/Dashboard";
import '../../../../css/TS/Products/Product.css';
import { Timestamp, addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import { Button } from "antd";
import Product_detail from "./Product_detail";
import '../../../../css/TS/Products/Purchase/Purchase.css';
import searchImg from '../../../../media/icons/编组.png';
import category from '../../../../media/images/down_strelka.png';
import strelka from '../../../../media/images/strelka.png';
import filter2 from '../../../../media/images/filter_2.png';

function PurchasePage() {
    const userEmail = localStorage.getItem('email');
    const [product, setProduct] = useState([]);
    const [newProduct, setNewProduct] = useState([]);
    const [search, setSearch] = useState([]);
    
    async function getPurchase() {
        const docSnap = await getDocs(collection(db, `${userEmail}.purchase`));
        return docSnap.docs.map((item) => {
            return {...item.data(), id: item.id};
        });
    }

    useEffect(() => {
        async function get() {
            const purchase = await getPurchase();
            setNewProduct(purchase);
            console.log(purchase);
            console.log(newProduct, 'purchase product');
        }
        get()
    }, [product])

    async function Buy(id) {
        const docRef = doc(db, `${userEmail}.purchase`, id);
        const docSnap = (await getDoc(docRef)).data();
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        try {
            const docRef = await addDoc(collection(db, `${userEmail}.order`), {
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
    
    return (
        <>
            <Dashboard />
            <main className="dashboard-main">
                <h1 className="purchase-title">Purchase page</h1>
                <div className="products">
                    <div className="wrapper">
                        <div className="wrapper-header">
                            <div className="search-wrapper">
                                <img src={searchImg} />
                                <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" />
                            </div>
                            <div className="button-wrapper">
                                <button>
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
                        <div className="wrapper-body">
                            <div className="card-wrapper">
                                {
                                    newProduct.map((item, i) => {
                                        return (
                                            <div key={i} className="card">
                                                <div className="card-body">
                                                    <Button className="danger" type="primary">{item.discounts}%</Button>
                                                    <Link to={`/dashboard/products/detail/${item.id}`}>
                                                        <img onClick={() => Product_detail(item.id)} src={item.images} alt="table" />
                                                    </Link>
                                                </div>
                                                <div className="card-footer">
                                                    <div>
                                                        <p className="title">{item.names}</p>
                                                        <b>${item.prices}</b>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <Button type="primary" onClick={() => Buy(item.id)}>Buy</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export { PurchasePage }