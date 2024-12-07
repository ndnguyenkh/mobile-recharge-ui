
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import { Box, Button, Divider, Link, Typography } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import { BarChart } from "@mui/x-charts";
// import { getStatisticalApi } from "../../apis/StatisticalApi";

import { useAuth } from '~/config/AuthProvider';
// import Loading from "~/components/Loading";
// import { GetStatisticalInputApi } from "~/apis/InputExpenseApi";
import { formatCurrency } from "~/utils/Common/Format";


const Profile = () => {

  const { logout } = useAuth();

  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <Box sx={{ mx: 20 }}>
      <Typography variant="h6" sx={{ color: 'gray' }}>
        <Link href="/" sx={{ color: 'gray' }} underline="hover">Home</Link> / Profile & My Account
      </Typography>
      <Box sx={{ my: 10 }}>
        <Box>
          <Typography variant="h5" sx={{ color: 'gray', fontWeight: 'bold' }}>Name: admin</Typography>
          <Typography variant="h5" sx={{ color: 'gray', fontWeight: 'bold' }}>account balance: {formatCurrency(200000)}</Typography>
        </Box>
      </Box>
      <Button
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          ":hover": { backgroundColor: 'rgba(22, 24, 35, 0.09)' },
          borderRadius: '10px'
        }}
        onClick={handleLogout}
      >
        <ExitToAppIcon sx={{ color: 'black' }} />
        <Typography sx={{ ml: 2, color: 'grey' }}>logout</Typography>
      </Button>
      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="h4">...</Typography>
      </Box>

      {/* <Loading loading={loading} />   */}
    </Box>
  );
}

export default Profile;