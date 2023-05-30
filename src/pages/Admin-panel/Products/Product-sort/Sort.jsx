import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import { GetProduct } from "../../../../Utils/Product_utils/Product_utils";
import { db } from "../../../../firebase";
import { ToastContainer, toast } from "react-toastify";
const userEmail = localStorage.getItem('email');

async function SortByName() {
    // const citiesRef = await getDocs(collection(db, `${userEmail}.products`));
    // const citiesRef = collection(db, `${userEmail}.products`);
    // console.log(citiesRef);
    // const q = query(citiesRef, orderBy('names'), limit(5));
    const res =  db.collection(`${userEmail}.products`).whereEqualTo("names", 'Chair');
    console.log(res);
    // console.log(q);
}
export { SortByName };