import { createUserWithEmailAndPassword, signInWithCustomToken } from "firebase/auth";
import { auth } from "../firebase"
import router from 'next/router'
import { setUserToLocalStorage } from "@services/common/common"
import addUserToDb from "./userDatabase/common-methods";
import { uploadBytes, getDownloadURL } from "firebase/storage"
import { getStorage, ref } from "firebase/storage"

export const createNewUserWithEmailAndPassword = async (email: string, password: string, userImg : any, userName : string) :Promise<any> => {
    return await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
      const user = userCredential.user;
      const storage = getStorage();
      router.push('/shop');
      setUserToLocalStorage(user,"withEmailAndPassword"); 
      const imagesRef = ref(storage, `images/${userImg.name}`);
      uploadBytes(imagesRef, userImg).then((snapshot : any) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL : any) => {
          await addUserToDb(user, user.uid, downloadURL, userName)
            .then(() => console.log("User added to Database"))
            .catch((e) => console.log("Error Message :",e))
            const req = await fetch(`/api/auth`, {
              method: "POST",
              body: JSON.stringify({ uid: user.uid }),
            });
            const res = await req.json();
            if (res) {
              const _userCredential = await signInWithCustomToken(auth, res.token);
              console.log("User Credential with Token :",_userCredential)
            }
          });
      }).catch(function(error : any) {
        console.error('Upload failed:', error);
      });
      
    })
    .catch((error) => {
      console.log("Error Message :",error)
    })
};