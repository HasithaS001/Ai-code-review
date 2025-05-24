import React from 'react';
import CodeInput from '../components/CodeInput';
import FileUploader from '../components/FileUploader';
import ReviewResult from '../components/ReviewResult';

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
    }
  };

  // Placeholder data for ReviewResult for layout purposes
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
            <FileUploader />
          </div>
        </div>
        <div style={styles.inputColumn}>
          <div style={styles.componentWrapper}>
            <p style={styles.label}>Or paste your code here:</p>
            <CodeInput />
          </div>
        </div>
      </div>

      <div style={styles.componentWrapper}>
        <p style={styles.label}>Review Results:</p>
        <ReviewResult reviewData={placeholderReviewData} />
      </div>
    </div>
  );
};

export default HomePage;
