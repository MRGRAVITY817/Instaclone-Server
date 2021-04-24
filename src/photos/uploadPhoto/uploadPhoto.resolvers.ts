import { Resolvers } from '../../users/types';
import { protectedResolver } from '../../users/users.utils';
import { extractHashtags } from '../photos.utils';

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        let hashtags = [];
        if (caption) {
          hashtags = extractHashtags(caption);
        }

        return client.photo.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            file,
            caption,
            ...(hashtags.length > 0 && {
              hashtags: {
                connectOrCreate: hashtags,
              },
            }),
          },
        });
      }
    ),
  },
};

export default resolvers;
