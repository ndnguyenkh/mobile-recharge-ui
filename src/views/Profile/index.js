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
import { useAuth } from "~/config/AuthProvider";
import { formatCurrency, formatDate } from "~/utils/Common/Format";
import {
  PROFILE_API,
  GET_CALLER_TUNES_API,
  UPDATE_PROFILE_API,
  UPDATE_CALLER_TUNE_API,
} from "~/apis/ProfileAPI";
import { toast } from "react-toastify";

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  const [accountBalance, setAccountBalance] = useState('');
  const [callerTunes, setCallerTunes] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "" });

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Fetch user details
  const fetchProfile = async () => {
    try {
      const res = await PROFILE_API();
      if (res) {
        setProfile(res.user || {});
        setAccountBalance(res.account.accountBalance);
        setEditForm({
          name: res.user.userName || "",
          email: res.user.email || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // const fetchUserName = async () => {
  //   try {
  //     const res = await GET_NAME_API();
  //     if (res) {
  //       setUsername(res);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching username:", error);
  //   }
  // };

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

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated profile
  const handleFormSubmit = async () => {
    try {
      const res = await UPDATE_PROFILE_API(editForm);
      if (res?.success) {
        toast.success("Profile updated successfully!");
        setIsEditDialogOpen(false);
        fetchProfile();
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile.");
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
      newAudio.addEventListener("ended", () => setIsPlaying(false)); // Stop when the audio ends
      setAudio(newAudio);
      setIsPlaying(true);
    }
  };

  // Choose caller tune
  const handleChooseCallerTune = async (tuneId) => {
    try {
      const res = await UPDATE_CALLER_TUNE_API(tuneId);
      if (res?.success) {
        toast.success("Caller tune selected successfully!");
        fetchCallerTunes();
      } else {
        toast.error("Failed to select caller tune.");
      }
    } catch (error) {
      console.error("Error selecting caller tune:", error);
      toast.error("An error occurred while selecting the caller tune.");
    }
  };

  useEffect(() => {
    fetchProfile();
    // fetchUserName();
    fetchCallerTunes();
  }, []);

  return (
    <Box sx={{ mx: 20 }}>
      <Typography variant="h6" sx={{ color: "gray" }}>
        <a href="/" style={{ color: "gray", textDecoration: "none" }}>Home</a> / Profile & My Account
      </Typography>
      <Box sx={{ my: 10 }}>
        <Typography variant="h5" sx={{ color: "gray", fontWeight: "bold" }}>
          Name: <a>{profile.userName}</a>
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
              <Button
                variant="contained"
                color="success"
                onClick={() => handleChooseCallerTune(tune.id)}
                sx={{ ml: 1 }}
              >
                Choose
              </Button>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>

      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        startIcon={<ExitToAppIcon />}
      >
        Logout
      </Button>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Edit Personal Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={editForm.name}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            value={editForm.username}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone Number"
            type="text"
            fullWidth
            value={editForm.phone}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
