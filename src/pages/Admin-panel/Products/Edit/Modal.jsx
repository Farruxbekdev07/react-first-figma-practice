import { useEffect, useState } from 'react';
import React from 'react';
import { Button,Modal, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import EditProduct from '../Edit/Edit.js';
import { db } from '../../../../firebase/index.js';
import { doc, getDoc } from 'firebase/firestore';

const EditModal = ({id}) => {
    const userEmail = localStorage.getItem('email')
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [total, setTotal] = useState('');
    const [discount, setDiscount] = useState('');
    const [quantity, setQuantity] = useState('');
    const [newData, setNewData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function getproduct() {
        const docRef = doc(db, `${userEmail}.products`, id);
        const docSnap = await getDoc(docRef);
        return {...docSnap.data(), id: docSnap.id};
    }

    useEffect(() => {
        async function get() {
            const data = await getproduct();
            setProductData(data)
        }
        get()
    }, [newData])

    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
      EditProduct(productData.id, name, price, total, quantity, discount)
    };
    const handleCancel = () => {
      setIsModalOpen(false);
      console.log(productData);
    };

    return (
        <>
            <Button onClick={() => showModal(productData.id)}>
                Update
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} okText={'Edit'} onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Product Image"
                        name="image"
                        allowClear
                        rules={[
                            {
                                required: true,
                                message: 'Please input product name!',
                            },
                        ]}
                    >
                    <Input allowClear onChange={(e) => setImage(e.target.files)} defaultValue={productData.names} type='file' />
                    </Form.Item>

                    <Form.Item
                        label="Product name"
                        name="name"
                        allowClear
                        rules={[
                            {
                                required: true,
                                message: 'Please input product name!',
                            },
                        ]}
                    >
                    <Input allowClear value={name} onChange={(e) => setName(e.target.value)} defaultValue={productData.names} type='text' />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={
                            [
                            {
                                required: true,
                                message: 'Please input price!',
                            },
                        ]}
                    >
                        <Input allowClear value={price} onChange={(e) => setPrice(e.target.value)} defaultValue={productData.prices} type='number' />
                    </Form.Item>

                    <Form.Item
                        label="Discount"
                        name="discount"
                        rules={[
                            {
                            required: true,
                            message: 'Please input discount!',
                            },
                        ]}
                    >
                    <Input allowClear value={discount} onChange={(e) => setDiscount(e.target.value)} defaultValue={productData.discounts} type='number' />
                    </Form.Item>
                    <Form.Item
                        label="Quantity"
                        name="qty"
                        rules={[
                            {
                            required: true,
                            message: 'Please input quantity!',
                            },
                        ]}
                    >
                    <Input allowClear value={quantity} onChange={(e) => setQuantity(e.target.value)} defaultValue={productData.quantity} type='number' />
                    </Form.Item>
                    <Form.Item
                        label="Total"
                        name="total"
                        rules={[
                            {
                            required: true,
                            message: 'Please input total!',
                            },
                        ]}
                    >
                    <Input allowClear value={total} onChange={(e) => setTotal(e.target.value)} defaultValue={productData.totals} type='number' />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default EditModal;