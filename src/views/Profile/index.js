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
  UPLOAD_CALLER_TUNE_API,
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
  if (!editForm.name || !editForm.email) {
    toast.error("Name and Email are required.");
    return;
  }

  // Validation: Check for a valid email format
  if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(editForm.email)) {
    toast.error("Please enter a valid email address.");
    return;
  }

  try {
    // Construct the updated profile object
    const updatedProfile = {
      userName: editForm.name,
      email: editForm.email,
      phone: editForm.phone, 
    };

    // Call the API and await the response
    const res = await UPDATE_PROFILE_API(updatedProfile);

    // Handle the response
    if (res?.success) {
      toast.success("Profile updated successfully!");
      setIsEditDialogOpen(false); // Close the dialog
      fetchProfile(); // Refresh profile details
    } else {
      toast.error(res?.message || "Failed to update profile."); // Show the error message from API
    }
  } catch (error) {
    // Log error and display a generic error message
    console.error("Error updating profile:", error);
    toast.error("An error occurred while updating the profile.");
  }
};

  

  // Play or stop caller tune
  const [playingTuneId, setPlayingTuneId] = useState(null);

  const handlePlayStopTune = (tuneId, tuneUrl) => {
    if (audio) {
      audio.pause();
      setAudio(null);
      setPlayingTuneId(null);
      if (playingTuneId === tuneId) return;
    }
  
    const newAudio = new Audio(tuneUrl);
    newAudio.play();
    newAudio.addEventListener("ended", () => setPlayingTuneId(null));
    setAudio(newAudio);
    setPlayingTuneId(tuneId);
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

// Inside the Profile component:
const [file, setFile] = useState(null); // State to manage the selected file

// Handle file selection
const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  setFile(selectedFile);
};

// Upload the selected caller tune
const handleUploadTune = async () => {
  if (!file) {
    toast.error("Please select a file to upload.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await UPLOAD_CALLER_TUNE_API(formData);
    if (res?.success) {
      toast.success("Caller tune uploaded successfully!");
      setFile(null); // Clear the file input after upload
      fetchCallerTunes(); // Refresh the caller tunes list
    } else {
      toast.error(res?.message || "Failed to upload caller tune.");
    }
  } catch (error) {
    console.error("Error uploading caller tune:", error);
    toast.error("An error occurred while uploading the caller tune.");
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

      <Typography variant="h5" sx={{ color: "gray", fontWeight: "bold", mt: 4 }}>
  Upload Caller Tune:
</Typography>
<Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
  <Button
    variant="contained"
    component="label"
    sx={{ mr: 2 }}
  >
    Select File
    <input
      type="file"
      hidden
      accept="audio/*"
      onChange={handleFileChange}
    />
  </Button>
  <Typography variant="body1">
    {file ? file.name : "No file selected"}
  </Typography>
</Box>
<Button
  variant="contained"
  color="primary"
  onClick={handleUploadTune}
  sx={{ mt: 2 }}
>
  Upload
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
    name="email"
    label="Email"
    type="email"
    fullWidth
    value={editForm.email}
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
