// backend/utils/parser.js
// This file is intended to store utility functions for parsing tasks,
// such as parsing code, text, or complex API responses into more usable formats.

/**
 * Counts the number of non-empty lines in a given string (typically code).
 * @param {string} codeString - The string containing the code or text.
 * @returns {number} The number of non-empty lines. Returns 0 if input is not a string or is empty.
 */
export const countLinesOfCode = (codeString) => {
  if (typeof codeString !== 'string' || codeString.trim() === '') {
    return 0;
  }
  // Split by newline characters, then filter out empty lines (after trimming whitespace)
  const lines = codeString.split(/\r\n|\r|\n/);
  const nonEmptyLines = lines.filter(line => line.trim() !== '');
  return nonEmptyLines.length;
};

/**
 * A simple utility to safely parse a JSON string.
 * Returns null if parsing fails, instead of throwing an error.
 * @param {string} jsonString - The JSON string to parse.
 * @returns {object|null} The parsed object, or null if parsing fails.
 */
export const safeJsonParse = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse JSON string:", error);
    return null;
  }
};

// Add other parsing-related utility functions here as needed.
