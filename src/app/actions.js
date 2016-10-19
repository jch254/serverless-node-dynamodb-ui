export const API_SERVICE_FAILURE = 'API_SERVICE_FAILURE';
export const apiServiceFailure = error => (
  {
    type: API_SERVICE_FAILURE,
    error,
  }
);
