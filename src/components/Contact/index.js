
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import NearMeIcon from '@mui/icons-material/NearMe';
import DataImages from "~/utils/DataImages";
import { useState } from 'react';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';

import Loading from "../Loading";
import { ErrorCodes, Success } from "~/utils/Common/Message";

const Contact = () => {

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [messageError, setMessageError] = useState('');

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleMessageChange = (event) => setMessage(event.target.value);

    const validateForm = () => {
        let isValid = true;
        // Reset errors
        setEmailError('');
        setMessageError('');

        // Validate email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email.');
            isValid = false;
        }

        // Validate message
        if (message.trim() === '') {
            setMessageError('Message cannot be empty.');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        try {          
            if (!validateForm()) {
                toast.info(ErrorCodes.DATA_NOT_FOUND.message);
                return;
            }
            // Template parameters
            const templateParams = {
                to_name: email,
                from_name: email, // Người gửi (email người dùng nhập)
                message: message, // Nội dung tin nhắn
            };

            // Gửi email qua EmailJS
            emailjs.send('service_mobile_recharge', 'template_mobile_recharge', templateParams, '1y44epVOr8l42aFrZ')
                .then((response) => {
                    //console.log('Email sent successfully:', response);
                    // Clear the form
                    setEmail('');
                    setMessage('');
                    toast.success(Success.SUCCESS_SEND.message);
                })
                .catch((error) => {
                    //console.error('Error sending email:', error);
                    toast.error(ErrorCodes.BAD_REQUEST.message);
                });
        } catch {
            toast.error(ErrorCodes.BAD_REQUEST.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    return ( 
        <Box sx={{mb: 5}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', my: 5}}>
                <Typography variant="h4" sx={{fontWeight: 'bold', color: 'gray'}}>Contact Us</Typography>
            </Box>
            <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                    <Box>
                        <Typography variant='h4' sx={{display: 'flex', alignItems: 'center', mx: 10, fontWeight: 'bold', fontStyle: 'italic', color: '#660066'}}>
                            Send a 
                            <Typography variant="h4" sx={{mx: 1, fontWeight: 'bold', color: '#ff66cc'}}>Message</Typography>
                        </Typography>  
                        <Box sx={{mx: 10}}>
                            <Typography variant='h6' sx={{my: 1, fontWeight: 'bold', color: 'gray'}}>Your Email</Typography>
                            <TextField 
                                variant="standard" 
                                placeholder='Enter your email' 
                                sx={{width: '100%'}} 
                                value={email}
                                onChange={handleEmailChange}
                                error={!!emailError}
                                helperText={emailError}
                            />
                            <Typography variant='h6' sx={{my: 1, fontWeight: 'bold', color: 'gray'}}>Message</Typography>
                            <TextField 
                                variant="standard" 
                                placeholder='Enter your message' 
                                sx={{width: '100%'}} 
                                value={message}
                                onChange={handleMessageChange}
                                error={!!messageError}
                                helperText={messageError}
                                multiline
                                rows={4}
                            />
                            <Button
                                sx={{
                                    my: 2,
                                    color: 'gray',
                                    ":hover": { color: 'black', backgroundColor: 'rgba(22, 24, 35, 0.09)' },
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onClick={handleSubmit}
                            >
                                <NearMeIcon sx={{color: 'pink', mr: 1}} />
                                Send Now
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        minHeight: '300px',
                        backgroundSize: 'cover',
                        backgroundImage: `url('${DataImages.contact}')`,
                        border: '1px solid gray',
                        borderRadius: '10px'
                    }} />
                </Grid>
            </Grid>

            <Loading loading={loading} />
        </Box>
    );
}

export default Contact;
