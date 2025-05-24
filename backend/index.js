import express from 'express';
import cors from 'cors'; // For Cross-Origin Resource Sharing
import reviewRouter from './routes/review.js';

// Create an Express application instance
const app = express();

// Define the port for the server
// Use the PORT environment variable if available, otherwise default to 5001
const PORT = process.env.PORT || 5001;

// --- Middleware Configuration ---

// 1. Enable CORS for all routes and origins
// This allows the frontend (potentially on a different port) to communicate with the backend.
app.use(cors());

// 2. Enable parsing of JSON request bodies
// This middleware parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// --- Route Mounting ---

// Mount the reviewRouter for all routes starting with /api/review
// For example, a POST request to /api/review/ will be handled by reviewRouter.
app.use('/api/review', reviewRouter);

// --- Basic Root Route for Server Check ---
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the AI Code Reviewer API! Server is running.' });
});

// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  console.log('CORS is enabled for all origins.');
  console.log(`Review routes are mounted at /api/review`);
});

// Basic error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
