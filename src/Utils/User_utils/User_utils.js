import { Timestamp, addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/index';
import { createUserWithEmailAndPassword } from 'firebase/auth';
async function AddUser( fullName, phone, email, password ) {
  // awards.gov.uz
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  try {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setLocalStorage(email)
      console.log(userCredential);
    }).catch((err) => {
      console.log(err);
    });
    await addDoc(collection(db, 'users'), {
      fullNames: fullName,
      phones: phone,
      emails: email,
      passwords: password,
      date: `${day}/${month}/${year}`,
      id: Math.floor(Math.random() * 100),
    });
    console.log("Document written with name: ", fullName);
  } catch (e) {
    console.error("Error adding document: ", e);
  };
};
async function GetUser() {
  const docSnap = await getDocs(collection(db, "users"));
  return docSnap.docs.map((item) => {
    return item.data();
  });
}
function setLocalStorage(key) {
  localStorage.setItem('email', key)
}
export { AddUser, GetUser, setLocalStorage };