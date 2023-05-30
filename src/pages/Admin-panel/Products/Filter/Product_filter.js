import React, {useState} from "react";
import searchImg from '../../../../media/icons/编组.png';
import { Dashboard } from "../../Dashboard/Dashboard.js";
import filter2 from '../../../../media/images/filter_2.png';
import filter from '../../../../media/images/filter.png';
import category from '../../../../media/images/down_strelka.png';
import strelka from '../../../../media/images/strelka.png';
import table2 from '../../../../media/images/table_2.png';
import filter_card from '../../../../media/images/filter-card.png';
import { Button } from "antd";
import '../../../../css/TS/App.css';
import '../../../../css/TS/Products/Product.css';
import '../../../../css/TS/Products/Filters/Filter.css'
import { Link, useNavigate } from "react-router-dom";
import Product_detail from "../Detail/Product_detail";

function Product_filter() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

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
                                <button>
                                    <img className="filter" src={filter2} alt="filter2" />
                                </button>
                                <button>
                                    <img className="filter" src={filter} alt="filter"/>
                                </button>
                                <button className="category">
                                    Category
                                    <img src={category} alt="category" />
                                </button>
                                <button className="category">
                                    Last Added
                                    <img src={strelka} alt="strelka" />
                                </button>
                            </div>
                        </div>
                        <div className="wrapper-body">
                            <div className="filter-title">
                                <input type='checkbox' />
                                <p className="title">Name</p>
                                <div>
                                    <p>Price</p>
                                    <p>Status</p>
                                    <p>Data</p>
                                    <p>Action</p>
                                </div>
                            </div>
                            <div className="filter-card-wrapper">
                                <input type="checkbox"/>
                                <div className="filter-card">
                                    <div>
                                        <img src={filter_card} alt="filter"/>
                                        <p>Parfume Faberlic</p>
                                    </div>
                                    <div className="last">
                                        <p>32$</p>
                                        <Button>Active</Button>
                                        <p>12.12.2022</p>
                                        <Button className="option">
                                            <i class="fa-solid fa-ellipsis"></i>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="filter-card-wrapper">
                                <input type="checkbox"/>
                                <div className="filter-card">
                                    <div>
                                        <img src={filter_card} alt="filter"/>
                                        <p>Parfume Faberlic</p>
                                    </div>
                                    <div className="last">
                                        <p>32$</p>
                                        <Button>Active</Button>
                                        <p>12.12.2022</p>
                                        <Button className="option">
                                            <i class="fa-solid fa-ellipsis"></i>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export { Product_filter };