import { signInWithEmailAndPassword, signInWithCustomToken } from "firebase/auth";
import { auth } from "../firebase"
import router from 'next/router'
import { setUserToLocalStorage } from "@services/common/common"
import addUserToDb from "./userDatabase/common-methods"

export const loginWithEmailAndPassword = async (email: string, password: string) :Promise<any> => {
    return await signInWithEmailAndPassword(auth, email, password)
    .then( async (userCredential) => {
        const user = userCredential.user;
        router.push('/shop');
        setUserToLocalStorage(user);
        await addUserToDb(user, user.uid);
        //sign in with token
        const req = await fetch(`/api/auth`, {
            method: "POST",
            body: JSON.stringify({ uid: user.uid }),
        });
        const res = await req.json();
        if (res) {
            const _userCredential = await signInWithCustomToken(auth, res.token);
            console.log("User Credential with Token :",_userCredential)
        }
    })
    .catch((error) => {
        console.log("Error Message :",error)
    })
};