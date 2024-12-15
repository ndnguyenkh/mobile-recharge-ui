import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  Divider,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { toast } from "react-toastify";
import AddCardIcon from '@mui/icons-material/AddCard';

import { useAuth } from "~/config/AuthProvider";
import { formatCurrency, formatDate } from "~/utils/Common/Format";
import {
  PROFILE_API,
  GET_CALLER_TUNES_API,
  CREATE_ACCOUNT_API,
  UPDATE_ACCOUNT_USER_API,
} from "~/apis/ProfileAPI";
import { ErrorCodes } from "~/utils/Common/Message";
import { validatePhoneNumber } from "~/utils/Common/ValidData";

/**
 * class profile
 */
const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isProfile, setIsProfile] = useState(false);

  const [profile, setProfile] = useState({});
  const [accountBalance, setAccountBalance] = useState('');
  const [callerTunes, setCallerTunes] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Fetch user details
  const fetchProfile = async () => {
    try {
      const res = await PROFILE_API();
      if (res.account.accountBalance) {
        setProfile(res.user || {});
        setAccountBalance(res.account.accountBalance);
        setIsProfile(true);
        setname(res.user.userName);
        setEmail(res.user.email);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // create account
  const handleCreateAccount = async () => {
    try {
      const res = await CREATE_ACCOUNT_API();
      if (res) {
        console.log(res);
        toast.success("Created account successfully!");
      }
    } catch (error) {
      toast.error(ErrorCodes.SERVER_ERROR.message); 
      console.error("Error fetching profile:", error);
    }
  }

  // Update account user 
  const handleUpdateAccountUser  = async () => {
    if (name && email && phone) {
      try {
        if (!validatePhoneNumber(phone)) {
          toast.info("Phone must have exactly 9 numbers");
          return;
        } else {
          const res = await UPDATE_ACCOUNT_USER_API(name, email, phone);
          if (res) {
            toast.success("Profile updated successfully!");
            setIsEditDialogOpen(false); 
          } else {
            toast.error(res?.message || "Failed to update profile.");
          }
        }
      } catch (error) {
        toast.error("An error occurred while updating the profile.");
        console.error("Error updating profile:", error);
      }
    } else {
      toast.info("Data is required!");
    }
  };

  const fetchCallerTunes = async () => {
    try {
      const res = await GET_CALLER_TUNES_API();
      if (res) {
        setCallerTunes(res);
      }
    } catch (error) {
      console.error("Error fetching caller tunes:", error);
    }
  };

  // Play or stop caller tune
  const handlePlayStopTune = (tuneUrl) => {
    if (isPlaying && audio) {
      audio.pause();
      setAudio(null);
      setIsPlaying(false);
    } else {
      const newAudio = new Audio(tuneUrl);
      newAudio.play();
      newAudio.addEventListener("ended", () => setIsPlaying(false));
      setAudio(newAudio);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchCallerTunes();
  }, []);

  return (
    <Box sx={{ mx: 20 }}>
      <Typography variant="h6" sx={{ color: "gray" }}>
        <a href="/" style={{ color: "gray", textDecoration: "none" }}>Home</a> / Profile & My Account
      </Typography>

      {isProfile ? (
        <>
          <Box sx={{ my: 10 }}>
        <Typography variant="h5" sx={{ color: "gray", fontWeight: "bold" }}>
          Userame: <a>{profile.userName}</a>
        </Typography>
        <Typography variant="h5" sx={{ color: "gray", fontWeight: "bold" }}>
          Email: {profile.email}
        </Typography>
        <Typography variant="h5" sx={{ color: "gray", fontWeight: "bold" }}>
          Date created: {formatDate(profile.createdAt)}
        </Typography>
        <Typography variant="h5" sx={{ color: "gray", fontWeight: "bold" }}>
          Account Balance: {formatCurrency(accountBalance)}
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => setIsEditDialogOpen(true)}
          sx={{ mt: 2 }}
        >
          Edit Personal Details
        </Button>
      </Box>

      <Typography variant="h5" sx={{ color: "gray", fontWeight: "bold" }}>
        Available Caller Tunes:
      </Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {callerTunes.map((tune, index) => (
          <div key={index}>
            <ListItem>
              <Typography sx={{ flex: 1 }}>{tune.ringtoneName}</Typography>
              <Button
                variant="outlined"
                onClick={() => handlePlayStopTune(tune.fileUrl)}
                color={isPlaying && audio?.src === tune.fileUrl ? "error" : "primary"}
              >
                {isPlaying && audio?.src === tune.fileUrl ? "Stop" : "Play"}
              </Button>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
      <DialogTitle>Edit Personal Details</DialogTitle>
      <DialogContent>
        <TextField
          name="username"
          label="Username"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setname(e.target.value)}
          sx={{my: 1}}
        />
        <TextField
          name="name"
          label="Email"
          type="text"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{my: 1}}
        />
        <TextField
          name="phone"
          label="Phone"
          type="text"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{my: 1}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsEditDialogOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdateAccountUser} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>

        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateAccount}
          startIcon={<AddCardIcon />}
        >
          Create new account ?
        </Button>
      )}
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        startIcon={<ExitToAppIcon />}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
