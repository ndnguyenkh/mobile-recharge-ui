
import { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { toast } from "react-toastify";

import { formatCurrency, formatDate, getCurrentDate } from "~/utils/Common/Format";
import PaymentModel from "../PaymentModel";
import { CHECK_BILL_API } from "~/apis/PostBillPaymentAPI";
import { ErrorCodes } from "~/utils/Common/Message";


const InfoModel = ({open, handleClose}) => {

    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [name, setName] = useState('admin');
    const [money, setMoney] = useState(20000);
    const [date, setDate] = useState('12/12/2020');

    const [show, setShow] = useState(false);

    const handleClickCheck = async () => {
        if (invoiceNumber) {
            try {
                const res = await CHECK_BILL_API(invoiceNumber);
                if (res.invoiceId) {
                    setInvoiceNumber(res.invoiceId);
                    setName("bill payment");
                    setMoney(res.amount);
                    setDate(getCurrentDate());

                    setShow(true);
                } else {
                    toast.info(`Cannot find the invoice with the code '${invoiceNumber}'.`);
                }
            } catch (error) {
                console.log(error);
                toast.error(ErrorCodes.SERVER_ERROR.message); // Thông báo lỗi khi gọi API
            }
        } else {
            toast.info("invoice number is not null");
        }
    }

    const [openPayment, setOpenPayment] = useState(false);

    const handleOpenPayment = () => {
        // setInvoiceNumber(invoiceNumber);
        setOpenPayment(true);

        handleClose();
        // setInvoiceNumber('');
    };
    const handleClosePayment = () => {
        setOpenPayment(false);
    };

    return ( 
        <>
            <Modal
                open={open}
                onClose={() => {
                    setShow(false);
                    setName("");
                    setMoney("");
                    setDate("");
                    // setInvoiceNumber("");
                    handleClose();
                }}
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
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>Your payment information</Typography>
                    <Box sx={{ my: 1 }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'gray' }}>Invoice number.</Typography>
                        <TextField 
                            value={invoiceNumber} 
                            onChange={(e) => setInvoiceNumber(e.target.value)} 
                            variant="standard" 
                            placeholder='Enter your invoice number.' 
                            sx={{ width: '100%' }} 
                        />
                        <Box sx={{mt: 3, display: 'flex', justifyContent: 'center'}}>
                            <Button
                                onClick={handleClickCheck} 
                                sx={{width: '100%', color: 'gray', fontWeight: 'bold'}}>
                                Check <ArrowCircleRightIcon sx={{mx: 1, color: 'orange'}}/>
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{display: show ? 'block' : 'none'}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>Your invoice information</Typography>
                        <Box sx={{ my: 1 }}>
                            <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'gray' }}>Invoice number: {invoiceNumber}</Typography>
                            <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'gray' }}>Name: {name}</Typography>
                            <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'gray' }}>Money: {formatCurrency(money)}</Typography>
                            <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'gray' }}>Date: {formatDate(date)}</Typography>
                            <Box sx={{mt: 3, display: 'flex', justifyContent: 'center'}}>
                                <Button
                                    onClick={handleOpenPayment} 
                                    sx={{width: '100%', color: 'gray', fontWeight: 'bold'}}>
                                    Checkout <ArrowCircleRightIcon sx={{mx: 1, color: 'orange'}}/>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <PaymentModel invoiceNumber={invoiceNumber} open={openPayment} handleClose={handleClosePayment} />
        </>
     );
}
 
export default InfoModel;