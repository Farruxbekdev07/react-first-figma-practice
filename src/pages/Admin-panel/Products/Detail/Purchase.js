import { Timestamp, addDoc, collection, doc, getDoc } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import { db } from "../../../../firebase";
async function Purchase(id) {
    const userEmail = localStorage.getItem('email');
    const docRef = doc(db, `${userEmail}.products`, id);
    const docSnap = (await getDoc(docRef)).data();
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    try {
        const docRef = await addDoc(collection(db, `${userEmail}.purchase`), {
          names: docSnap.names,
          prices: docSnap.prices,
          totals: docSnap.totals,
          quantity: docSnap.quantity,
          discounts: docSnap.discounts,
          images: docSnap.images,
          id: Math.floor(Math.random() * 100),
          created: `${day}/${month}/${year}`,
        });
        console.log("Document written with product name: ");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    
    console.log(docSnap);
    console.log(id, 'purchase id');
}
export { Purchase };