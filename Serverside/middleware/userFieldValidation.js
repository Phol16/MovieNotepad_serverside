const userFieldValidation = (request, response, next) => {
  const {  email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({ error: 'Missing Input' });
  }

  next();
};

export default userFieldValidation;
