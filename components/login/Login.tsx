import { Form, Formik, Field, ErrorMessage } from 'formik'
import React, { useState } from 'react'
import * as yup from "yup"
import Styles from "@styles/login/login.module.css"
import Image from "next/image"
import loginImage from "@public/assets/login.svg";
import { logInWithPopup } from "@config/firebase/GoogleLogin";
import { createNewUserWithEmailAndPassword } from "@config/firebase/createUser"
import { loginWithEmailAndPassword } from "@config/firebase/signInWithEmail"


const Login = () => {

  const initialValues = { 
    email: "",
    password: "",
    userName : "",
  }

  const validationSchema = yup.object().shape({
    email : yup.string().required("Please Enter your email"),
    password : yup.string().required("Please Enter your password"),
    userName : yup.string().required("Please Enter your name"),
  })

  const [signUp, setSignUp] = useState<boolean>(false);
  const [userImage, setUserImage] = useState<any>();
  const [img, setImage] = useState<any>({})
  const handleImage = (e:any) => {
    setImage({
      image: URL.createObjectURL(e.target.files[0])
    })
    console.log("URL : ",URL.createObjectURL(e.target.files[0]))
    setUserImage(e.target.files[0]);
  }
  return (
    <>  
      <div className={Styles.login}>
        <div className={Styles.loginPage}>
          <div className={Styles.loginLeft}>
            <Image src={loginImage} height={600} width={300} alt="login"/>
          </div>
          <div className={Styles.loginRight}>
            <div className={Styles.loginRightDiv}>
              <div className={Styles.languageSelection}>
                <select name="" id="">
                  <option value="en">English</option>
                  <option value="hn">Hindi</option>
                  <option value="fc">French</option>
                </select>
              </div>
              {
                signUp ? (<h2>Sign up</h2>) : (<h2>Login</h2>)
              }
             
              <div className={Styles.inputsDiv}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={()=> console.log("Submited")}>
                {({
                    values,
                }) => (
                  <Form>
                    {
                      signUp ? (
                        <>
                          <div className={Styles.userImageDiv}>
                            <Image className={Styles.userImg} src={img.image ? img.image  : loginImage} height={100} width={100} alt="user image"/>
                            <input type="file" name="user image" onChange={handleImage} />
                          </div>
                          <Field type="string" name="userName" placeholder="Name" />
                          <small style={{color : "red"}}><ErrorMessage name="userName"/></small>
                        </>
                      ) : ('')
                    }
                    <Field type="email" name="email" placeholder="Email" />
                    <small style={{color : "red"}}><ErrorMessage name="email"/></small>
                    <Field type="password" name="password" placeholder="Password" />
                    <small style={{color : "red"}}><ErrorMessage name="password"/></small>
                    <div className={Styles.rememberMe}>
                      <div>
                        <input type="checkbox" name="remember me"/>
                        <small>Remember</small>
                      </div>
                      {
                        signUp ? (<span></span>) : (<small><a href="#">Forgot password?</a></small>)
                      }
                    </div>
                    {/* <div className={Styles.errorMessageDiv}>
                      <small>Error Message</small>
                    </div> */}
                    {
                      signUp ? (
                        <button type="submit" onClick={()=>createNewUserWithEmailAndPassword(values.email, values.password, userImage, values.userName)}>Sign up</button>
                      ) : (
                        <button type="submit" onClick={() =>loginWithEmailAndPassword(values.email, values.password)}>Login</button>
                      )
                    }
                    
                    <button type="button" onClick={logInWithPopup}>Login with Google</button>
                    {
                      signUp ? (
                        <h3 onClick={()=>setSignUp(false)}>Already have an account?<a>&nbsp;Login</a></h3>
                      ) : (
                        <h3 onClick={()=>setSignUp(true)}>Need an account?<a>&nbsp;Sign up</a></h3>
                      )
                    }
                  </Form>
                  )}
                </Formik>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
      
    </>
  )
}

export default Login