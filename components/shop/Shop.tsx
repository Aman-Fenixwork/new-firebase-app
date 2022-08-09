import React, { useState, useEffect} from 'react'
import Styles from "@styles/shop/shop.module.css"
import { TextField, Button } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { orderBy, query, collection, onSnapshot, addDoc , deleteDoc, doc, setDoc} from 'firebase/firestore';
import { db } from '@config/firebase'; 
import Nav from "../Nav/NavPage"
import { useRouter } from 'next/router'

const Shop = () => {

  const [value, setValue] = useState<string>('');
  const [data, setData] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db,"to-do"), orderBy("time","desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));

    });
    return () => unsubscribe()
  },[])

  const handleClick = () => {
    console.log("Docs :",data)
    addDoc(
        collection(db,"to-do"),{
          name: value,
          time : new Date()
      }).then(() => setValue(''))
      .catch((e:any) => console.log("Error Message :",e))
  }

  const handleDelete = async (id:any) => {
    await deleteDoc(doc(db,"to-do",id));
  }

  const handleUpdate = (id:any) => {
    const ref = doc(db,"to-do",id);
    let newValue = prompt("Please enter new value :");
    setDoc(ref, {
        name : newValue,
        time : new Date()
    })
  }

  return (
    <> 
      <Nav/>
      <div className={Styles.shoppingContainer}>
        <h1>To-Do List</h1>
        <div className={Styles.shop}>
            <div className={Styles.shoppingHeader}>
                <TextField id="outlined-basic" label="Enter name" variant="outlined" onChange={(e) => setValue(e.target.value)} value={value} />
                <Button disabled={!value.length ? true : false} variant="outlined" onClick={handleClick}>Save</Button>
            </div>
            <div className={Styles.shoppingItems}>
                {
                    data.map((item : any,key : any) => {
                        return (
                            <div key={key} className={Styles.shoppingItem}>
                                <h1>{item.name}</h1>
                                <div>
                                    <EditIcon className={Styles.icon} onClick={() => handleUpdate(item.id)}/>
                                    <DeleteIcon className={Styles.icon} onClick={() => handleDelete(item.id)}/>
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
      </div>
    </>
  )
}

export default Shop