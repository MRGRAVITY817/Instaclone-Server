import client from '../../client';

export default {
  Query: {
    seeProfile: (_, { username }) =>
      // findUnique finds only for unique fields
      client.user.findUnique({
        where: { username },
      }),
  },
};
