
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Drawer, Tooltip, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddCardIcon from '@mui/icons-material/AddCard';
import CategoryIcon from '@mui/icons-material/Category';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';

import { useAuth } from '~/config/AuthProvider';

const Sidebar = ({ open, toggleDrawer }) => {

    const { logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        toggleDrawer();
        logout();
        navigate("/");
    }

    return ( 
        <Box>
            <Drawer anchor="left" open={open} onClose={toggleDrawer}>
                <Box sx={{width: '400px', height: '100vh'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'right', mt: 6, mr: 5}}>
                        <Button 
                            onClick={toggleDrawer} 
                            sx={{":hover": {color: 'gray', backgroundColor: 'white'}, borderRadius: '50%', height: '64px'}}
                        >
                            <Tooltip title="Close Menu" placement="top">
                                <CloseIcon sx={{fontSize: '30px', color: 'gray'}} />
                            </Tooltip>
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ width: '100%', mx: 2 }}>
                            <Button 
                                sx={{ 
                                    width: '100%', 
                                    display: 'flex', 
                                    justifyContent: 'flex-start', // Căn trái
                                    alignItems: 'center', 
                                    ":hover": { backgroundColor: 'rgba(22, 24, 35, 0.09)' }, 
                                    borderRadius: '10px' 
                                }}
                                onClick={() => {
                                    navigate('/admin-recharge-phone');
                                    toggleDrawer();
                                }}
                            >
                                <WaterfallChartIcon sx={{ color: 'black' }} />
                                <Typography sx={{ ml: 2, color: 'grey' }}>Recharge Phone</Typography>
                            </Button>
                            <Button 
                                sx={{ 
                                    width: '100%', 
                                    display: 'flex', 
                                    justifyContent: 'flex-start', // Căn trái
                                    alignItems: 'center', 
                                    ":hover": { backgroundColor: 'rgba(22, 24, 35, 0.09)' }, 
                                    borderRadius: '10px' 
                                }}
                                onClick={() => {
                                    navigate('/admin-pay-the-bills');
                                    toggleDrawer();
                                }}
                            >
                                <CurrencyExchangeIcon sx={{ color: 'black' }} />
                                <Typography sx={{ ml: 2, color: 'grey' }}>Pay the bills</Typography>
                            </Button>
                            {/* <Button 
                                sx={{ 
                                    width: '100%', 
                                    display: 'flex', 
                                    justifyContent: 'flex-start', // Căn trái
                                    alignItems: 'center', 
                                    ":hover": { backgroundColor: 'rgba(22, 24, 35, 0.09)' }, 
                                    borderRadius: '10px' 
                                }}
                                onClick={() => {
                                    navigate('/expense');
                                    toggleDrawer();
                                }}
                            >
                                <AddCardIcon sx={{ color: 'black' }} />
                                <Typography sx={{ ml: 2, color: 'grey' }}>Quản lý chi.</Typography>
                            </Button> */}
                            <Button 
                                sx={{ 
                                    width: '100%', 
                                    display: 'flex', 
                                    justifyContent: 'flex-start', // Căn trái
                                    alignItems: 'center', 
                                    ":hover": { backgroundColor: 'rgba(22, 24, 35, 0.09)' }, 
                                    borderRadius: '10px' 
                                }}
                                onClick={() => {
                                      navigate('/admin-user-registered');
                                      toggleDrawer();
                                }}
                            >
                                <CategoryIcon sx={{ color: 'black' }} />
                                <Typography sx={{ ml: 2, color: 'grey' }}>User Registered</Typography>
                            </Button>
                            {/* <Divider sx={{ my: 2 }} />
                            <Button 
                                sx={{ 
                                    width: '100%', 
                                    display: 'flex', 
                                    justifyContent: 'flex-start', // Căn trái
                                    alignItems: 'center', 
                                    ":hover": { backgroundColor: 'rgba(22, 24, 35, 0.09)' }, 
                                    borderRadius: '10px' 
                                }}
                            >
                                <SettingsSuggestIcon sx={{ color: 'black' }} />
                                <Typography sx={{ ml: 2, color: 'grey' }}>Cài đặt</Typography>
                            </Button> */}
                            <Divider sx={{ my: 2 }} />
                            <Button 
                                sx={{ 
                                    width: '100%', 
                                    display: 'flex', 
                                    justifyContent: 'flex-start', // Căn trái
                                    alignItems: 'center', 
                                    ":hover": { backgroundColor: 'rgba(22, 24, 35, 0.09)' }, 
                                    borderRadius: '10px' 
                                }}
                                onClick={handleLogout}
                            >
                                <ExitToAppIcon sx={{ color: 'black' }} />
                                <Typography sx={{ ml: 2, color: 'grey' }}>logout</Typography>
                            </Button>
                        </Box>
                    </Box>

                </Box>
            </Drawer>
        </Box>
     );
}
 
export default Sidebar;