import React, { useEffect } from "react";
import { Dashboard } from "../Dashboard/Dashboard.js";
import searchImg from '../../../media/icons/编组.png';
import filter2 from '../../../media/images/filter_2.png';
import filter from '../../../media/images/filter.png';
import category from '../../../media/images/down_strelka.png';
import strelka from '../../../media/images/strelka.png';
// import '../../../css/TS/Products/Product.css';
import '../../../css/TS/Sales/sales.css';
import { useState } from "react";
import card_image from '../../../media/images/Frame 159.png';
// import { getCategory } from "../Products/Product-Sales/Sales.jsx";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/index.js";
import { Button } from "antd";

function Sales() {
    const [product, setProduct] = useState([]);
    const [newProduct, setNewProduct] = useState([]);
    const userEmail = localStorage.getItem('email');
    const [sum, setSum] = useState(0);

    async function removeSales(id) {
        const docRef = doc(db, `${userEmail}.sales`, id);
        await deleteDoc(docRef);
        console.log(id, 'remove sales id');
    }

    async function getSales() {
        const docSnap = await getDocs(collection(db, `${userEmail}.sales`));
        return docSnap.docs.map((item) => {
            console.log(item.data());
            return {...item.data(), id: item.id};
        });
    }

    function reduce() {
        const arr = newProduct.map(item => {
            const price = item.prices - (item.prices / 100 * item.discounts);
            return price;
        })
        const res = arr.reduce(getSum, 0);

        function getSum(total, num) {
            return total + Math.round(num);
        }
        setSum(res)
    }

    useEffect(() => {
        async function get() {
            const sales = await getSales();
            setNewProduct(sales);
        }
        get();
    }, [product])

    return (
        <>
            <Dashboard />
            <main className="dashboard-main">
                <div className="products">
                    <div className="wrapper-title">
                        <h1>Order List</h1>
                    </div>
                    <div className="sales-card-title">
                        <p className="card-width">Name</p>
                        <div className="small-wrapper">
                            <p>Quantity</p>
                            <p>Prices</p>
                            <p>Totals</p>
                            <p>Discounts</p>
                            <p>Remove</p>
                        </div>
                    </div>
                    <div className="wrappers">
                        {
                            newProduct.map((item, id) => {
                                return (
                                    <>
                                        <div className="sales-card" key={id}>
                                            <div className="image-wrapper">
                                                <img src={item.images} alt="image" />
                                                <span>{item.names}</span>
                                            </div>
                                            <div className="small-wrapper">
                                                <div>
                                                    <p>{item.quantity}</p>
                                                </div>
                                                <div>
                                                    <p>{item.prices}</p>
                                                </div>
                                                <div>
                                                    <del>{item.totals}</del>
                                                </div>
                                                <div>
                                                    <p>{item.discounts}</p>
                                                </div>
                                                <div>
                                                    <button onClick={() => removeSales(item.id)}>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) 
                            })
                        }
                        <h5 className="total-amount"><Button onClick={reduce}>Calculate</Button> Total amount ${sum}</h5>
                    </div>
                </div>
            </main>
        </>
    );
};
export { Sales };