import React, { useEffect, useRef, useState } from "react";
import { Dashboard } from "../../Dashboard/Dashboard.js";
import "../../../../css/TS/Products/Create-shop/Create-shop.css";
import { Button, Modal, Select, message } from 'antd';
import sofa from '../../../../media/images/sofa_1.png';
import { useNavigate } from "react-router-dom";
import { AddProduct, GetProduct } from "../../../../Utils/Product_utils/Product_utils.js";
import { storage } from "../../../../firebase/index.js";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { uuid as v4 } from "uuidv4";
import { Storage, downloader, imgUploader } from "../../../../Utils/Product_utils/Storage.js";

function CreateShop() {
    const [name, setName] = useState("");
    const [images, setImages] = useState([]);
    const [imageList, setImageList] = useState('');
    const [imageUrl, setImageUrl] = useState([]);
    const [price, setPrice] = useState("");
    const [total, setTotal] = useState("");
    const [discount, setDiscount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [todos, setTodos] = useState([]);
    const [product, setProduct] = useState([]);
    const [newProduct, setNewProduct] = useState([]);
    const navigate = useNavigate()

    const provinceData = ["All", "Stol", "Kreslo", "Devan", "Shkaf", "Xontaxta"];
    const imageListRef = ref(storage, 'images/');

    function filterHandler(key) {
        console.log(key);
    }

    useEffect(() => {
        async function get() {
            const id = await GetProduct();
            setNewProduct(id);
            console.log(id);
        }
    }, [product])

    const uploadImage = () => {
        if (images == null) return;
        const imageRef = ref(storage, `images/${images.name}`);
        uploadBytes(imageRef, images).then(() => {
            message.success('Image Uploaded');
            newProduct.map((item) => {
                console.log(item);
            })
        }).catch(() => {
            message.error('Image Not Uploaded');
        });
    };

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList(url);
                });
            });
        });
    }, []);

    const addProduct = (e) => {
        uploadImage();
        e.preventDefault();
        if (name !== '' && price !== '' && total !== '' && quantity !== '' && discount !== '') {
            AddProduct(imageList, name, price, total, quantity, discount );
            GetProduct();
            message.success('Add product succesfully');
            navigate('/dashboard/products');
        } else {
            message.error('Is Empty');
            console.log('hello');
        }
    };

    return (
        <>
            <Dashboard />
            <main className="dashboard-main">
                <div className="create-shop">
                    <div className="wrapper-title">
                        <h1>Create Product</h1>
                    </div>
                    <div className="product-wrapper">
                        <div className="input-wrapper">
                            <div className="picture-wrapper">
                                <input className="picture" multiple accept="image/*" type="file" onChange={(e) => setImages(e.target.files[0])} />
                            </div>
                            <div className="label-wrapper">
                                <label>Name: </label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" />
                                <label>Price: </label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="USD" />
                                <label>Total Price: </label>
                                <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="USD" />
                                <label>Discount: </label>
                                <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="(%)" />
                                <label>Category: </label>
                                <Select
                                    onChange={(value) => filterHandler(value)}
                                    defaultValue={provinceData[0]}
                                    style={{
                                        marginLeft: 10,
                                        width: 100,
                                    }}
                                    options={provinceData.map((province) => ({
                                        label: province,
                                        value: province,
                                    }))}
                                />
                                <label>Quantity: </label>
                                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="(qty)" />
                                <div>
                                    <Button onClick={() => navigate('/dashboard/products')}>Cancel</Button>
                                    <Button
                                        onClick={addProduct}
                                        type="primary"
                                    >Add Product</Button>
                                    {/* <Button>get</Button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
export { CreateShop };