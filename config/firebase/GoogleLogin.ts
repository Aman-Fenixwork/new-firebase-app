import { signInWithPopup,GoogleAuthProvider, signInWithCustomToken } from "firebase/auth";
import { auth } from "../firebase"
import router from 'next/router'
import { setUserToLocalStorage } from "@services/common/common"
export const provider = new GoogleAuthProvider();
import addUserToDb from "./userDatabase/common-methods"

provider.setCustomParameters({
    prompt: "select_account",
});

export const logInWithPopup = () => {
    signInWithPopup(auth, provider)
    .then(async (userCredential) => {
        console.log("while login using google :",userCredential)
        const user = userCredential.user;
        setUserToLocalStorage(user,"logInWithPopup"); 
        router.push('/shop');
        await addUserToDb(user, user.uid);
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
}