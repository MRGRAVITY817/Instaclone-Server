import { Resolvers } from '../../users/types';

const resolvers: Resolvers = {
  Query: {
    seePhotoComment: async (_, { id }, { client }) => {
      try {
        const comments = await client.comment.findMany({
          where: { photoId: id },
          // TODO: Add pagination
          orderBy: { createdAt: 'asc' },
        });
        return {
          ok: true,
          comments,
        };
      } catch (error) {
        return {
          ok: false,
          error: 'Cannot see photo comments',
        };
      }
    },
  },
};

export default resolvers;
