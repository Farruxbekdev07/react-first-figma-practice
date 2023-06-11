import React, {useEffect, useState} from "react";
import searchImg from '../../../media/icons/编组.png';
import { Dashboard } from "../Dashboard/Dashboard.js";
import filter2 from '../../../media/images/filter_2.png';
import filter from '../../../media/images/filter.png';
import category from '../../../media/images/down_strelka.png';
import strelka from '../../../media/images/strelka.png';
import table2 from '../../../media/images/table_2.png';
import { Button, Dropdown, Select, Space, Spin } from "antd";
import '../../../css/TS/App.css';
import '../../../css/TS/Products/Product.css';
import { Link, useNavigate } from "react-router-dom";
import Product_detail from "./Detail/Product_detail";
import { Product_filter } from "./Filter/Product_filter";
import { Pagination } from "antd";
import { GetProduct } from "../../../Utils/Product_utils/Product_utils";
import { DropdownFunc } from "../Category/Category";
// import { Basket } from './Product-Basket/Basket';
import { ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

function Products() {
    const [search, setSearch] = useState('');
    const [newProduct, setNewProduct] = useState([]);
    const [product, setProduct] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
	const [postsPerPage] = useState(8);
    const [newQuantity, setNewQuantity] = useState(0);
    const [newPurchase, setNewPurchase] = useState([]);
    const byCategory = ["All", "Tables", "Chairs", "Couches"];
    const byName = ['A to Z', 'Z to A'];
    const byPrice = ['Small to Big', 'Big to Small'];
    const added = ['First added', 'Last added'];
    const userEmail = localStorage.getItem('email');

    async function getPurchaseDoc() {
        const docSnap = await getDocs(collection(db, `${userEmail}.purchase`));
        return docSnap.docs.map((item) => {
            return {...item.data(), id: item.id};
        });
    }

    async function Basket(id) {
        const productRef = doc(db, `${userEmail}.products`, id);
        const productData = (await getDoc(productRef)).data();
        const purchase = await getPurchaseDoc();
        setNewPurchase(purchase);

        async function addToBasket() {
            const filter = purchase.filter((filterItem) => filterItem.idd === id);
            if (filter.length !== 0) {
                if (productData.quantity > 1) {
                    setLoading(true);
                    const qty = filter.map((item) => item.quantity);
                    const purchaseRef = doc(db, `${userEmail}.purchase`, filter[0].id);
                    const purchaseDoc = (await getDoc(purchaseRef)).data();
                    const purchaseQty = Number(qty.toString());
                    const productQty = productData.quantity;
                    await updateDoc(productRef, {
                        quantity: productQty - 1
                    })
                    await updateDoc(purchaseRef, {
                        quantity: purchaseQty + 1
                    })
                    setNewQuantity(productQty);
                    console.log('update quantity');
                    setLoading(false);
                } else {
                    console.log(false);
                }
            } else {
                setLoading(true);
                const date = new Date();
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                try {
                    const docRef = await addDoc(collection(db, `${userEmail}.purchase`), {
                        names: productData.names,
                        prices: productData.prices,
                        totals: productData.totals,
                        quantity: 1,
                        discounts: productData.discounts,
                        images: productData.images,
                        idd: id,
                        created: `${day}/${month}/${year}`,
                    });
                    await updateDoc(productRef, {
                        quantity: productData.quantity - 1
                    })
                    setNewQuantity(productData.quantity)
                    console.log('added purchase');
                } catch (e) {
                    console.error(e);
                }
                setLoading(false);
            }
        }

        try {
            addToBasket();
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        async function get() {
            const products = await GetProduct();
            setProduct(products);
        };
        get();
    }, [newQuantity])

    useEffect(() => {
        async function get() {
            const products = await GetProduct();
            setProduct(products);
        };
        get();
    }, [newProduct])

    const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = product.slice(indexOfFirstPost, indexOfLastPost);

    async function filterHandler(key) {
        if (key == "All") {
            const products = await GetProduct();
            setProduct(products);
        } else if (key) {
            const products = await GetProduct();
            const productFilter = products.filter((item) => item.category.toLowerCase() === key.toLowerCase());
            setProduct(productFilter);
        } else {
            setProduct(product);
        }
    }

    async function SortByName(key) {
        const products = await GetProduct();
        if (key == 'A to Z') {
            const productFilter = products.sort((a, b) => (a.names > b.names ? 1 : -1))
            setProduct(productFilter);
        } else {
            const productFilter = products.sort((a, b) => (a.names > b.names ? -1 : 1))
            setProduct(productFilter);
        }
    }

    async function SortByPrice(key) {
        const products = await GetProduct();
        if (key == 'Small to Big') {
            const productFilter = products.sort((a, b) => {
                return a.prices - b.prices;
            })
            setProduct(productFilter);
        } else {
            const productFilter = products.sort((a, b) => {
                return b.prices - a.prices;
            })
            setProduct(productFilter);
        }
    }

    async function addedFilter(key) {
        console.log(key);
        const products = await GetProduct();
        if (key == 'First added') {
            const productFilter = products.sort((a, b) => new Date(...a.created.split('/').reverse()) - new Date(...b.created.split('/').reverse()));
            setProduct(productFilter);
        } else {
            const productFilter = products.sort((a, b) => new Date(...b.created.split('/').reverse()) - new Date(...a.created.split('/').reverse()));
            setProduct(productFilter);
        }
    }

	const paginate = ({ selected }) => {
		setCurrentPage(selected + 1);
	};

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
                            <ReactPaginate
                                onPageChange={paginate}
                                pageCount={Math.ceil(product.length / postsPerPage)}
                                previousLabel={<i class="fa-solid fa-left-long"></i>}
                                nextLabel={<i class="fa-solid fa-right-long"></i>}
                                containerClassName={'pagination'}
                                pageLinkClassName={'page-number'}
                                previousLinkClassName={'page-number'}
                                nextLinkClassName={'page-number'}
                                activeLinkClassName={'active'}
                            />
                            <div className="button-wrapper">
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
                                <Select
                                    onChange={(value) => SortByPrice(value)}
                                    defaultValue={'By Price'}
                                    style={{
                                        marginLeft: 10,
                                        width: 120,
                                    }}
                                    options={byPrice.map((province) => ({
                                        label: province,
                                        value: province,
                                    }))}
                                />
                                <Select
                                    onChange={(value) => filterHandler(value)}
                                    defaultValue={byCategory[0]}
                                    style={{
                                        marginLeft: 10,
                                        width: 100,
                                    }}
                                    options={byCategory.map((province) => ({
                                        label: province,
                                        value: province,
                                    }))}
                                />
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
                            {
                                loading == true ?
                                <Spin spinning={loading}></Spin> :
                                <div className="card-wrapper">
                                    {
                                        currentPosts.filter((item) => {
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
                                                                <Button className="add" type="primary" onClick={() => Basket(item.id)}>+</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export { Products };