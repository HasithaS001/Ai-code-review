import React from 'react';

const ReviewResult = ({ reviewData }) => {
  // Placeholder data if no actual data is passed
  const defaultData = {
    issues: [
      { id: 1, description: "Placeholder issue 1: Critical security vulnerability.", severity: "Critical" },
      { id: 2, description: "Placeholder issue 2: Inefficient loop.", severity: "Medium" },
    ],
    suggestions: [
      { id: 1, description: "Placeholder suggestion 1: Consider using a more secure library for X." },
      { id: 2, description: "Placeholder suggestion 2: Refactor the loop for better performance." },
    ],
    score: "85/100",
    recommendations: "Placeholder recommendations: Address critical issues first. Review performance suggestions.",
    summary: "Placeholder summary: The code has some critical issues and areas for performance improvement. Overall score is decent but requires attention to the highlighted points."
  };

  const data = reviewData || defaultData;

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
    },
    header: {
      color: '#333',
      borderBottom: '2px solid #eee',
      paddingBottom: '10px',
      marginBottom: '20px',
    },
    section: {
      marginBottom: '20px',
    },
    sectionTitle: {
      color: '#555',
      fontSize: '1.2em',
      marginBottom: '10px',
    },
    listItem: {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      padding: '10px',
      marginBottom: '5px',
      borderRadius: '4px',
    },
    criticalIssue: {
      borderLeft: '5px solid red',
      paddingLeft: '15px',
    },
    mediumIssue: {
      borderLeft: '5px solid orange',
      paddingLeft: '15px',
    },
    score: {
      fontSize: '1.5em',
      fontWeight: 'bold',
      color: '#4CAF50',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Code Review Report</h2>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Overall Score</h3>
        <p style={styles.score}>{data.score}</p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Summary</h3>
        <p>{data.summary}</p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Issues Found</h3>
        {data.issues && data.issues.length > 0 ? (
          <ul>
            {data.issues.map(issue => (
              <li key={issue.id} style={{
                ...styles.listItem,
                ...(issue.severity === 'Critical' ? styles.criticalIssue : {}),
                ...(issue.severity === 'Medium' ? styles.mediumIssue : {}),
              }}>
                <strong>{issue.severity}:</strong> {issue.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No issues found.</p>
        )}
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Suggestions</h3>
        {data.suggestions && data.suggestions.length > 0 ? (
          <ul>
            {data.suggestions.map(suggestion => (
              <li key={suggestion.id} style={styles.listItem}>
                {suggestion.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No suggestions at this time.</p>
        )}
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Recommendations</h3>
        <p>{data.recommendations}</p>
      </div>
    </div>
  );
};

export default ReviewResult;
