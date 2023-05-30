import { onAuthStateChanged, signOut } from "firebase/auth";
import React, {useEffect, useState} from "react";
import { auth } from "../../firebase";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";

function UserSignOut() {
    signOut(auth).then(() => {
        message.success('Sign out succesfully');
    }).catch((err) => {
        console.log(err);
    })
}

function Authentication() {
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        });

        return () => {
            listen();
        };
    }, []);
    // return (
    //     <>
    //         <div>
    //             <h1>{
    //             authUser
    //             ?<>
    //             <p>{`Signed In ${authUser.email}`} </p><Button onClick={UserSignOut}>Sign Out</Button></>
    //             :   <>
    //                     <p>Signed Out</p>
    //                     <Button onClick={() => navigate('/')}>Go To Sign Up</Button>
    //                 </>
    //             }</h1>
    //         </div>
    //     </>
    // )
}
export { Authentication, UserSignOut };