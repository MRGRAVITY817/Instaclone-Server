import { Resolvers } from '../../users/types';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    readMessage: protectedResolver(
      async (_, { id }, { loggedInUser, client }) => {
        try {
          const message = await client.message.findFirst({
            where: {
              id,
              userId: { not: loggedInUser.id },
              room: { users: { some: { id: loggedInUser.id } } },
            },
            select: { id: true },
          });
          if (!message) {
            return {
              ok: false,
              error: 'Message not found',
            };
          }
          await client.message.update({
            where: { id },
            data: { read: true },
          });
          return { ok: true };
        } catch (error) {
          return {
            ok: false,
            error: 'Cannot read message',
          };
        }
      }
    ),
  },
};

export default resolvers;
