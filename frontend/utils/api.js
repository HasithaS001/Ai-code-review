// frontend/utils/api.js

/**
 * Fetches a code review from the backend API.
 * @param {string} code - The code string to be reviewed.
 * @returns {Promise<object>} A promise that resolves to the review data object from the API.
 * @throws {Error} Throws an error if the API request fails or returns a non-ok status.
 */
export const fetchCodeReview = async (code) => {
  // Assuming the backend server is running on port 5001 and accessible via /api/review
  // For local development, this relative path works if frontend and backend are on the same origin
  // or if a proxy is set up.
  // For deployment, this might need to be an absolute URL or configured via environment variables.
  const apiUrl = '/api/review';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: code }),
    });

    if (!response.ok) {
      let errorData;
      try {
        // Attempt to parse error response from the server, which might contain a message
        errorData = await response.json();
      } catch (parseError) {
        // If parsing error response fails, use a generic error message
        console.error("fetchCodeReview: Failed to parse error response from API", parseError);
        errorData = { message: `Server responded with ${response.status} ${response.statusText}, but error details could not be parsed.` };
      }
      // Throw an error that includes the message from the server if available, or a generic one
      throw new Error(errorData.message || `API request failed with status ${response.status}: ${response.statusText}`);
    }

    // If response is ok, parse and return the JSON data
    const data = await response.json();
    return data;

  } catch (error) {
    // Log the error for debugging purposes on the client side
    console.error("fetchCodeReview: Error during API call or response processing", error);
    // Re-throw the error so it can be caught by the calling function (e.g., in HomePage)
    // This allows the calling component to handle UI updates like error messages.
    throw error;
  }
};

// You can add other API utility functions here, e.g.:
// export const fetchSomeOtherData = async () => { ... };
