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
import { formatCurrency } from "~/utils/Common/Format";
import {
  PROFILE_API,
  GET_NAME_API,
  GET_CALLER_TUNES_API,
  UPDATE_PROFILE_API,
} from "~/apis/ProfileAPI";
import { toast } from "react-toastify";

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  const [username, setUsername] = useState({});
  const [callerTunes, setCallerTunes] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", username: "", phone: "" });

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
        setProfile(res.data || {});
        setEditForm({
          name: res.data?.userName || "",
          username: res.data?.userId || "",
          phone: res.data?.phone || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchUserName = async () => {
    try {
      const res = await GET_NAME_API();
      if (res) {
        setUsername(res);
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const fetchCallerTunes = async () => {
    try {
      const res = await GET_CALLER_TUNES_API();
      if (res) {
        setCallerTunes(res || []);
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

  useEffect(() => {
    fetchProfile();
    fetchUserName();
    fetchCallerTunes();
  }, []);

  return (
    <Box sx={{ mx: 20 }}>
      <Typography variant="h6" sx={{ color: "gray" }}>
        <a href="/" style={{ color: "gray", textDecoration: "none" }}>Home</a> / Profile & My Account
      </Typography>
      <Box sx={{ my: 10 }}>
        <Typography variant="h5" sx={{ color: "gray", fontWeight: "bold" }}>
          UserName: {username.usUserName}
        </Typography>
        <Typography variant="h5" sx={{ color: "gray", fontWeight: "bold" }}>
          Name: {profile.userName}
        </Typography>
        <Typography variant="h5" sx={{ color: "gray", fontWeight: "bold" }}>
          UserId: {profile.userId}
        </Typography>
        <Typography variant="h5" sx={{ color: "gray", fontWeight: "bold" }}>
          Email: {username.usEmail}
        </Typography>
        <Typography variant="h5" sx={{ color: "gray", fontWeight: "bold" }}>
          Phone: {username.usPhoneNumber}
        </Typography>
        <Typography variant="h5" sx={{ color: "gray", fontWeight: "bold" }}>
          Account Balance: {formatCurrency(profile.accountBalance)}
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
              <Typography sx={{ flex: 1 }}>{tune.ringtone_name}</Typography>
              <Button
                variant="outlined"
                onClick={() => handlePlayStopTune(tune.url)}
                color={isPlaying && audio?.src === tune.url ? "error" : "primary"}
              >
                {isPlaying && audio?.src === tune.url ? "Stop" : "Play"}
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
