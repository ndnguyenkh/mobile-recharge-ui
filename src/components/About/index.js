
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EastIcon from '@mui/icons-material/East';

import DataImages from "~/utils/DataImages";

const About = () => {
    return ( 
        <Box sx={{mb: 5}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', my: 5}}>
                <Typography variant="h4" sx={{fontWeight: 'bold', color: 'gray'}}>About Us</Typography>
            </Box>
            <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        minHeight: '300px',
                        backgroundSize: 'cover',
                        backgroundImage: `url('${DataImages.about}')`,
                        border: '1px solid gray',
                        borderRadius: '10px'
                    }} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Box>
                        <Typography variant='h4' sx={{display: 'flex', alignItems: 'center', mx: 10, fontWeight: 'bold', fontStyle: 'italic', color: '#660066'}}>
                            information about 
                            <Typography variant="h4" sx={{mx: 1, fontWeight: 'bold', color: '#ff66cc'}}>us</Typography>
                        </Typography>  
                        <Box sx={{mt: 2, mx: 8, fontSize: '24px', color: 'gray'}}>
                            Recharge Online System is one of the most trusted systems that allows users to top up their phone balances quickly and flexibly with a variety of payment gateways. It is available across multiple platforms, including laptop, mobile, tablet, and more.
                        </Box>
                        <Box sx={{mt: 2, mx: 8, display: 'flex', justifyContent: 'start'}}>
                            <PinterestIcon sx={{color: 'pink', fontSize: '35px', cursor: 'pointer', ':hover': {color: 'gray'}}} />
                            <LinkedInIcon sx={{color: 'blue', fontSize: '35px', cursor: 'pointer', ':hover': {color: 'gray'}, mx: 1}} />
                            <XIcon sx={{color: 'black', fontSize: '35px', cursor: 'pointer', ':hover': {color: 'gray'}}}/>
                            <TwitterIcon sx={{color: 'blue', fontSize: '35px', cursor: 'pointer', ':hover': {color: 'gray'}, mx: 1}}/>
                            <YouTubeIcon sx={{color: 'red', fontSize: '35px', cursor: 'pointer', ':hover': {color: 'gray'}}}/>
                            <InstagramIcon sx={{color: '#ff66cc', fontSize: '35px', cursor: 'pointer', ':hover': {color: 'gray'}, mx: 1}}/>
                            <FacebookIcon sx={{color: 'blue', fontSize: '35px', cursor: 'pointer', ':hover': {color: 'gray'}}}/>
                        </Box>
                        <Box sx={{mt: 2, mx: 8}}>
                            <Button sx={{':hover': {mx: '15px'}}}><Link href="/about-us" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Learn More<EastIcon sx={{':hover': {width: '50px'}}}/></Link></Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
 
export default About;