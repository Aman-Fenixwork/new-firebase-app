import React, { useState,useEffect } from 'react'
import signOutUser from '@config/firebase/signOutUser';
import Styles from "@styles/Nav/nav.module.css"
import { auth } from "@config/firebase"
import router from 'next/router'
import { query, collection, onSnapshot, deleteDoc, doc} from 'firebase/firestore';
import { db } from '@config/firebase'; 
import { getUserFromLocalStorage } from '@services/common/common';
import { Console } from 'console';

const Nav = () => {

    const [usersData, setUsersData] = useState<any>();
    useEffect(() => {
        const q = query(collection(db,"users"));
        let localUser = getUserFromLocalStorage();
        console.log("Local User :",localUser.id);
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setUsersData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
            console.log(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        });
        return () => unsubscribe()
    },[])

    const [active, setActive] = useState("Home");
    const logoutUser = () => {
        setActive("Logout");
        signOutUser();
    }

    const deleteAccount = async () => {
        setActive("deleteAccount")
        const localUser = getUserFromLocalStorage();
        var user:any = auth.currentUser;
        let id : any;
        user.delete().then(function() {
            router.push('/');
            localStorage.clear();
            if(usersData){
                usersData.map((user : any) => {
                    if(user.user_uid == localUser.uid){
                        id = user.id;
                    }
                })
                deleteDoc(doc(db,"users",id));
            }
        }).catch(function(error : any) {
            console.log("An Error on the server :",error)
        });
    }
    return (
        <div className={Styles.navBar}>
            <div className={Styles.nav}>
                <div className={Styles.navLeft}>
                    <div className={Styles.navLogo}>
                        .LOGO
                    </div>
                </div>
                <div className={Styles.navRight}>
                    <div className={Styles.navOptions}>
                        <ul>
                            <li className={active == "Home" ? Styles.active : Styles.deActive} onClick={() => setActive("Home")}>Home</li>
                            <li className={active == "About" ? Styles.active : Styles.deActive} onClick={() => setActive("About")}>About</li>
                            <li className={active == "Help" ? Styles.active : Styles.deActive} onClick={() => setActive("Help")}>Help</li>
                            <li className={active == "Logout" ? Styles.active : Styles.deActive} onClick={logoutUser}>Logout</li>
                            <li style={{color: "red"}} className={active == "deleteAccount" ? Styles.active : Styles.deActive} onClick={deleteAccount}>Delete Account</li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav