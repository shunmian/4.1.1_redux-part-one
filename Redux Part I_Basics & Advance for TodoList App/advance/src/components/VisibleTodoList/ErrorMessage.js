import React from 'react'

const ErrorMessage = ({errorMessage, onRetry}) => (
  <div>
    <p>{errorMessage}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
);

export default ErrorMessage;

