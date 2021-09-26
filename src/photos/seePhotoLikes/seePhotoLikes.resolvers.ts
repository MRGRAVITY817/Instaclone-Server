import { Resolvers } from '../../users/types';

const resolvers: Resolvers = {
  Query: {
    seePhotoLikes: async (_, { id }, { client }) => {
      // You better use select if you want to load the specified part
      // use include if you want to load basics + optional
      const likes = await client.like.findMany({
        where: { photoId: id },
        select: { user: true },
      });
      // Since likes will return {user}[], we have to extract it
      // using array map.
      const users = likes.map((like) => like.user);
      return users;
    },
  },
};

export default resolvers;
