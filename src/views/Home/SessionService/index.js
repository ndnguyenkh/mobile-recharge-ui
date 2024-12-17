
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { toast } from "react-toastify";
import MoneyIcon from '@mui/icons-material/Money';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ExtensionIcon from '@mui/icons-material/Extension';

import { useAuth } from "~/config/AuthProvider";
import { ErrorCodes } from "~/utils/Common/Message";


const SessionService = () => {

    const { auth } = useAuth();
    const navigate = useNavigate();

    const handleOpenAuthLoggedBill = () => {
        try {
            if (!auth) {
                navigate("/login");
            } else {
                navigate("/pay-the-bills");
            }
        } catch (error) {
            toast.error(ErrorCodes.SERVER_ERROR.message);
        }
    };

    const handleOpenAuthLoggedGame = () => {
        try {
            if (!auth) {
                navigate("/login");
            } else {
                navigate("/spinning");
            }
        } catch (error) {
            toast.error(ErrorCodes.SERVER_ERROR.message);
        }
    };

    return ( 
        <Box sx={{my: '50px', mx: '150px'}}>
            <Typography variant="h4" sx={{textAlign: 'center', fontWeight: 'bold', color: 'gray', my: 8}}>Services</Typography>
            <Box sx={{mt: 3, display: 'flex', justifyContent: 'center'}}>
                <Grid container spacing={1}>
                    <Grid item md={4}>
                        <Box sx={{height: '200px', border: '1px solid pink', borderRadius: '10px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Link href="/recharge-phone"><MoneyIcon sx={{width: '150px', height: '150px', color: 'pink', cursor: 'pointer', ":hover": {color: 'gray'}}} /></Link>
                            </Box>
                            <Typography variant="h5" sx={{textAlign: 'center', fontWeight: 'bold', color: 'gray'}}>Recharge phone</Typography>
                        </Box>
                    </Grid>
                    <Grid item md={4}>
                        <Box sx={{height: '200px', border: '1px solid pink', borderRadius: '10px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button onClick={handleOpenAuthLoggedBill}>
                                    <Link><ReceiptLongIcon sx={{width: '150px', height: '150px', color: 'pink', cursor: 'pointer', ":hover": {color: 'gray'}}} /></Link>
                                </Button>
                            </Box>
                            <Typography variant="h5" sx={{textAlign: 'center', fontWeight: 'bold', color: 'gray'}}>Pay the bills</Typography>
                        </Box>
                    </Grid>
                    <Grid item md={4}>
                        <Box sx={{height: '200px', border: '1px solid pink', borderRadius: '10px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button onClick={handleOpenAuthLoggedGame}>
                                    <Link><ExtensionIcon sx={{width: '150px', height: '150px', color: 'pink', cursor: 'pointer', ":hover": {color: 'gray'}}} /></Link>
                                </Button>
                            </Box>
                            <Typography variant="h5" sx={{textAlign: 'center', fontWeight: 'bold', color: 'gray'}}>Mini Games</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
     );
}
 
export default SessionService;