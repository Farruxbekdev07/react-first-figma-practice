import React, {useEffect, useState} from "react";
import searchImg from '../../../media/icons/编组.png';
import { Dashboard } from "../Dashboard/Dashboard.js";
import filter2 from '../../../media/images/filter_2.png';
import filter from '../../../media/images/filter.png';
import category from '../../../media/images/down_strelka.png';
import strelka from '../../../media/images/strelka.png';
import table2 from '../../../media/images/table_2.png';
import { Button, Dropdown, Select, Space } from "antd";
import '../../../css/TS/App.css';
import '../../../css/TS/Products/Product.css';
import { Link, useNavigate } from "react-router-dom";
import Product_detail from "./Detail/Product_detail";
import { Product_filter } from "./Filter/Product_filter";
import { Pagination } from "antd";
import { GetProduct } from "../../../Utils/Product_utils/Product_utils";
import { DropdownFunc } from "../Category/Category";
import { Category } from './Product-Sales/Sales';
import { ToastContainer } from "react-toastify";
import { SortByName } from "./Product-sort/Sort";
import { log } from "util";

function Products() {
    const [search, setSearch] = useState('');
    const [newProduct, setNewProduct] = useState([]);
    const [product, setProduct] = useState([]);

    const provinceData = ["All", "Names", "Kreslo", "Devan", "Shkaf", "Xontaxta"];
    
    function filterHandler(key) {
        console.log(key);
        if (key == "All") {
            setProduct(product);
            console.log(product);
        } else if (key === 'Names') {
            const productFilter = product.filter((item) => item.names.toLowerCase() === key.toLowerCase());
            setProduct(productFilter);
            console.log(productFilter);
        } else if (key === 'Kreslo') {
            const productFilter = product.filter((item) => item.names.toLowerCase() === key.toLowerCase());
            setProduct(productFilter);
            console.log(productFilter);
        } else {
            setProduct(product);
        }
    }

    useEffect(() => {
        async function get() {
            const products = await GetProduct();
            setProduct(products);
        };
        get();
    }, [newProduct])

    return (
        <>
            <Dashboard />
            <main className="dashboard-main">
                <div className="products">
                    <div className="wrapper-title">
                        <h1>Dashboard</h1>
                        <Button type="primary" title="Clicked 'Create Shop' text">
                            <Link to='/dashboard/products/create-shop'>Create Shop</Link>
                        </Button>
                    </div>
                    <div className="wrapper">
                        <div className="wrapper-header">
                            <div className="search-wrapper">
                                <img src={searchImg} />
                                <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" />
                            </div>
                            <div className="button-wrapper">
                                <button onClick={SortByName}>
                                    <img className="filter" src={filter2} alt="filter2" />
                                </button>
                                <button>
                                    <img className="filter" src={filter} alt="filter" />
                                </button>
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
                                <button className="category">
                                    Last Added
                                    <img src={strelka} alt="strelka" />
                                </button>
                            </div>
                        </div>
                        <div className="wrapper-body">
                            <div className="card-wrapper">
                                {
                                    product.filter((item) => {
                                        return search.toLowerCase() === ''
                                        ? item
                                        : item.names.toLowerCase().includes(search);
                                    }).map((item, i) => {
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
                                                        <del>${item.totals}</del>
                                                    </div>
                                                    <p>({item.quantity})</p>
                                                    <div>
                                                        <div>
                                                            <Button className="add" type="primary" onClick={() => Category(item.id)}>+</Button>
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
    );
};

export { Products };