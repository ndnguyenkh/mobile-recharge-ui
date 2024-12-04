
import { Box, Button, Modal, Typography } from "@mui/material";
import AddCardIcon from '@mui/icons-material/AddCard';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { toast } from 'react-toastify';

import { useAuth } from "~/config/AuthProvider";

const PaymentModel = ({open, handleClose}) => {

    const { auth } = useAuth();

    const handleClickVNPAY = () => {
        toast.success(`VNPAY `);

        handleClose();
    }

    const handleClickMyAccount = () => {
        if (!auth) {
            toast.info(`You do not have a My Account!`);
        } else {
            toast.success(`My Account `);
        }

        handleClose();
    }

    return ( 
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
                <Typography variant="h5" sx={{fontWeight: 'bold', color: 'gray'}}>Select payment method</Typography>  
                <Box sx={{width: '100%', my: 2, display: 'flex', justifyContent: 'space-evenly'}}>
                    <Button sx={{color: 'gray', fontWeight: 'bold'}} onClick={handleClickMyAccount}>
                        <RequestQuoteIcon sx={{mx: 1, color: 'darkblue'}} /> MY ACCOUNT
                    </Button>
                    <Button sx={{color: 'gray', fontWeight: 'bold'}} onClick={handleClickVNPAY}>
                        <AddCardIcon sx={{mx: 1, color: 'pink'}} /> VNPAY
                    </Button>
                </Box>
            </Box>
        </Modal>
     );
}
 
export default PaymentModel;