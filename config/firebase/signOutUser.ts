import { signOut } from 'firebase/auth';
import { auth } from "../firebase" 
import router from 'next/router'

const signOutUser = () => {
    auth.signOut()
    .then(() => {
        console.log("User Signed out");
        router.push('/');    
        localStorage.clear(); 
    })
    .catch((err) => console.log("Error while signing out user :",err));
}

export default signOutUser