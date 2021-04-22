import { Resolvers } from '../../users/types';

const resolvers: Resolvers = {
  Query: {
    seeHashtag: (_, { hashtag }, { client }) =>
      client.hashtag.findUnique({ where: { hashtag } }),
  },
};
