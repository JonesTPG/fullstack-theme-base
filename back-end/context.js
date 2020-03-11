import jwt from 'jsonwebtoken';
import config from './utils/config';
import User from './models/user';

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null;
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
    const currentUser = await User.findById(decodedToken.id);
    return { currentUser };
  }
  return null;
};

export default context;
