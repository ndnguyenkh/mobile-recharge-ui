
import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { Box, Button, Tooltip, Typography } from "@mui/material";
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Loading from '~/components/Loading';
import Image from "~/components/Image";
import DataImages from "~/utils/DataImages";
import Sidebar from "~/components/Sidebar";
import Footer from "~/components/Footer";
import ToTop from "~/components/ToTop";

const user_name = "System administration";
const image_admin = "https://cdn-icons-png.flaticon.com/512/5322/5322056.png";


const ManageLayout = ({ children }) => {

    // const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    // const [loading, setLoading] = useState(false);

    const [profile, setProfile] = useState([]);
    
    // const [balance, setBalance] = useState(0);

    const toggleDrawerMenu = () => {
      setOpenMenu(prevOpen => !prevOpen);
    };
    

    return (
        <Box>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', backgroundColor: 'rgba(22, 24, 35, 0.09)' }}>
                <Box sx={{ flexGrow: 1, width: '70%' }}>
                    {/* content here */}
                    {/* <Typography variant="h6" sx={{fontWeight: 'bold'}}>Options</Typography> */}
                    <Box sx={{ display: 'flex', mx: 10 }}>
                        <Button
                            sx={{ ":hover": { color: 'gray', backgroundColor: 'white' }, borderRadius: '50%', height: '64px' }}
                            onClick={toggleDrawerMenu}
                        >
                            <Tooltip title="Open Menu" placement="top">
                                <WidgetsOutlinedIcon sx={{ width: '100%', height: '100%', padding: 1, color: 'gray', ":hover": { color: 'black' } }} />
                            </Tooltip>
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            height: '2px',
                            backgroundColor: 'gray',
                            position: 'relative',
                            top: '50%', // Để căn giữa với "Information"
                            zIndex: 1,
                        }}
                    />
                </Box>
                <Box sx={{ ml: 2, mr: 8, width: '10%' }}>
                    <Image
                        src={image_admin || DataImages.noImage}
                        alt="Avatar"
                        style={{ width: '200px', height: '200px', borderRadius: '50%', border: '1px solid gray' }}
                    />
                </Box>
                <Box sx={{ flexGrow: 1, width: '20%' }}>
                    <Box
                        sx={{
                            height: '2px',
                            backgroundColor: 'gray',
                            position: 'relative',
                            top: '50%', // Để căn giữa với "Menu"
                            zIndex: 1,
                        }}
                    />
                    {/* content here */}
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>{profile.name || user_name}</Typography>
                </Box>
            </Box>

            <div>{children}</div>
            <Footer />

            {/* import sidebar */}
            <Sidebar open={openMenu} toggleDrawer={toggleDrawerMenu} />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            {/* <Loading loading={loading} /> */}
            <ToTop />
        </Box>
    );
}

export default ManageLayout;