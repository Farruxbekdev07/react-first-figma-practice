import React, { useState } from 'react';
import { Timestamp, addDoc, collection, doc, getDoc, setDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from '../../../../firebase/index';
import { message } from 'antd';
import { useEffect } from 'react';
const userEmail = localStorage.getItem('email');

// async function Basket(id) {
//     const docRef = doc(db, `${userEmail}.products`, id);
//     const docSnap = await getDoc(docRef);
//     const data = docSnap.data();
//     const qty = Number(data.quantity);
//     console.log(qty);
//     const newQty = qty - 1;
//     console.log(newQty);

//     return (
//         <>
//             <p>
//             {
//                 newQquantity
//             } new quantity
//             </p>
//         </>
//     )
// }

async function getCategory() {
    const docSnap = await getDocs(collection(db, `${userEmail}.category`));
    return docSnap.docs.map((item) => {
        return {...item.data(), id: item.id};
    });
}
export { getCategory };