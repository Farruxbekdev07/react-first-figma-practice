import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { message } from "antd";
async function EditProduct(id, image, eName, ePrice, eTotal, eQuantity, eDiscount) {
    const userEmail = localStorage.getItem('email');
    const updateRef = doc(db, `${userEmail}.products`, id);
    const editDoc = (await getDoc(updateRef)).data();
    console.log(editDoc);
    console.log(image);

    if (eName, ePrice, eTotal, eQuantity, eDiscount) {
        console.log(true);
        await updateDoc(updateRef, {
            names: eName,
            prices: ePrice,
            totals: eTotal,
            quantity: eQuantity,
            discounts: eDiscount,
        });
    } else {
        console.log(false);
    }
}
export default EditProduct;