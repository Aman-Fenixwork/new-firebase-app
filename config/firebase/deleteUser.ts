import { reauthenticateWithCredential,EmailAuthProvider, GoogleAuthProvider, } from 'firebase/auth';
import router from 'next/router'
import { deleteDoc, doc} from 'firebase/firestore';
import { getUserFromLocalStorage } from '@services/common/common';
import { auth,db  } from "@config/firebase"
import { useState } from "react"

let localUser = getUserFromLocalStorage();
const provider = new GoogleAuthProvider();

    export const deleteAccountWithPassword = async () => {
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

    export const deleteAccountUsingGoogle = async () => {
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