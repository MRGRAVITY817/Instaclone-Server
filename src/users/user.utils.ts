import * as jwt from 'jsonwebtoken';
import client from '../client';

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const verifiedToken = jwt.verify(token, process.env.PRIVATE_KEY);
    if (verifiedToken) {
      const user = await client.user.findUnique({ where: { id } });
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
};
