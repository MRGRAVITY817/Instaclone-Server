import { Resolvers } from '../../users/types';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Query: {
    // When you have to ignore more than 1 arguments, then use double under-bar "__"
    seeFeed: protectedResolver(async (_, __, { loggedInUser, client }) => {
      try {
        const feeds = await client.photo.findMany({
          where: {
            OR: [
              {
                user: {
                  followers: {
                    some: { id: loggedInUser.id },
                  },
                },
              },
              {
                userId: loggedInUser.id,
              },
            ],
          },
          orderBy: { createdAt: 'desc' },
        });
        return {
          ok: true,
          feeds,
        };
      } catch (error) {
        return {
          ok: false,
          error: 'Cannot see feeds',
        };
      }
    }),
  },
};

export default resolvers;
