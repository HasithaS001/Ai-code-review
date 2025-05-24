import React from 'react';

const CodeInput = () => {
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
      placeholder="Enter your code here..."
    />
  );
};

export default CodeInput;
