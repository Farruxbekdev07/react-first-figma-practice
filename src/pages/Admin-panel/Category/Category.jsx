import React, { useEffect, useRef, useState } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import { Button, Divider, Dropdown, Input, Select, Space } from 'antd';
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

                      </div>
                    </div>
                  </div>
                </div>
            </main>
        </>
    );
};

function SelectCategory () {
  let index = 0;
  const [items, setItems] = useState(['Furniture', 'Food', 'Car', 'Bike']);
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      style={{
        width: 450,
      }}
      placeholder="custom dropdown render"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: '8px 0',
            }}
          />
          <Space
            style={{
              padding: '0 8px 4px',
            }}
          >
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
            />
            <Button type="text" onClick={addItem} >
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({
        label: item,
        value: item,
      }))}
    />
  );
};

export { Category, SelectCategory };