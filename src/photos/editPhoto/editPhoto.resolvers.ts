import { Resolvers } from '../../users/types';
import { protectedResolver } from '../../users/users.utils';
import { extractHashtags } from '../photos.utils';

const resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { loggedInUser, client }) => {
        try {
          const photo = await client.photo.findFirst({
            where: { id, userId: loggedInUser.id },
            include: { hashtags: { select: { hashtag: true } } },
          });
          if (!photo) {
            return {
              ok: false,
              error: 'Photo not found',
            };
          }
          let hashtags = [];
          if (caption) {
            hashtags = extractHashtags(caption);
          }
          await client.photo.update({
            where: {
              id,
            },
            data: {
              caption,
              hashtags: {
                disconnect: photo.hashtags,
                connectOrCreate: hashtags,
              },
            },
          });
          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: 'Cannot edit photo',
          };
        }
      }
    ),
  },
};

export default resolvers;
