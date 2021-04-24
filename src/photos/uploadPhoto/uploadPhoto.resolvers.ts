import { uploadFile } from '../../shared/shared.utils';
import { Resolvers } from '../../users/types';
import { protectedResolver } from '../../users/users.utils';
import { extractHashtags } from '../photos.utils';

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        try {
          let hashtags = [];
          if (caption) {
            hashtags = extractHashtags(caption);
          }
          const fileUrl = await uploadFile(file, loggedInUser.id, 'photo');
          await client.photo.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              file: fileUrl,
              caption,
              ...(hashtags.length > 0 && {
                hashtags: {
                  connectOrCreate: hashtags,
                },
              }),
            },
          });
          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: 'Cannot upload photo',
          };
        }
      }
    ),
  },
};

export default resolvers;
