
import { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { toast } from 'react-toastify';

import PaymentModel from "../PaymentModel";

const InforPaymentModel = ({ money, open, handleClose }) => {

    const [openPayment, setOpenPayment] = useState(false);
    const [numberPhone, setNumberPhone] = useState('');

    const handleOpenPayment = () => {
        setOpenPayment(true);

        handleClose();
    };
    const handleClosePayment = () => {
        setOpenPayment(false);
    };

    const clearData = () => {
        setNumberPhone('');
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 600,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>Your Payment Information</Typography>
                    <Box sx={{ my: 1 }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'gray' }}>Number phone.</Typography>
                        <TextField 
                            value={numberPhone} 
                            onChange={(e) => setNumberPhone(e.target.value)} 
                            variant="standard" 
                            placeholder='Enter your number phone.' 
                            sx={{ width: '100%' }} 
                        />
                        <Box sx={{mt: 3, display: 'flex', justifyContent: 'center'}}>
                            <Button onClick={handleOpenPayment} sx={{width: '100%', color: 'gray', fontWeight: 'bold'}}>
                                Checkout <ArrowCircleRightIcon sx={{mx: 1, color: 'orange'}}/>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <PaymentModel money={money} numberPhone={numberPhone} open={openPayment} handleClose={handleClosePayment} clearData={clearData} />
        </> 
    );
}

export default InforPaymentModel;