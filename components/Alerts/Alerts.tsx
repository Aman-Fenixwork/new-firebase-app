import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alerts = ({severity, alertMessage, show} : {severity : any, alertMessage : string, show : boolean}) => {
  const [open, setOpen] = useState(false);

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    console.log("Show : ",show);
    setOpen(show);
  },[show]);

  return (
    <> 
      <Stack spacing={2} sx={{ width: '100%' }}>      
        <Snackbar open={open} autoHideDuration={1000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  )
}

export default Alerts