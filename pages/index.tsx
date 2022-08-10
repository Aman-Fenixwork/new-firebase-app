import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from "react"
import router from 'next/router'
import { getUserFromLocalStorage } from '../services/common/common'
import Login from '../components/login/Login'
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home: NextPage = () => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(true);
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
      <Stack spacing={2} sx={{ width: '100%' }}>      
        <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
            Hello, Welcome!
          </Alert>
        </Snackbar>
      </Stack>
    </>
  )
}

export default Home
