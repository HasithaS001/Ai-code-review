import React, { useState } from 'react';

const FileUploader = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        if (onFileSelect) {
          onFileSelect(content);
        }
      };
      reader.onerror = (e) => {
        console.error("FileUploader: File reading error:", e);
        if (onFileSelect) {
          // Pass an error object or a specific error indicator if desired
          onFileSelect(null, new Error("File reading failed"));
        }
      };
      reader.readAsText(file);
    } else {
      setSelectedFile(null);
      if (onFileSelect) {
        onFileSelect(null); // No file selected or selection cancelled
      }
    }
  };

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      border: '1px dashed #ccc',
      borderRadius: '4px',
    },
    input: {
      marginRight: '10px',
    },
    fileName: {
      fontFamily: 'sans-serif',
      fontSize: '14px',
    }
  };

  return (
    <div style={styles.container}>
      <input
        type="file"
        onChange={handleFileChange}
        style={styles.input}
      />
      {selectedFile && (
        <span style={styles.fileName}>Selected file: {selectedFile}</span>
      )}
      {!selectedFile && (
        <span style={styles.fileName}>No file selected</span>
      )}
    </div>
  );
};

export default FileUploader;
