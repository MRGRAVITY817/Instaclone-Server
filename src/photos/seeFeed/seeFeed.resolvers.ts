import { Resolvers } from '../../users/types';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Query: {
    // When you have to ignore more than 1 arguments, then use double under-bar "__"
    seeFeed: protectedResolver(
      async (_, { offset }, { loggedInUser, client }) =>
        client.photo.findMany({
          take: 2,
          skip: offset,
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
        })
    ),
  },
};

export default resolvers;
