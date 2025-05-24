import React, { useState } from 'react';
import CodeInput from '../components/CodeInput';
import FileUploader from '../components/FileUploader';
import ReviewResult from '../components/ReviewResult';
import { fetchCodeReview } from '../utils/api.js';

const HomePage = () => {
  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '900px',
      margin: '0 auto',
    },
    title: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '30px',
    },
    inputSection: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '30px',
      gap: '20px', // Adds space between CodeInput and FileUploader if horizontal
    },
    inputColumn: {
      flex: 1, // Each column takes equal space
      display: 'flex',
      flexDirection: 'column',
      gap: '20px', // Space between items if stacked in a column (e.g. a label and then the component)
    },
    componentWrapper: {
      padding: '15px',
      border: '1px solid #eee',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    label: {
      marginBottom: '8px',
      fontSize: '0.9em',
      color: '#555',
      fontWeight: 'bold',
    },
    button: {
      display: 'block',
      width: '100%',
      padding: '12px',
      backgroundColor: '#0070f3',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
      textAlign: 'center',
      marginTop: '20px',
      marginBottom: '20px',
    },
    buttonHover: { // Note: Inline styles don't directly support :hover, this is for structure
      backgroundColor: '#005bb5',
    },
    errorMessage: {
      color: 'red',
      marginTop: '10px',
      textAlign: 'center',
    }
  };

  const [codeToAnalyze, setCodeToAnalyze] = useState('');
  const [reviewResultData, setReviewResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCodeInputChange = (newCode) => {
    setCodeToAnalyze(newCode);
  };

  const handleFileContent = (fileText) => {
    // fileText can be null if the FileUploader encounters an error or selection is cancelled
    if (fileText !== null && fileText !== undefined) {
      setCodeToAnalyze(fileText);
      // If a file is successfully loaded, clear any previous error messages
      // related to "no code" or other issues.
      setErrorMessage('');
    } else {
      // If fileText is null (e.g., error in reading or cancellation),
      // you might want to decide if codeToAnalyze should be cleared or not.
      // For now, we'll only set it if fileText is valid content.
      // If an actual error occurred during file reading, FileUploader might pass (null, error).
      // This handler is simplified to just accept fileText for now.
      // The FileUploader itself logs read errors.
      // If we receive null, it usually means no file content was obtained.
      // We could potentially set an error message here if fileText is null and an error object isn't also passed.
      // However, the prompt only asks to setCodeToAnalyze.
      // Let's stick to setting codeToAnalyze, and clearing error if text is provided.
      // If fileText is null, we don't update codeToAnalyze to an invalid state.
      // If it was an error, an error message might already be set by handleAnalysis or other means.
      // If it was a cancellation, current codeToAnalyze (if any) remains.
    }
  };

  const handleAnalysis = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setReviewResultData(null); // Clear previous results

    if (!codeToAnalyze || codeToAnalyze.trim() === '') {
      setErrorMessage('Please enter some code or upload a file to analyze.');
      setIsLoading(false);
      return;
    }

    try {
      const data = await fetchCodeReview(codeToAnalyze);
      setReviewResultData(data);

    } catch (error) {
      console.error("Analysis error:", error);
      setErrorMessage(error.message || 'Failed to get review. Please check the console and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder data for ReviewResult for layout purposes
  // This can be removed if ReviewResult handles null gracefully with its own defaults
  const placeholderReviewData = {
    issues: [
      { id: 1, description: "Example: Consider edge cases for input validation.", severity: "Medium" },
    ],
    suggestions: [
      { id: 1, description: "Example: Add more comments to complex functions." },
    ],
    score: "N/A",
    recommendations: "Submit code or upload a file to get a review.",
    summary: "Awaiting code submission for review."
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Code Reviewer</h1>

      <div style={styles.inputSection}>
        <div style={styles.inputColumn}>
          <div style={styles.componentWrapper}>
            <p style={styles.label}>Upload a code file:</p>
            <FileUploader onFileSelect={handleFileContent} />
          </div>
        </div>
        <div style={styles.inputColumn}>
          <div style={styles.componentWrapper}>
            <p style={styles.label}>Or paste your code here:</p>
            <CodeInput onCodeChange={handleCodeInputChange} initialCode={codeToAnalyze} />
          </div>
        </div>
      </div>

      <div>
        <button style={styles.button} onClick={handleAnalysis} disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze Code'}
        </button>
      </div>

      {/* isLoading message is now part of the button text, but this can be kept for more detailed loading UI */}
      {/* {isLoading && <p style={{ textAlign: 'center', margin: '20px' }}>Loading analysis...</p>} */}
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

      <div style={styles.componentWrapper}>
        <p style={styles.label}>Review Results:</p>
        <ReviewResult reviewData={reviewResultData || placeholderReviewData} />
      </div>
    </div>
  );
};

export default HomePage;
