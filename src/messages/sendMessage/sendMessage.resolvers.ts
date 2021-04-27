import { Resolvers } from '../../users/types';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    sendMessage: protectedResolver(
      async (_, { payload, roomId, userId }, { loggedInUser, client }) => {
        try {
          let room = null;
          if (userId) {
            const user = await client.user.findUnique({
              where: { id: userId },
              select: { id: userId },
            });
            if (!user) {
              return {
                ok: false,
                error: 'This user does not exist',
              };
            }
            room = await client.room.create({
              data: {
                users: {
                  connect: [{ id: userId }, { id: loggedInUser.id }],
                },
              },
            });
          } else if (roomId) {
            room = await client.room.findUnique({
              where: { id: roomId },
              select: { id: roomId },
            });
            if (!room) {
              return {
                ok: false,
                error: 'Room not found',
              };
            }
          }
          await client.message.create({
            data: {
              payload,
              room: {
                connect: { id: room.id },
              },
              user: {
                connect: { id: loggedInUser.id },
              },
            },
          });
          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: 'Cannot send message',
          };
        }
      }
    ),
  },
};

export default resolvers;
