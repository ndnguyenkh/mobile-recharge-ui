
import { Box, Button, Modal, Typography } from "@mui/material";
import AddCardIcon from '@mui/icons-material/AddCard';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { toast } from 'react-toastify';

import { useAuth } from "~/config/AuthProvider";
import { ErrorCodes } from "~/utils/Common/Message";
import { MYACCOUT_API, VNPAY_CUS_API, VNPAY_GUEST_API } from "~/apis/RechargeOnlineAPI";

const PaymentModel = ({ money, numberPhone, open, handleClose, clearData }) => {

    const { auth } = useAuth();

    const handleClickVNPAY = async () => {
        if (!auth) {
            try {
                const res = await VNPAY_GUEST_API("guest", money, numberPhone);
                if (res.rechargeId) {
                    toast.success(`VNPAY ${money} ${numberPhone}`);
    
                    handleClose();
                    clearData();
                    
                    window.open(res.paymentUrl, "_blank");
                    // window.location.href = res.paymentUrl;
                }
            } catch(error) {
                console.log(error);
                toast.error(ErrorCodes.SERVER_ERROR.message); // Thông báo lỗi khi gọi API
            }
        } else if(auth) {
            try {
                const res = await VNPAY_CUS_API(money, numberPhone);
                if (res.rechargeId) {
                    toast.success(`VNPAY ${money} ${numberPhone}`);
    
                    handleClose();
                    clearData();
                    // window.open(res.paymentUrl, "_blank");
                    // window.location.href = res.paymentUrl;
                    window.open(res.paymentUrl, '_blank');
                }
            } catch(error) {
                console.log(error);
                toast.error(ErrorCodes.SERVER_ERROR.message); // Thông báo lỗi khi gọi API
            }
        } 
    }

    const handleClickMyAccount = async () => {
        if (!auth) {
            toast.info(`You do not have a My Account!`);
        } else {
            try {
                const res = await MYACCOUT_API(money, numberPhone);
                if (res.rechargeId) {
                    toast.success(`My Account ${money}`);
                    handleClose();
                    clearData();
                }
            } catch(error) {
                console.log(error);
                toast.error(ErrorCodes.SERVER_ERROR.message); // Thông báo lỗi khi gọi API
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
};

export default PaymentModel;
