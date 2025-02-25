exports.errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  if (err.name === 'CastError') {
    error.message = 'Resource not found';
    return res.status(404).json({ error: error.message });
  }
  
  if (err.code === 11000) {
    error.message = 'Duplicate field value entered';
    return res.status(400).json({ error: error.message });
  }
  
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    error.message = messages.join(', ');
    return res.status(400).json({ error: error.message });
  }
  
  res.status(error.statusCode || 500).json({
    error: error.message || 'Server Error'
  });
};