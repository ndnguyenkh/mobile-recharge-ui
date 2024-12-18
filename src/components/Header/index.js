import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Divider, Link } from "@mui/material";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
// import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { toast } from 'react-toastify';

import Loading from "../Loading";
import { useAuth } from "~/config/AuthProvider";
import { ErrorCodes } from "~/utils/Common/Message";
import DataImages from "~/utils/DataImages";
import Image from "../Image";

const Header = () => {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleOpenLogin = () => {
        try {
            setLoading(true);
            if (!auth) {
                navigate("/login");
            } else {
                navigate("/profile");
            }
        } catch (error) {
            toast.error(ErrorCodes.SERVER_ERROR.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <Box>
            <Box sx={{ width: '100%', height: '40px', backgroundColor: 'black', display: 'flex', justifyContent: 'center' }}>
                <Link sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'white', ":hover": { textDecorationColor: 'white' } }}>
                    Hotline +84 123 456 789 <TrendingFlatIcon sx={{ color: 'white' }} />
                </Link>
            </Box>
            <Divider />
            <Container sx={{ mx: 20, height: '100px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* logo */}
                <Box>
                    <Image src={DataImages.logo} alt="logo" style={{width: '95px', height: '95px', borderRadius: '50%'}} />
                </Box>
                {/* actions */}
                <Box>
                    <Link href="/" underline="hover" sx={{ mx: 1, color: 'black', cursor: 'pointer', fontSize: '20px' }}>Home</Link>
                    <Link href="/provide-feedback" underline="hover" sx={{ mx: 1, color: 'black', cursor: 'pointer', fontSize: '20px' }}>Feedback</Link>
                    <Link href="/about-us" underline="hover" sx={{ mx: 1, color: 'black', cursor: 'pointer', fontSize: '20px' }}>About Us</Link>
                    <Link href="/contact-us" underline="hover" sx={{ mx: 1, color: 'black', cursor: 'pointer', fontSize: '20px' }}>Contact Us</Link>
                </Box>
                {/* buttons */}
                <Box>
                    {/* <Button sx={{ ":hover": { background: 'none' }, color: 'black' }}>
                        <SearchIcon sx={{ ":hover": { fontSize: '28px', transform: '2s' } }} />
                    </Button> */}
                    <Button sx={{ ":hover": { background: 'none' }, color: 'black' }} onClick={handleOpenLogin}>
                        <PermIdentityIcon sx={{ ":hover": { fontSize: '28px', transform: '2s' } }} />
                    </Button>
                </Box>
            </Container>
            <Divider />

            <Loading loading={loading} />
        </Box>
    );
}

export default Header;
