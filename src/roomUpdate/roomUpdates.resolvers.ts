import { withFilter } from 'graphql-subscriptions';
import client from '../client';
import { NEW_MESSAGE } from '../constants';
import pubsub from '../pubsub';
import { Context } from '../users/types';

const resolvers = {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context: Context, info) => {
        const room = await client.room.findFirst({
          where: {
            id: args.id,
            users: { some: { id: context.loggedInUser.id } },
          },
          select: { id: true },
        });
        console.log(room);
        if (!room) {
          // Since subscription cannot return null,
          // we throw custom error for this situation
          throw new Error('You shall not see this');
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          async ({ roomUpdates }, { id }, { loggedInUser }) => {
            if (roomUpdates.roomId === id) {
              const room = await client.room.findFirst({
                where: { id, users: { some: { id: loggedInUser.id } } },
                select: { id: true },
              });
              if (!room) return false;
              return true;
            }
          }
        )(root, args, context, info);
      },
    },
  },
};

export default resolvers;
