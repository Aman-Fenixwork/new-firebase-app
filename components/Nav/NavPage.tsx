import React, { useState,useEffect } from 'react'
import signOutUser from '@config/firebase/signOutUser';
import Styles from "@styles/Nav/nav.module.css"
import { auth } from "@config/firebase"
import router from 'next/router'
import { query, collection, onSnapshot, deleteDoc, doc} from 'firebase/firestore';
import { db } from '@config/firebase'; 
import { getUserFromLocalStorage } from '@services/common/common';
import { reauthenticateWithCredential,EmailAuthProvider, signInWithPopup, GoogleAuthProvider, } from 'firebase/auth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { getUserSignInMethod } from "@services/common/common"

const Nav = () => {
    let method = getUserSignInMethod();
    console.log("Methods use by Google : ",method);
    const provider = new GoogleAuthProvider();
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };
    
    let localUser = getUserFromLocalStorage();
    const [password, setPassword] = useState('');

    const [open, setOpen] = useState(false);
    const [userLogin, setUserLogin] = useState(false);
    const handleClose = () => setOpen(false);
    const [usersData, setUsersData] = useState<any>();
    useEffect(() => {
        const q = query(collection(db,"users"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setUsersData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
        });
        return () => unsubscribe()
    },[])

    const [active, setActive] = useState("Home");
    const logoutUser = () => {
        setActive("Logout");
        signOutUser();
    }

    const deleteAccountWithPassword = async () => {
        var user:any = auth.currentUser;
        
        let id : any;
        const credential = EmailAuthProvider.credential(
            localUser.email, 
            password
        );

        reauthenticateWithCredential(user, credential).then(() => {
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
        }).catch((error) => {
            console.log("An Error on the server :",error)
        });
        
    }

    const deleteAccountUsingGoogle = async () => {
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

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider).then(() => {
            setUserLogin(true);
        }).catch((e) => console.log("Error while login with google :",e))
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
                            <li style={{color: "red"}} className={active == "deleteAccount" ? Styles.active : Styles.deActive} onClick={() => {setActive("deleteAccount"); setOpen(true)}}>Delete Account</li>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style} className={Styles.loginModal}>
                                    <h3 style={{textAlign : "center"}}>Delete account</h3>
                                    {
                                        method == 'withEmailAndPassword' ? (
                                            <div>
                                                <TextField type="password" id="outlined-basic" label="Enter password" variant="outlined"  onChange={(e) => setPassword(e.target.value)}/>
                                                <div className={Styles.loginButton}>                                            
                                                    <Button disabled={password.length >2 ? false : true } variant="outlined" onClick={deleteAccountWithPassword}>Confirm</Button> 
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={Styles.loginButton}>
                                                <Button variant="outlined" onClick={handleGoogleLogin}>Login with Google Again!</Button>
                                                <Button disabled={userLogin ? false : true } variant="outlined" onClick={deleteAccountUsingGoogle}>Confirm</Button>
                                                
                                            </div>
                                        )
                                    }
                                </Box>
                            </Modal>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav