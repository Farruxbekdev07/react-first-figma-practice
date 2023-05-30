import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "../../Dashboard/Dashboard.js";
import detail from '../../../../media/images/detail.png';
import detail_image from '../../../../media/images/detail-image.png';
import { Button } from "antd";
import '../../../../css/TS/Products/Details/Details.css';
import DeleteProduct from "../Delete/Delete.js";
import EditProduct from "../Edit/Edit.js";
import EditModal from "../Edit/Modal.jsx";
import { GetProduct } from "../../../../Utils/Product_utils/Product_utils.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/index.js";
import { ToastContainer } from "react-toastify";
import { Purchase } from "./Purchase";

function Product_detail(id) {
    const userEmail = localStorage.getItem('email')
    const locationn = window.location.href;
    const key = locationn.slice(locationn.search("detail"), locationn.length);
    const keyy = key.slice(7, key.length);
    const [newDetail, setNewDetail] = useState([]);
    const [productDetail, setProductDetail] = useState([]);
    const navigate = useNavigate();
    console.log(id);

    async function getproduct() {
        const docRef = doc(db, `${userEmail}.products`, keyy);
        const docSnap = await getDoc(docRef);
        console.log(keyy);
        console.log(docRef);
        return {...docSnap.data(), id: docSnap.id};
    }
    getproduct()

    useEffect(() => {
        const get = async () => {
            const detail = await getproduct();
            setProductDetail(detail);
        }
        get()
    }, [newDetail])

    return (
        <>
            <Dashboard />
            <ToastContainer />
            <main className="dashboard-main" key={productDetail.id}>
                <div className="space"></div>
                    <div className="card-detail">
                        <div className="image-wrapper">
                            <img src={productDetail.images || detail_image} alt="table"/>
                        </div>
                        <div className="content-wrapper">
                            <div className="content-title">
                                <h2>{productDetail.names}</h2>
                                <h3>${productDetail.prices}</h3>
                            </div>
                            <div>
                                <small>Lorem ipsum dolor sit amet consectetur. Amet facilisis egestas cursus nisl diam ipsum nibh. Elit. Amet facilisis egestas cursus nisl diam ipsum nibh  Amet facilisis egestas cursus nisl diam ipsum nibh</small>
                            </div>
                            <div className="content-color">
                                <div>
                                    <p>Color</p>
                                    <p className="color"></p>
                                </div>
                                <div>
                                    <p>Supplier</p>
                                    <p>
                                        <img src={detail} alt="detail"/>
                                    </p>
                                </div>
                            </div>
                            <div className="quantity">
                                <p>Quantity</p>
                                <div className="button-wrapper">
                                    <Button>{productDetail.quantity}</Button>
                                </div>
                                <div className="buy">
                                    <EditModal id={productDetail.id}/>
                                    <Button onClick={() => DeleteProduct(productDetail.id, navigate)}>Delete</Button>
                                    <Button onClick={() => navigate('/dashboard/products')}>Cancel</Button>
                                    <Button type="primary" onClick={() => Purchase(productDetail.id)}>Purchase</Button>
                                </div>
                            </div>
                        </div>
                    </div>
            </main>
        </>
    );
};
export default Product_detail;