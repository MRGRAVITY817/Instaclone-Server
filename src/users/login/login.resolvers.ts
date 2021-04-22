import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      // TODO: Find user with arg username
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      // TODO: Check password with arg password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: 'Incorrect Password',
        };
      }
      // TODO: If passed, issue a token and send it to the user
      const token = await jwt.sign({ id: user.id }, process.env.PRIVATE_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
