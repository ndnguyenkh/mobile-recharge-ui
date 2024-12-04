
import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { Box, Button, TextField, Typography } from '@mui/material';

// import { LoginApi } from '~/apis/UserApi';
import Loading from '~/components/Loading';
// import { useAuth } from '~/config/AuthProvider';

export default function Login() {

  // const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // if (email && password) {
    //   try {
    //     setLoading(true);
    //     const res = await LoginApi(email, password);
    //     if (res.access_token) {
    //       login(res.access_token);
    //       navigate('/profile');
    //     } else {
    //       toast.error('Login failed. Please check your credentials.'); // Thông báo lỗi khi api trả về null
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     toast.error('An error occurred. Please try again later.'); // Thông báo lỗi khi gọi API
    //   } finally {
    //     setLoading(false);
    //   }
    // } else {
    //   toast.info('Username and Password is not blank.');
    // }
    
  }

  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}> 
      <Box sx={{height: '80vh'}}>
        <Box sx={{my: 12}}>
          <Typography variant='h4' sx={{fontWeight: 'bold', fontStyle: 'italic', color: 'gray'}}>Login your account.</Typography>
          <Box sx={{my: 10}}>
            <Typography variant='h6' sx={{fontWeight: 'bold', color: 'gray'}}>Username.</Typography>
              <TextField variant="standard" placeholder='Enter your username' sx={{width: '100%'}}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            <Typography variant='h6' sx={{fontWeight: 'bold', color: 'gray'}}>Password.</Typography>
            <TextField type="password" variant="standard" placeholder='Enter your password' sx={{width: '100%'}}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button 
            sx={{color: 'gray', ":hover": {color: 'black', backgroundColor: 'rgba(22, 24, 35, 0.09)'}, width: '100%'}}
            onClick={handleLogin}
          >log in.</Button>
          <Button 
            sx={{color: 'gray', ":hover": {color: 'black', backgroundColor: 'rgba(22, 24, 35, 0.09)'}, width: '100%'}}
            onClick={(event) => {
              event.preventDefault();
              setLoading(true);
              setInterval(() => {
                setLoading(false);
                navigate('/register');
              }, 2000);
            }}
          >Create a new account.</Button>
        </Box>

        <Loading loading={loading} />
      </Box>
    </Box>
  );
}
