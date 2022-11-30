import mongoose from 'mongoose';

const userIdValidation = async (request, response, next) => {
  const { Types } = mongoose;
  const userId = request.header('x-usersid');

  if (!Types.ObjectId.isValid(userId)) {
    return response.status(404).json({ error: `unkown UserId` });
  }

  next();
};

export default userIdValidation;
