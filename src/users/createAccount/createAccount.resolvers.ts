import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../../client';

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });
        if (existingUser) {
          throw new Error('This username/email is already taken');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: hashedPassword,
          },
        });
      } catch (error) {
        return error;
      }
    },
  },
};
