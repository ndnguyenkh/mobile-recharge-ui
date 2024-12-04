
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { toast } from 'react-toastify';

import { formatCurrency } from "~/utils/Common/Format";
import InforPaymentModel from "../InfoPaymentModel";

const RechargeCard = ({money}) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return ( 
        <Box sx={{width: '100%', height: '200px', border: '1px solid pink', borderRadius: '10px', }}>
            <Box sx={{height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="h4" sx={{fontWeight: 'bold', color: 'gray'}}>{formatCurrency(money)}</Typography>
            </Box>
            <Box sx={{height: '30%', display: 'flex', justifyContent: 'center'}}>
                <Button onClick={handleOpen} sx={{width: '100%', ':hover': {color: 'gray'}, color: 'black', fontSize: '20px', fontStyle: 'italic'}}>Top up</Button>
            </Box>

            <InforPaymentModel money={money} open={open} handleClose={handleClose} />
        </Box>
     );
}
 
export default RechargeCard;