
const fs = require('fs');
const path = require('path');

class ErrorLogger {
  constructor(logFilePath = 'errors.log') {
    this.logFilePath = logFilePath;
  }

  logError(error) {
    const logMessage = `${new Date().toISOString()} - ${error.message}\n${error.stack}\n\n`;
    fs.appendFile(this.logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Error logging error:', err);
      }
    });
  }
}

module.exports = ErrorLogger;
