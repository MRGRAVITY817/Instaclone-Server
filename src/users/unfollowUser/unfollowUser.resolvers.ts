import { Resolvers } from '../types';
import { protectedResolver } from '../users.utils';

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser, client }) => {
        try {
          const ok = await client.user.findUnique({
            where: { username },
          });
          if (!ok) {
            return {
              ok: false,
              error: 'User not found',
            };
          }
          await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              following: {
                disconnect: {
                  username,
                },
              },
            },
          });
          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: 'Cannot unfollow user',
          };
        }
      }
    ),
  },
};

export default resolvers;
