import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { useState } from "react";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'; // >
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'; // <

import RechargeCard from "~/components/RechargeCard";
import DataValues from "~/utils/DataValues";
import Loading from "~/components/Loading";

const RechargePhone = () => {

    const [recharge, setRecharge] = useState(DataValues.moneys);
    const [isAscending, setIsAscending] = useState(false);
    const [loading, setLoading] = useState(false);

    // Hàm sắp xếp tăng dần
    const sortAscending = () => {
        const sortedData = [...recharge].sort((a, b) => a.money - b.money);
        setRecharge(sortedData);
    };

    // Hàm sắp xếp giảm dần
    const sortDescending = () => {
        const sortedData = [...recharge].sort((a, b) => b.money - a.money);
        setRecharge(sortedData);
    };

    const handleClickFilter = () => {
        setLoading(true);
        setTimeout(() => {
            setIsAscending(prev => !prev);
            if (isAscending) {
                sortDescending();
            } else {
                sortAscending();
            }
            setLoading(false);
        }, 1500);
    };

    return ( 
        <Box sx={{ mx: 10 }}>
            <Typography variant="h6" sx={{ color: 'gray' }}>
                <Link href="/" sx={{ color: 'gray' }} underline="hover">Home</Link> / Recharge Phone
            </Typography>
            <Typography variant="h4" sx={{textAlign: 'center', fontWeight: 'bold', color: 'gray', my: 8}}>Recharge Phone</Typography>
            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box>
                    <Typography variant="h5" sx={{ color: 'gray', fontWeight: 'bold' }}>
                        Select the recharge card value that you want to add to your phone.
                    </Typography>
                </Box>
                <Box>
                    <Button onClick={handleClickFilter} sx={{':hover': {color: 'gray'}, borderRadius: '50%', width: '60px', height: '60px'}}>
                        {isAscending ? (<ExpandLessOutlinedIcon sx={{color: 'black', fontSize: '34px'}}/>) : (<ExpandMoreOutlinedIcon sx={{color: 'black', fontSize: '34px'}} />)}
                    </Button>
                </Box>
            </Box>
            <Box sx={{ mb: 5 }}>
                <Grid container spacing={1}>
                    {recharge.map((item, index) => (
                        <Grid key={index} item md={3} xs={12}>
                            <RechargeCard money={item.money} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Loading loading={loading} />        
        </Box>
    );
};

export default RechargePhone;
