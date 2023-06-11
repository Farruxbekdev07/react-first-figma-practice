import { doc, addDoc, setDoc, Timestamp, collection, getDocs, getDoc } from "firebase/firestore";
import { message } from "antd";
import { db } from "../../firebase";
import img from '../../media/images/table.png';
const userEmail = localStorage.getItem('email');

async function AddProduct( name, price, total, qty, discount, image, category ) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  console.log(category);

  try {
    const docRef = await addDoc(collection(db, `${userEmail}.products`), {
      names: name,
      prices: price,
      totals: total,
      quantity: qty,
      discounts: discount,
      images: image,
      category: category,
      id: Math.floor(Math.random() * 100),
      created: `${day}/${month}/${year}`,
    });
    console.log("Document written with product name: ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

async function GetProduct() {
  const docSnap = await getDocs(collection(db, `${userEmail}.products`));
  return docSnap.docs.map((item) => {
    return {...item.data(), id: item.id};
  });
};
export { AddProduct, GetProduct };