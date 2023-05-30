// import React from 'react';
// import { Timestamp, addDoc, collection, doc, getDoc, setDoc, getDocs } from "firebase/firestore";
// import { db } from '../../../../firebase/index';
// import { message } from 'antd';
// const userEmail = localStorage.getItem('email');

// async function Category(id) {
//     const docRef = doc(db, `${userEmail}.products`, id);
//     const docSnap = await getDoc(docRef);
//     const data = docSnap.data();
//     console.log(data);

//     try {
//         const docRef = await addDoc(collection(db, `${userEmail}.category`), {
//             names: data.names,
//             prices: data.prices,
//             totals: data.totals,
//             quantity: data.quantity,
//             discounts: data.discounts,
//             images: data.images,
//             id: Math.floor(Math.random() * 100),
//             created: Timestamp.now(),
//         });
//         message.success('Added sales succesfully');
//         console.log("Document written with product name: ");
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// }
// async function getCategory() {
//     const docSnap = await getDocs(collection(db, `${userEmail}.category`));
//     return docSnap.docs.map((item) => {
//         return {...item.data(), id: item.id};
//     });
// }

// export { Category, getCategory };