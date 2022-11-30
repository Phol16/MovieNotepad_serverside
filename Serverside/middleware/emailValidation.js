import adminUser from '../models/UserModel.js';
const emailValidation = async (request, response, next) => {
  const { email } = request.body;

  const users = await adminUser.findOne({ email: email });

  if (!email) {
    return response.status(400).json({ error: 'No email inputted' });
  }
  if (!email.includes('@')) {
    return response.status(422).json({
      error: 'Email is Incorrrect',
    });
  }

  if (users) {
    return response.status(400).json({ error: 'Email already exist' });
  }

  next();
};

export default emailValidation;
