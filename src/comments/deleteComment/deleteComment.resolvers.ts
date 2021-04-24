import { Resolvers } from '../../users/types';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: protectedResolver(
      async (_, { id }, { loggedInUser, client }) => {
        try {
          const comment = await client.comment.findUnique({
            where: { id },
            select: { userId: true },
          });
          if (!comment) {
            return {
              ok: false,
              error: 'Comment not found',
            };
          } else if (comment.userId !== loggedInUser.id) {
            return {
              ok: false,
              error: 'Not Authorized',
            };
          } else {
            await client.comment.delete({
              where: { id },
            });
          }
          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: 'Cannot delete comment',
          };
        }
      }
    ),
  },
};

export default resolvers;
