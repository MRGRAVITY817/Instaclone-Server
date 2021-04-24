import { Resolvers } from '../../users/types';
import { protectedResolver } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(
      async (_, { id }, { loggedInUser, client }) => {
        try {
          const photo = await client.photo.findUnique({ where: { id } });
          if (!photo) {
            return {
              ok: false,
              error: 'Photo not found',
            };
          }

          const likeWhere = {
            where: {
              photoId_userId: {
                userId: loggedInUser.id,
                photoId: id,
              },
            },
          };

          const like = await client.like.findUnique({
            ...likeWhere,
          });

          if (like) {
            await client.like.delete({
              ...likeWhere,
            });
          } else {
            await client.like.create({
              data: {
                user: {
                  connect: {
                    id: loggedInUser.id,
                  },
                },
                photo: {
                  connect: {
                    id: photo.id,
                  },
                },
              },
            });
          }

          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: 'Cannot toggle like',
          };
        }
      }
    ),
  },
};

export default resolvers;
