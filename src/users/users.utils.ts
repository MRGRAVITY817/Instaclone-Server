import * as jwt from 'jsonwebtoken';
import client from '../client';

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const verified = jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await client.user.findUnique({
      where: { id: verified['id'] },
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const protectedResolver = (resolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: 'Please log in to proceed.',
    };
  }
  return resolver(root, args, context, info);
};
