import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Query: {
    seeProfile: (_, { username }, { client }) =>
      // findUnique finds only for unique fields
      client.user.findUnique({
        where: { username },
        // since loading related objects may be expensive,
        // we have to select which field to include in related object
        include: {
          following: true,
          followers: true,
        },
      }),
  },
};

export default resolvers;
