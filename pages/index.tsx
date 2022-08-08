import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from "react"
import router from 'next/router'
import { getUserFromLocalStorage } from '../services/common/common'
import Login from '../components/login/Login'

const Home: NextPage = () => {
  
  useEffect(() => {
    if (typeof window !== 'undefined' && !!getUserFromLocalStorage() && window.location.pathname === '/') {  
      router.push("/shop");
    }
    else {
      if (window.location.pathname !== '/' && !!getUserFromLocalStorage()) {
          router.push(window.location.pathname)
      }else{
        router.push('/');
      }
    }        
  }, []);

  return (
    <>
      <Head>
        <title>Firebase</title>
      </Head>
      <Login />
    </>
  )
}

export default Home
