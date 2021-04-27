import { Resolvers } from '../users/types';

const resolvers: Resolvers = {
  Room: {
    users: ({ id }, _, { client }) =>
      client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }, _, { client }) =>
      client.message.findMany({ where: { roomId: id } }),
  },
};

export default resolvers;
