import React, { useState } from 'react';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
    } else {
      setSelectedFile(null);
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
