import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { message } from "antd";
async function EditProduct(id, eName, ePrice, eTotal, eQuantity, eDiscount) {
    const [product, setProduct] = useState([])
    const [newProduct, setNewProduct] = useState([])
    const userEmail = localStorage.getItem('email')

    async function getproduct() {
        const docRef = doc(db, `${userEmail}.products`, id);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        return {...docSnap.data(), id: docSnap.id};
    }

    useEffect(() => {
        async function get() {
            const editproduct = await getproduct();
            setNewProduct(editproduct)
        }
        get()
    }, [product])

    const updateRef = doc(db, `${userEmail}.products`, id);

    await updateDoc(updateRef, {
        names: eName,
        prices: ePrice,
        totals: eTotal,
        quantity: eQuantity,
        discounts: eDiscount,
    });
}
export default EditProduct;