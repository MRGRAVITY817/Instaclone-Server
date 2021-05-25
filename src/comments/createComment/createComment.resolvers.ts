import { Resolvers } from '../../users/types';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    createComment: protectedResolver(
      async (_, { photoId, payload }, { loggedInUser, client }) => {
        try {
          const ok = await client.photo.findUnique({
            where: { id: photoId },
          });
          if (!ok) {
            return {
              ok: false,
              error: 'Photo not found',
            };
          }
          const newComment = await client.comment.create({
            data: {
              payload,
              photo: {
                connect: { id: photoId },
              },
              user: { connect: { id: loggedInUser.id } },
            },
          });
          return {
            ok: true,
            id: newComment.id,
          };
        } catch (error) {
          return {
            ok: false,
            error: 'Cannot create comment',
          };
        }
      }
    ),
  },
};

export default resolvers;
