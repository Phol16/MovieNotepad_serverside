const userFieldValidation = (request, response, next) => {
  const { firstName, lastName, email, password } = request.body;

  if (!firstName || !lastName || !email || !password) {
    return response.status(400).json({ error: 'Missing Input' });
  }

  next();
};

export default userFieldValidation;
