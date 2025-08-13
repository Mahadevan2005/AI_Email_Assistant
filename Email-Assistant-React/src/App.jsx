import { useState } from 'react';
import './App.css';
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopySuccess(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* App Header */}
      <Box textAlign="center" sx={{ mb: 8 }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 700, color: '#222' }}>
          MailPilot
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#555', mt: 1 }}>
          Effortless AI-powered email replies
        </Typography>
      </Box>

      {/* Input Card */}
      <Paper elevation={6} sx={{ p: 5, borderRadius: 4, mb: 6, backgroundColor: '#fff', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}>
        <Typography variant="h6" sx={{ mb: 3, color: '#333', fontWeight: 600 }}>
          Original Email
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={8}
          variant="outlined"
          placeholder="Paste the email here..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 4, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
        />

        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
            sx={{ borderRadius: 3 }}
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
            fontWeight: 700,
            borderRadius: 3,
            fontSize: '1.1rem',
            transition: '0.3s',
            '&:hover': { background: 'linear-gradient(90deg, #5b0ecb, #1f64fc)' }
          }}
        >
          {loading ? <CircularProgress size={26} color="inherit" /> : 'Generate Reply'}
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 3, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
      </Paper>

      {/* Output Card */}
      {generatedReply && (
        <Paper elevation={6} sx={{ p: 5, borderRadius: 4, backgroundColor: '#f8f9fa', boxShadow: '0 15px 35px rgba(0,0,0,0.08)' }}>
          <Typography variant="h6" sx={{ mb: 3, color: '#333', fontWeight: 600 }}>
            Generated Reply
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={8}
            variant="outlined"
            value={generatedReply}
            inputProps={{ readOnly: true }}
            sx={{ mb: 4, '& .MuiOutlinedInput-root': { borderRadius: 3, backgroundColor: '#fff' } }}
          />
          <Button
            variant="outlined"
            fullWidth
            sx={{
              py: 1.5,
              borderColor: '#2575fc',
              color: '#2575fc',
              fontWeight: 700,
              borderRadius: 3,
              transition: '0.3s',
              '&:hover': { backgroundColor: '#e3f2fd' }
            }}
            onClick={handleCopy}
          >
            Copy to Clipboard
          </Button>
        </Paper>
      )}

      {/* Copy Success Snackbar */}
      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
