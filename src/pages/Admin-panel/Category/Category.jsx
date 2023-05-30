import React, { useEffect, useState } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import { Button, Dropdown, Space } from 'antd';
import category from '../../../media/images/down_strelka.png';
// import { getCategory } from "../Products/Product-Sales/Sales";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import Product_detail from "../Products/Detail/Product_detail";
import { Link } from "react-router-dom";
import '../../../css/TS/Products/Product.css';
import '../../../css/TS/Category/Category.css';
import '../../../css/TS/App.css';

function Category() {
    const [product, setProduct] = useState([]);
    const [newProduct, setNewProduct] = useState([]);

    // useEffect(() => {
    //     async function get() {
    //         const category = await getCategory();
    //         setNewProduct(category);
    //     }
    //     get()
    // }, [product])

    return (
        <>
            <Dashboard />
            <main className="dashboard-main">
                <h1>Category</h1>
                <select name="category" id="category">
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                </select>

                <div className="products">
                  <div className="wrapper">
                    <div className="wrapper-body">
                      <div className="card-wrapper">
                        {/* {
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
                                              <Button className="danger">Remove</Button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                            )
                          })
                        } */}
                      </div>
                    </div>
                  </div>
                </div>
            </main>
        </>
    );
};

function DropdownFunc () {
    const items = [
      {
        key: '1',
        label: (
          <button>
            By Name
          </button>
        ),
      },
      {
        key: '2',
        label: (
          <button>
            By Price
          </button>
        ),
      },
      {
        key: '3',
        label: (
          <button>
            By Name
          </button>
        ),
      },
    ];

    return (
        <Space direction="vertical">
            <Space wrap>
                <Dropdown
                    menu={{items}}
                    placement="bottom"
                >
                    <Button className="category">
                      Category
                      <img src={category} alt="category" />
                    </Button>
                </Dropdown>
            </Space>
        </Space>
    )
};
DropdownFunc()

export { Category, DropdownFunc };