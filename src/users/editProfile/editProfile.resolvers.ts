import client from '../../client';
import bcrypt from 'bcrypt';
import { protectedResolver } from '../user.utils';

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { firstName, lastName, username, email, password: newPassword },
        { loggedInUser }
      ) => {
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            username,
            email,
            ...(uglyPassword && { password: uglyPassword }),
          },
        });
        if (updatedUser) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: 'User cannot be updated',
          };
        }
      }
    ),
  },
};
