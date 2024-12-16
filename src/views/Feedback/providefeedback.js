import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { FETCH_FEEDBACK_REPLIES_API, SUBMIT_FEEDBACK_LOGINED_API } from '~/apis/feedbackAPI';

function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const loadFeedbackWithReplies = async () => {
      try {
        const response = await FETCH_FEEDBACK_REPLIES_API();
        console.log('API Response:', response);

        if (Array.isArray(response)) {
          if (response.length > 0) {
            setFeedbackData(response);
          } else {
            toast.info('No feedback available.');
          }
        } else {
          toast.error('Unexpected response structure from the server.');
        }
      } catch (error) {
        console.error('Error loading feedback with replies:', error.message || error.response);
        toast.error('Failed to load feedback data. Please try again.');
      }
    };

    loadFeedbackWithReplies();
  }, []);

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();
    if (!feedback.trim()) {
      toast.info("Feedback can't be empty!");
      return;
    }
  
    try {
      const res = await SUBMIT_FEEDBACK_LOGINED_API(feedback);
      console.log('API Response:', res); // Log the response to inspect its structure
  
      if (res?.feedbackId) {  // Assuming the API returns the feedbackId directly in the response object
        toast.success('Feedback sent successfully!');
        setFeedback('');
        setFeedbackData((prev) => [...prev, res]); // Add the response directly
      } else {
        toast.error('Failed to submit feedback.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error.message || error.response);
      toast.error('Failed to submit feedback. Please try again.');
    }
  };
  
  // Helper function to format date
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', mx: 45 }}>
        <Box sx={{ my: 5, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontStyle: 'italic', color: 'gray' }}>
            Share Your Feedback
          </Typography>
          <Box sx={{ mt: 10, mb: 5 }}>
            <TextField
              variant="outlined"
              sx={{ width: '100%' }}
              label="Your Feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </Box>
          <Button variant="contained" onClick={handleFeedbackSubmit}>
            Send Feedback
          </Button>
        </Box>

        <Box sx={{ my: 10 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontStyle: 'italic', color: 'gray', textAlign: 'center', marginBottom: '20px' }}>
            Feedback List
          </Typography>
          <Stack>
            {feedbackData.map((item, index) => (
              <Box key={index} sx={{ border: '1px solid #ddd', padding: '16px', marginBottom: '16px' }}>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'gray' }}>
                  #User Commented:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {item.feedbackText}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'gray', marginTop: '4px' }}>
                  {formatDate(item.feedbackDate)} {/* Format the feedback date */}
                </Typography>

                {item.reFeedbacks && item.reFeedbacks.length > 0 && (
                  <Box sx={{ marginTop: '16px', paddingLeft: '16px' }}>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'gray' }}>
                      #Admin Replied:
                    </Typography>
                    {item.reFeedbacks.map((reply, idx) => (
                      <Box key={idx} sx={{ marginTop: '8px', padding: '8px', borderLeft: '2px solid #ccc' }}>
                        <Typography variant="body2">{reply.refeedbackText}</Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'gray' }}>
                          {formatDate(reply.reFeedbackDate)} {/* Format the reply date */}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default FeedbackPage;
