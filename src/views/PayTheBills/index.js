
import { useState } from "react";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import OpacitySharpIcon from '@mui/icons-material/OpacitySharp';
import InsertInvitationSharpIcon from '@mui/icons-material/InsertInvitationSharp';
import InfoModel from "./InfoModel";


const PayTheBills = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return ( 
        <Box sx={{ mx: 10 }}>
            <Typography variant="h6" sx={{ color: 'gray' }}>
                <Link href="/" sx={{ color: 'gray' }} underline="hover">Home</Link> / Pay the bills
            </Typography>

            <Box sx={{my: 3, display: 'flex', justifyContent: 'center'}}>
                <Grid container spacing={1}>
                    <Grid item md={4}>
                        <Box sx={{height: '200px', border: '1px solid pink', borderRadius: '10px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button onClick={handleOpen}><TipsAndUpdatesIcon sx={{width: '150px', height: '150px', color: 'yellow', cursor: 'pointer', ":hover": {color: 'gray'}}} /></Button>
                            </Box>
                            <Typography variant="h5" sx={{textAlign: 'center', fontWeight: 'bold', color: 'gray'}}>Electricity bill</Typography>
                        </Box>
                    </Grid>
                    <Grid item md={4}>
                        <Box sx={{height: '200px', border: '1px solid pink', borderRadius: '10px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button onClick={handleOpen}><OpacitySharpIcon sx={{width: '150px', height: '150px', color: 'blue', cursor: 'pointer', ":hover": {color: 'gray'}}} /></Button>
                            </Box>
                            <Typography variant="h5" sx={{textAlign: 'center', fontWeight: 'bold', color: 'gray'}}>Water bill</Typography>
                        </Box>
                    </Grid>
                    <Grid item md={4}>
                        <Box sx={{height: '200px', border: '1px solid pink', borderRadius: '10px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button onClick={handleOpen}><InsertInvitationSharpIcon sx={{width: '150px', height: '150px', color: 'orange', cursor: 'pointer', ":hover": {color: 'gray'}}} /></Button>
                            </Box>
                            <Typography variant="h5" sx={{textAlign: 'center', fontWeight: 'bold', color: 'gray'}}>Insurance bill</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <InfoModel open={open} handleClose={handleClose} />
        </Box>
    );
}
 
export default PayTheBills;