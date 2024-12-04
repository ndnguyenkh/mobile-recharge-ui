
import { Box, Container, Divider, Typography } from "@mui/material";
import Image from "../Image";
import DataImages from "~/utils/DataImages";

const Footer = () => {
    return ( 
        <Box>
            <Divider />
            <Box sx={{background: '#c4c2bc', height: '150px'}}>
                <Container sx={{mx: 20, py: 2, display: 'flex', justifyContent: 'space-evenly'}}>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Box>
                            <Image src={DataImages.logo} alt="logo" style={{width: '120px', height: '120px', borderRadius: '50%'}} />
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Box sx={{display: 'block'}}>
                            <Typography sx={{fontWeight: 'bold'}}>Contact</Typography>
                            <Typography>Email: support.contact@gmail.com</Typography>
                            <Typography>Address: 01 lytutrong, ninhkieu, cantho</Typography>
                            <Typography>Phone: +84 123 456 789</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Box>
                            <Typography sx={{fontWeight: 'bold'}}>Support Customer</Typography>
                            <Typography>Warranty policy</Typography>
                            <Typography>About us</Typography>
                            <Typography>Instruct</Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Divider />
            <Box sx={{display: 'flex', justifyContent: 'space-evenly', backgroundColor: 'rgba(22, 24, 35, 0.09)'}}>
                <Typography variant="h3">Recharge Online</Typography>
                <Typography sx={{mt: 4}}>
                    © {new Date().getFullYear()} Recharge Online - All intellectual property rights reserved.
                </Typography>
            </Box>
        </Box>
     );
}
 
export default Footer;