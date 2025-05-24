// frontend/utils/helpers.js
// This file is intended to store miscellaneous helper functions used across the frontend application.
// These can include functions for data formatting, string manipulation, validation, etc.

/**
 * Formats a date object or date string into "YYYY-MM-DD" format.
 * @param {Date|string} dateInput - The date to format.
 * @returns {string} The formatted date string, or an error message if the input is invalid.
 */
export const formatDate = (dateInput) => {
  try {
    const date = new Date(dateInput);
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date input');
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date"; // Or handle error as preferred
  }
};

// Example of another potential helper (can be expanded later)
/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to capitalize.
 * @returns {string} The string with the first letter capitalized, or an empty string if input is invalid.
 */
export const capitalizeFirstLetter = (str) => {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};
