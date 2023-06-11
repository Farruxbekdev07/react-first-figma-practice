import React, { useEffect, useRef, useState } from "react";
import { Dashboard } from "../../Dashboard/Dashboard.js";
import "../../../../css/TS/Products/Create-shop/Create-shop.css";
import { Button, Modal, Select, Space, message } from 'antd';
import sofa from '../../../../media/images/sofa_1.png';
import { useNavigate } from "react-router-dom";
import { AddProduct, GetProduct } from "../../../../Utils/Product_utils/Product_utils.js";
import { storage } from "../../../../firebase/index.js";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
// import { uuid as v4 } from "uuidv4";
import { Storage, downloader, imgUploader } from "../../../../Utils/Product_utils/Storage.js";
import { SelectCategory } from "../../Category/Category.jsx";

function CreateShop() {
    const [name, setName] = useState("");
    const [images, setImages] = useState('');
    const [imageList, setImageList] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState("");
    const [total, setTotal] = useState("");
    const [discount, setDiscount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [todos, setTodos] = useState([]);
    const [product, setProduct] = useState([]);
    const [newProduct, setNewProduct] = useState([]);
    const navigate = useNavigate()
    
    const productTypes = ['Tables', 'Chairs', 'Couches'];
    const imageListRef = ref(storage, 'images/');
    const [category, setCategory] = useState(productTypes[0]);

    useEffect(() => {
        async function get() {
            const id = await GetProduct();
            setNewProduct(id);
        }
        get()
    }, [product])

    const uploadImage = () => {
        if (images == null) return;
        const imageRef = ref(storage, `images/${images.name}`);
        uploadBytes(imageRef, images).then(() => {
            message.success('Image Uploaded');
            console.log(imageRef);
            console.log(images);
        }).catch(() => {
            message.error('Image Not Uploaded');
        });
    };

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList(url);
                    console.log(url);
                    console.log(imageList);
                });
            });
        });
    }, []);

    const addProduct = (e) => {
        uploadImage();
        e.preventDefault();
        if (images.length !== 0) {
            if (name !== '' && price !== '' && total !== '' && quantity !== '' && discount !== '') {
                AddProduct(imageList, name, price, total, quantity, discount, category);
                GetProduct();
                message.success('Add product succesfully');
                navigate('/dashboard/products');
            } else {
                message.error('Is Empty');
            }
        } else {
            console.log(false);
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
                                <input className="picture" multiple accept="image/*" type="file" onChange={(e) => {setImages(e.target.files[0]) }} />
                            </div>
                            <div className="label-wrapper">
                                <label>Name: </label>
                                <input className="input-category" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" />
                                <label>Price: </label>
                                <input className="input-category" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="USD" />
                                <label>Total Price: </label>
                                <input className="input-category" type="number" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="USD" />
                                <label>Discount: </label>
                                <input className="input-category" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="(%)" />
                                <label>Category: </label>
                                <select className="input-category" onChange={(value) => setCategory(value.target.value)} defaultValue={productTypes[0]}>
                                {
                                    productTypes.map((province) => {
                                        return (
                                            <option>{province}</option>
                                        )
                                    })
                                }
                                </select>
                                <label>Quantity: </label>
                                <input className="input-category" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
                                <div className="btn-wrap">
                                    {/* <Button onClick={() => navigate('/dashboard/products')}>Cancel</Button> */}
                                    <Button onClick={() => console.log(images)}>Cancel</Button>
                                    <Button
                                        onClick={addProduct}
                                        type="primary"
                                    >Add Product</Button>
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