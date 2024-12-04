
import React, { useState }  from 'react';
// import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
// import Loading from '~/components/Loading';
// import { toast } from 'react-toastify';
// import { RegisterApi } from '~/apis/UserApi';

export default function Register() {

  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  const [your_name, setYour_name] = useState("");
  const [your_email, setYour_email] = useState("");
  const [your_birthday, setYour_birthday] = useState("");
  const [your_password, setYour_password] = useState("");

  const handleRegister = async () => {
      // if (your_name && your_password && your_email && your_birthday) {
      //   setLoading(true);
      //   try {
      //     const res = await RegisterApi(your_name, your_password, your_email, your_birthday);
      //     if (res.name) {
      //       toast.success('Register successful.');
      //       navigate("/login");
      //     } else {
      //       toast.error('Register failed. Please check your credentials.'); // Thông báo lỗi khi api trả về null
      //     }
      //   } catch (error) {
      //     console.log(error);
      //     toast.error('An error occurred. Please try again later.'); // Thông báo lỗi khi gọi API
      //   } finally {
      //     setLoading(false);
      //   }
      // } else {
      //   toast.info('Username, email, birthday and Password is not blank.');
      // }
  }

  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}> 
      <Box sx={{height: '100vh'}}>
        <Box sx={{my: 12}}>
          <Typography variant='h4' sx={{fontWeight: 'bold', fontStyle: 'italic', color: 'gray'}}>Create a new account.</Typography>
          <Box sx={{my: 5}}>

            <Typography variant='h6' sx={{fontWeight: 'bold', color: 'gray'}}>Your name.</Typography>
              <TextField value={your_name} onChange={(e) => setYour_name(e.target.value)} variant="standard" placeholder='Enter your name' sx={{width: '100%'}}/>

            <Typography variant='h6' sx={{fontWeight: 'bold', color: 'gray'}}>Your email.</Typography>
              <TextField value={your_email} onChange={(e) => setYour_email(e.target.value)} variant="standard" placeholder='Enter your email' sx={{width: '100%'}}/>

            <Typography variant='h6' sx={{fontWeight: 'bold', color: 'gray'}}>Your birthday.</Typography>
              <TextField value={your_birthday} onChange={(e) => setYour_birthday(e.target.value)} type="date" variant="standard" placeholder='Enter your birthday' sx={{width: '100%'}}/>

            <Typography variant='h6' sx={{fontWeight: 'bold', color: 'gray'}}>Password.</Typography>
              <TextField value={your_password} onChange={(e) => setYour_password(e.target.value)} type="password" variant="standard" placeholder='Enter your password' sx={{width: '100%'}}/>

          </Box>
          
          <Button 
            sx={{color: 'gray', ":hover": {color: 'black', backgroundColor: 'rgba(22, 24, 35, 0.09)'}, width: '100%'}}
            onClick={handleRegister}
          >Create a new account.</Button>
          <Button 
            sx={{color: 'gray', ":hover": {color: 'black', backgroundColor: 'rgba(22, 24, 35, 0.09)'}, width: '100%'}}
            onClick={() => {
              setYour_name("");
              setYour_email("");
              setYour_birthday("");
              setYour_password("");
            }}
          >Cancel.</Button>
        </Box>

        {/* <Loading loading={loading} /> */}
      </Box>
    </Box>
  );
}