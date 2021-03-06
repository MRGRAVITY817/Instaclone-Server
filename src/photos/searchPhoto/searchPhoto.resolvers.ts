import { Resolvers } from '../../users/types';

const resolvers: Resolvers = {
  Query: {
    searchPhotos: (_, { keyword }, { client }) =>
      client.photo.findMany({
        where: {
          caption: {
            contains: keyword,
          },
        },
      }),
  },
};

export default resolvers;
