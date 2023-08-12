const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Replace with your target server's URL
const target = 'http://64.247.206.233:46385';

// Set up proxy middleware
app.use(
  '/',
  createProxyMiddleware({
    target,
    changeOrigin: true,
    secure: false, // Disable SSL certificate verification
  })
);


app.use(express.json());

// Define a route for handling POST requests
app.post('/predict', (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  try {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  };

  // Send a POST request to an external API using axios
  axios.post('https://64.247.206.233:46385/predict', requestOptions)
  .then((apiResponse) => {
    console.log('API Response:', apiResponse.data);
  res.json({
    message: 'POST request and API call completed successfully',
    response: apiResponse.response,
  });
  })
  
  
} catch (error) {
  console.error('Error:', error.message);
  res.status(500).json({ error: 'An error occurred' });
}
});


// Start the proxy server
const PORT = 3001; // Change to your preferred port
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
