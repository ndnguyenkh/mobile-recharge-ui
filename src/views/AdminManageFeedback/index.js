import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Box,
    Button,
    TextField,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
//Fixed Format already
import { FETCH_ALL_FEEDBACK_API, FETCH_ALL_REFEEDBACK_API, SEND_REPLY_API } from '~/apis/adminFeedbackApi';

const AdminManageFeedback = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [reFeedbackData, setReFeedbackData] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Fetch feedback data and refeedback data when the component mounts
    useEffect(() => {
        const loadFeedbackData = async () => {
            try {
                const feedback = await FETCH_ALL_FEEDBACK_API();
                const reFeedback = await FETCH_ALL_REFEEDBACK_API();

                if (Array.isArray(feedback) && Array.isArray(reFeedback)) {
                    // Map the feedback data and check if refeedback exists for each feedback
                    const updatedData = feedback.map((item) => ({
                        ...item,
                        status: reFeedback.some((re) => re.feedbackId === item.feedbackId)
                            ? 'Replied'
                            : item.status, // Use Replied if there is corresponding refeedback
                    }));
                    setFeedbackData(updatedData);
                    setReFeedbackData(reFeedback);
                } else {
                    console.error('Invalid feedback or refeedback data', feedback, reFeedback);
                    setFeedbackData([]);
                    setReFeedbackData([]);
                }
            } catch (error) {
                console.error('Error fetching feedback or refeedback:', error.response || error.message);
                setFeedbackData([]);
                setReFeedbackData([]);
                alert('Failed to load feedback. Please try again later.');
            }
        };
        console.log('Refeedback Data:', reFeedbackData);
        loadFeedbackData();
    }, [reFeedbackData]);

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString();
      };

    const handleReplyClick = (feedback) => {
        if (feedback.status === 'Replied') {
            // Ask the user if they want to continue replying to a feedback that's already replied
            toast.info(
                'This feedback has already been replied. Do you want to continue replying? Please close this message to choose option !',
                {
                    autoClose: false,
                    closeOnClick: false,
                    draggable: false,
                    position: "top-center",
                    onClose: () => {
                        const userConfirm = window.confirm(
                            'This feedback has already been replied. Do you want to continue replying?'
                        );
                        if (userConfirm) {
                            setSelectedFeedback(feedback);
                            setIsDialogOpen(true);
                        }
                    },
                }
            );
        } else {
            setSelectedFeedback(feedback);
            setIsDialogOpen(true);
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setReplyContent('');
    };

    const handleSendReply = async () => {
        if (!replyContent.trim()) {
            alert('Reply content cannot be empty.');
            return;
        }
        try {
            const res = await SEND_REPLY_API(selectedFeedback.feedbackId, replyContent);
            if (res.feedbackId) {
                // Add refeedback to reFeedbackData state
                setReFeedbackData((prevData) => [
                    ...prevData,
                    { feedbackId: selectedFeedback.feedbackId, refeedbackText: replyContent },
                ]);
                // Update feedback status in feedbackData
                setFeedbackData((prevData) =>
                    prevData.map((item) =>
                        item.feedbackId === selectedFeedback.feedbackId
                            ? { ...item, status: 'Replied' }
                            : item
                    )
                );
                handleCloseDialog();
                toast.success('Reply sent successfully!');
            }
        } catch (error) {
            console.error('Error sending reply:', error.response || error.message);
            alert('Failed to send reply. Please try again later.');
        }
    };

    return (
        <Box sx={{ mx: 20 }}>
            <Typography variant="h5" sx={{ color: 'gray' }}>
                Manage Feedback
            </Typography>
            <Box sx={{ my: 5 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'gray' }}>
                    View Feedback
                </Typography>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {feedbackData.length > 0 ? (
                        feedbackData.map((feedback) => (
                            <Box
                                key={feedback.feedbackId}
                                sx={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    marginBottom: '16px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    backgroundColor: feedback.status === 'Replied' ? '#e6ffe6' : '#f9f9f9', // Green for replied
                                    '&:hover': {
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    },
                                }}
                            >
                                <Typography variant="body1" sx={{ marginBottom: '8px', fontWeight: 'bold' }}>
                                    <strong>Content:</strong> {feedback.feedbackText}
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: '4px' }}>
                                    <strong>Date:</strong> {formatDate(feedback.feedbackDate)}
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: '4px', color: feedback.status === 'Replied' ? 'green' : 'orange' }}>
                                    <strong>Status:</strong> {feedback.status}
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={() => handleReplyClick(feedback)}
                                    sx={{
                                        backgroundColor: 'primary.main', // Always blue
                                        '&:hover': {
                                            backgroundColor: 'primary.dark', // Blue hover
                                        },
                                    }}
                                >
                                    Reply
                                </Button>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ color: 'gray' }}>
                            No feedback available
                        </Typography>
                    )}
                </ul>

                {/* Reply Dialog */}
                <Dialog 
                    open={isDialogOpen} 
                    onClose={handleCloseDialog}
                    maxWidth="md" // Set a larger maximum width for the dialog
                    fullWidth // Make the dialog take the full width
                >
                    <DialogTitle>Reply Feedback</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Replying to: <strong>{selectedFeedback?.feedbackText}</strong>
                        </Typography>
                        <TextField
                            multiline
                            rows={6} // Increased the height of the text field
                            fullWidth
                            label="Reply Content"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            sx={{ minHeight: '150px' }} // Ensure the text area is large enough
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleSendReply}>Send Reply</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default AdminManageFeedback;
