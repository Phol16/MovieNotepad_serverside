import adminUser from '../models/UserModel.js';
const emailFieldValidation = async (request, response, next) => {
  const { Email } = request.query;

  const email = await adminUser.findOne({ email: Email });

  if (!email) {
    return response.status(400).json({ error: 'No email Found in DB' });
  }

  next();
};

export default emailFieldValidation;
