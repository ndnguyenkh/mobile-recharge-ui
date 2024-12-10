
import { Box, Button, Modal, Typography } from "@mui/material";
import AddCardIcon from '@mui/icons-material/AddCard';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { toast } from 'react-toastify';

import { useAuth } from "~/config/AuthProvider";
import { PAYMENT_BILL_MYACCOUT_API, PAYMENT_BILL_VNPAY_API } from "~/apis/PostBillPaymentAPI";
import { ErrorCodes, Success } from "~/utils/Common/Message";

const PaymentModel = ({invoiceNumber, open, handleClose}) => {

    const { auth } = useAuth();

    const handleClickVNPAY = async () => {
        if (invoiceNumber) {
            try {
                const res = await PAYMENT_BILL_VNPAY_API(invoiceNumber);
                if (res.paymentUrl) {
                    toast.success(Success.SUCCESS_PAYMENT.message);

                    handleClose();
                    // window.location.href = res.paymentUrl;
                    window.open(res.paymentUrl, '_blank');
                }
            } catch (error) {
                console.log(error);
                toast.error(ErrorCodes.SERVER_ERROR.message); // Thông báo lỗi khi gọi API
            }
        } else {
            toast.error(ErrorCodes.SERVER_ERROR.message);
        }
    }

    const handleClickMyAccount = async () => {
        if (!auth) {
            toast.info(`You do not have a My Account!`);
        } else {
            console.log(invoiceNumber);
            if (invoiceNumber) {
                try {
                    const res = await PAYMENT_BILL_MYACCOUT_API(invoiceNumber);
                    if (res.paymentId) {
                        toast.success(Success.SUCCESS_PAYMENT.message);
                        
                        handleClose();
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(ErrorCodes.SERVER_ERROR.message); // Thông báo lỗi khi gọi API
                }
            } else {
                toast.error(ErrorCodes.SERVER_ERROR.message);
            }
        }
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