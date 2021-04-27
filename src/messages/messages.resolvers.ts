import { Resolvers } from '../users/types';

const resolvers: Resolvers = {
  Room: {
    users: ({ id }, _, { client }) =>
      client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }, _, { client }) =>
      client.message.findMany({ where: { roomId: id } }),
    unreadTotal: ({ id }, _, { loggedInUser, client }) => {
      if (!loggedInUser) {
        return 0;
      }
      return client.message.count({
        where: {
          read: false,
          roomId: id,
          user: {
            id: {
              not: loggedInUser.id, // Person who send the message reads it as default
            },
          },
        },
      });
    },
  },
};

export default resolvers;
