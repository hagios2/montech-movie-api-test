export const errorResponse = (res, error, code = 500) => {
  return res.status(code).json({
    error: error,
    data: null,
  });
};

export const successResponse = (res, data = null, msg = "OK", code = 200) => {
  return res.status(code).json({
    success: true,
    message: msg,
    ...data,
  });
};
