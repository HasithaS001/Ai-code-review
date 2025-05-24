import React from 'react';

const CodeInput = ({ initialCode, onCodeChange }) => {
  const styles = {
    textarea: {
      width: '100%',
      height: '200px',
      fontFamily: 'monospace',
      border: '1px solid #ccc',
      padding: '10px',
      boxSizing: 'border-box',
    }
  };

  return (
    <textarea
      style={styles.textarea}
      value={initialCode}
      onChange={(event) => {
        if (onCodeChange) {
          onCodeChange(event.target.value);
        }
      }}
      aria-label="Code Input Area" // Added for accessibility
    />
  );
};

export default CodeInput;
