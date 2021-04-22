import { Resolvers } from './types';

const resolvers: Resolvers = {
  // This field is not saved in DB, but computed from graphql server.
  User: {
    // Counting the number of users who have my name on their followers list
    totalFollowing: ({ id }, _, { client }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    // Counting the number of users who have my name on their following list
    totalFollowers: ({ id }, _, { client }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser, client }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: { some: { id } },
        },
      });
      return Boolean(exists);
    },
  },
};

export default resolvers;
