import { useState } from 'react';
import './App.css';
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Paper } from '@mui/material';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setGeneratedReply('');
    try {
      const response = await axios.post("https://mailpilot-backend-dtt5.onrender.com/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      {/* App Header */}
      <Box textAlign="center" sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: '#333' }}>
          MailPilot
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#666', mt: 1 }}>
          Effortless AI-powered email replies
        </Typography>
      </Box>

      {/* Input Card */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, mb: 5, backgroundColor: '#ffffff', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#444', fontWeight: 600 }}>
          Original Email
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          placeholder="Paste the email here..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          sx={{
            background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
            color: '#fff',
            py: 1.8,
            fontWeight: 600,
            borderRadius: 2,
            fontSize: '1rem',
            '&:hover': {
              background: 'linear-gradient(90deg, #5b0ecb, #1f64fc)',
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Reply'}
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
      </Paper>

      {/* Output Card */}
      {generatedReply && (
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3, backgroundColor: '#f8f9fa', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#444', fontWeight: 600 }}>
            Generated Reply
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={generatedReply}
            inputProps={{ readOnly: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#ffffff',
              }
            }}
          />
          <Button
            variant="outlined"
            fullWidth
            sx={{
              mt: 3,
              borderColor: '#2575fc',
              color: '#2575fc',
              fontWeight: 600,
              borderRadius: 2,
              '&:hover': { backgroundColor: '#e3f2fd' }
            }}
            onClick={() => navigator.clipboard.writeText(generatedReply)}
          >
            Copy to Clipboard
          </Button>
        </Paper>
      )}
    </Container>
  );
}

export default App;
