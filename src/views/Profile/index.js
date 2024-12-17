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
import AddCardIcon from '@mui/icons-material/AddCard';
import { toast } from "react-toastify";

import { useAuth } from "~/config/AuthProvider";
import { formatCurrency, formatDate } from "~/utils/Common/Format";
import {
  PROFILE_API,
  GET_CALLER_TUNES_API,
  CREATE_ACCOUNT_API,
  UPDATE_ACCOUNT_USER_API,
  UPDATE_ACCOUNT_CALLER_TUNE_API
} from "~/apis/ProfileAPI";
import { ErrorCodes } from "~/utils/Common/Message";
import { validatePhoneNumber } from "~/utils/Common/ValidData";

import audioFile1 from '~/components/audio/audio1.mp3'; 
import audioFile2 from '~/components/audio/audio2.mp3'; 
import audioFile3 from '~/components/audio/audio3.mp3'; 
import audioFile4 from '~/components/audio/audio4.mp3';

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isProfile, setIsProfile] = useState(false);
  const [profile, setProfile] = useState({});
  const [accountBalance, setAccountBalance] = useState('');
  const [callerTunes, setCallerTunes] = useState([]);
  const [audio, setAudio] = useState(null);
  const [playingTuneId, setPlayingTuneId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTuneId, setSelectedTuneId] = useState(null);

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
        setname(res.user.username);
        setEmail(res.user.email);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Fetch caller tunes 
  const fetchCallerTunes = async () => {
    try {
      const res = await GET_CALLER_TUNES_API();
      if (res) {
        const updatedTunes = res.map((tune) => {
          switch (tune.ringtoneId) {
            case 1:
              tune.fileUrl = audioFile1;
              break;
            case 2:
              tune.fileUrl = audioFile2;
              break;
            case 3:
              tune.fileUrl = audioFile3;
              break;
            case 4: tune.fileUrl = audioFile4;
              break;
            default:
              
              break;
          }
          return tune;
        });
        setCallerTunes(updatedTunes);
      }
    } catch (error) {
      console.error("Error fetching caller tunes:", error);
    }
  };



  // Create account
  const handleCreateAccount = async () => {
    try {
      const res = await CREATE_ACCOUNT_API();
      if (res) {
        toast.success("Created account successfully!");
      }
    } catch (error) {
      toast.error(ErrorCodes.SERVER_ERROR.message);
      console.error("Error creating account:", error);
    }
  };

  // Update account user
  const handleUpdateAccountUser = async () => {
    if (name && email && phone) {
      try {
        if (!validatePhoneNumber(phone)) {
          toast.info("Phone must have exactly 9 numbers");
          return;
        }
        const res = await UPDATE_ACCOUNT_USER_API(name, email, phone);
        if (res) {
          toast.success("Profile updated successfully!");
          setIsEditDialogOpen(false);
        } else {
          toast.error(res?.message || "Failed to update profile.");
        }
      } catch (error) {
        toast.error("An error occurred while updating the profile.");
        console.error("Error updating profile:", error);
      }
    } else {
      toast.info("Data is required!");
    }
  };

  // Select and use a caller tune
  const handleUseCallerTune = (tuneId) => {
    setSelectedTuneId(tuneId); // Mark this tune as selected
    toast.success("Caller tune selected successfully!");
  };

  // Play or stop a caller tune
  const handlePlayStopTune = (tuneId, fileUrl) => {
    if (isPlaying && playingTuneId === tuneId) {
      audio.pause();
      setIsPlaying(false);
      setPlayingTuneId(null);
    } else {
      if (audio) audio.pause(); // Stop current audio

      const newAudio = new Audio(fileUrl);

      newAudio.addEventListener("canplaythrough", () => {
        newAudio.play();
        setAudio(newAudio);
        setIsPlaying(true);
        setPlayingTuneId(tuneId);
      });

      newAudio.addEventListener("error", (e) => {
        console.error("Audio play error:", e);
        toast.error("Unable to play this audio.");
      });
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
              Username: <a>{profile.userName}</a>
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
        <Typography sx={{ flex: 1 }}>{`Caller Tune ${index + 1}`}</Typography>
        <Button
          variant="outlined"
          onClick={() => handlePlayStopTune(tune.ringtoneId, tune.fileUrl)}
          color={playingTuneId === tune.ringtoneId ? "error" : "primary"}
        >
          {playingTuneId === tune.ringtoneId ? "Stop" : "Play"}
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleUseCallerTune(tune.ringtoneId)}
          sx={{ ml: 1 }}
          disabled={selectedTuneId === tune.ringtoneId}
        >
          {selectedTuneId === tune.ringtoneId ? "Using" : "Use"}
        </Button>
      </ListItem>
      <Divider />
    </div>
  ))}
</List>

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
                sx={{ my: 1 }}
              />
              <TextField
                name="email"
                label="Email"
                type="text"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ my: 1 }}
              />
              <TextField
                name="phone"
                label="Phone"
                type="text"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ my: 1 }}
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
          Actice Payment Account
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
