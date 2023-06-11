import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dashboard } from "../../Dashboard/Dashboard";
import '../../../../css/TS/Products/Product.css';
import { Timestamp, addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { Alert, Button, Select, Spin, Switch } from "antd";
import Product_detail from "./Product_detail";
import '../../../../css/TS/Products/Purchase/Purchase.css';
import searchImg from '../../../../media/icons/编组.png';
import category from '../../../../media/images/down_strelka.png';
import strelka from '../../../../media/images/strelka.png';
import filter2 from '../../../../media/images/filter_2.png';
import Loading from "../Loading/Loading";
import { uuid } from "uuidv4";

function PurchasePage() {
    const userEmail = localStorage.getItem('email');
    const [product, setProduct] = useState([]);
    const [newProduct, setNewProduct] = useState([]);
    const [search, setSearch] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [loading, setLoading] = useState(false);
    const byName = ['A to Z', 'Z to A'];
    const added = ['First added', 'Last added'];

    async function getPurchase() {
        const docSnap = await getDocs(collection(db, `${userEmail}.purchase`));
        return docSnap.docs.map((item) => {
            return {...item.data(), key: item.id};
        });
    }
    
    async function Quantity(id, key, idd) {
        const product = doc(db, `${userEmail}.products`, id);
        const getProductData = (await getDoc(product)).data();
        const purchase = doc(db, `${userEmail}.purchase`, idd);
        const getPurchaseData = (await getDoc(purchase)).data();
        const qty = getPurchaseData.quantity;
        const qtyy = getProductData.quantity;

        async function updatePurchaseMinus() {
            if (qty > 1) {
                setLoading(true);
                console.log(qty);
                await updateDoc(purchase, {
                    quantity: qty - 1,
                })
                await updateDoc(product, {
                    quantity: qtyy + 1,
                })
                setQuantity(qty);
                setLoading(false);
            } else {
                console.log(getProductData.quantity);
            }
        }

        async function updatePurchasePlus() {
            console.log(getProductData.quantity);
            if (qtyy > 1) {
                setLoading(true);
                console.log(true);
                await updateDoc(purchase, {
                    quantity: qty + 1,
                })
                await updateDoc(product, {
                    quantity: qtyy - 1,
                })
                setQuantity(qty);
                setLoading(false);
            } else {
                console.log(false);
            }
        }

        try {
            if (key === '+') {
                updatePurchasePlus();
            } else if (key === '-') {
                updatePurchaseMinus();
            } else {
                console.log(false);
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function purchaseBuy() {
        const docRef = await addDoc(collection(db, `${userEmail}.order`), {order: newProduct});
    }

    useEffect(() => {
        async function get() {
            const purchase = await getPurchase();
            setNewProduct(purchase);
        }
        get()
    }, [quantity])

    useEffect(() => {
        async function get() {
            const purchase = await getPurchase();
            setNewProduct(purchase);
        }
        get()
    }, [product])

    async function SortByName(key) {
        const products = await getPurchase();
        if (key == 'A to Z') {
            const productFilter = products.sort((a, b) => (a.names > b.names ? 1 : -1))
            setNewProduct(productFilter);
        } else {
            const productFilter = products.sort((a, b) => (a.names > b.names ? -1 : 1))
            setNewProduct(productFilter);
        }
    }

    async function addedFilter(key) {
        const products = await getPurchase();
        if (key == 'First added') {
            const productFilter = products.sort((a, b) => new Date(...a.created.split('/').reverse()) - new Date(...b.created.split('/').reverse()));
            setNewProduct(productFilter);
        } else {
            const productFilter = products.sort((a, b) => new Date(...b.created.split('/').reverse()) - new Date(...a.created.split('/').reverse()));
            setNewProduct(productFilter);
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
                                <Button onClick={purchaseBuy}>Buy</Button>
                                <Select
                                    onChange={(value) => SortByName(value)}
                                    defaultValue={byName[0]}
                                    style={{
                                        marginLeft: 10,
                                        width: 100,
                                    }}
                                    options={byName.map((province) => ({
                                        label: province,
                                        value: province,
                                    }))}
                                />
                                <button className="category">
                                    Status
                                    <img src={category} alt="category" />
                                </button>
                                <Select
                                    onChange={(value) => addedFilter(value)}
                                    defaultValue={added[0]}
                                    style={{
                                        marginLeft: 10,
                                        width: 120,
                                    }}
                                    options={added.map((province) => ({
                                        label: province,
                                        value: province,
                                    }))}
                                />
                            </div>
                        </div>
                        <div className="wrapper-body">
                            <div className="card-wrapper">
                                {
                                    loading == true ?
                                        <Spin spinning={loading}></Spin>
                                    :
                                    newProduct.filter(item => {
                                        return search.toLowerCase() === ''
                                        ? item
                                        : item.names.toLowerCase().includes(search);
                                    }).map((item, i) => {
                                        return (
                                            <div key={i} className="card">
                                                <div className="card-body">
                                                    <Button className="danger" type="primary">{item.discounts}%</Button>
                                                    <img src={item.images} alt="table" />
                                                </div>
                                                <div className="card-footer">
                                                    <div>
                                                        <p className="title">{item.names}</p>
                                                        <b>${item.prices}</b>
                                                    </div>
                                                    <div>
                                                        <p>({item.quantity})</p>
                                                        <div>
                                                            <Button type="primary" onClick={() => Quantity(item.idd, '-', item.key)}>-</Button>
                                                            <Button type="primary" onClick={() => Quantity(item.idd, '+', item.key)}>+</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <Link to={'/dashboard/products'} style={{textDecoration:'none', color:'blue', fontSize: '18px', padding: '0 60px', marginTop: '500px'}} ><i class="fa-solid fa-arrow-left"></i> Back to product page</Link>
                    </div>
                </div>
            </main>
        </>
    )
}
export { PurchasePage }