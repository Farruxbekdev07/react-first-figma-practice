import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../../firebase";
import { toast } from "react-toastify";

async function DeleteProduct(id, navigate) {
    const userEmail = localStorage.getItem('email');
    const docRef = doc(db, `${userEmail}.products`, id);
    await deleteDoc(docRef);
    navigate('/dashboard/products');
    toast('Delete product succesfully');
}
export default DeleteProduct;