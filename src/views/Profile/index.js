import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Link,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from '~/config/AuthProvider';
import { formatCurrency } from "~/utils/Common/Format";
import {
  GET_NAME_API,
  PROFILE_API,
  GET_CALLER_TUNES_API,
  GET_ACCOUNT_API
} from "~/apis/ProfileAPI";
import { toast } from 'react-toastify';

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [username, setUsername] = useState({});
  const [callerTunes, setCallerTunes] = useState([]);
  const [availableCallerTunes, setAvailableCallerTunes] = useState([]);
  const [selectedTune, setSelectedTune] = useState('');

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Fetch profile details
  const fetchProfile = async () => {
    try {
      const res = await PROFILE_API();
      if (res) {
        setProfile(res[0]); // Assuming only one profile object is returned
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNameUser = async () => {
    try {
      const res = await GET_NAME_API();
      if (res) {
        setUsername(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCallerTunes = async () => {
    try {
      const res = await GET_CALLER_TUNES_API();
      if (res) {
        setCallerTunes(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAvailableCallerTunes = async () => {
    try {
      const res = await GET_CALLER_TUNES_API();
      if (res) {
        setAvailableCallerTunes(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchNameUser();
    fetchCallerTunes();
    fetchAvailableCallerTunes();
  }, []);

  // Feature: Change Caller Tune
  const changeCallerTune = (tune) => {
    toast.success(`Caller tune has been successfully changed to ${tune.ringtone_name}.`);
    setSelectedTune(tune.url);
  };

  return (
    <Box sx={{ mx: 20 }}>
      <Typography variant="h6" sx={{ color: 'gray' }}>
        <Link href="/" sx={{ color: 'gray' }} underline="hover">
          Home
        </Link>{" "}
        / Profile & My Account
      </Typography>
      <Box sx={{ my: 10 }}>
        <Box>
          <Typography variant="h5" sx={{ color: 'gray', fontWeight: 'bold' }}>
            UserName: {username.usUserName}
          </Typography>
          <Typography variant="h5" sx={{ color: 'gray', fontWeight: 'bold' }}>
            Name: {profile.userName}
          </Typography>
          <Typography variant="h5" sx={{ color: 'gray', fontWeight: 'bold' }}>
            UserId: {profile.userId}
          </Typography>
          <Typography variant="h5" sx={{ color: 'gray', fontWeight: 'bold' }}>
            Email: {username.usEmail}
          </Typography>
          <Typography variant="h5" sx={{ color: 'gray', fontWeight: 'bold' }}>
            Phone: {username.usPhoneNumber}
          </Typography>
          <Typography variant="h5" sx={{ color: 'gray', fontWeight: 'bold' }}>
            Account Balance: {formatCurrency(profile.accountBalance)}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h5" sx={{ color: 'gray', fontWeight: 'bold' }}>
        Current Caller Tunes:
      </Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {callerTunes.map((tune, index) => (
          <div key={index}>
            <ListItem button onClick={() => changeCallerTune(tune)}>
              <ListItemText primary={tune.ringtone_name} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <Typography variant="h5" sx={{ color: 'gray', fontWeight: 'bold' }}>
        Available Caller Tunes:
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="available-caller-tunes-label">Select a Caller Tune</InputLabel>
        <Select
          labelId="available-caller-tunes-label"
          value={selectedTune}
          onChange={(e) => {
            const selected = availableCallerTunes.find(tune => tune.url === e.target.value);
            if (selected) {
              changeCallerTune(selected);
            }
            setSelectedTune(e.target.value);
          }}
          sx={{ maxHeight: 200 }}
        >
          {availableCallerTunes.map((tune, index) => (
            <MenuItem key={index} value={tune.url}>
              {tune.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
