import { Resolvers } from '../../users/types';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    editComment: protectedResolver(
      async (_, { id, payload }, { loggedInUser, client }) => {
        try {
          const comment = await client.comment.findUnique({ where: { id } });
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
            await client.comment.update({
              where: { id },
              data: { payload },
            });
          }
          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: 'Cannot edit comment',
          };
        }
      }
    ),
  },
};

export default resolvers;
