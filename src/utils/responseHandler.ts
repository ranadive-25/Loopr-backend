// src/utils/responseHandler.ts

export const sendSuccess = (
  res: any,
  data: any,
  message = 'Success',
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res: any,
  error = 'Something went wrong',
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message: error,
  });
};
