import client from 'src/client';

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      // TODO: Check if username or email are already on DB.
      const existingUser = await client.user.findFirst({
        where: { OR: [{ username }, { email }] },
      });
      console.log(existingUser);
      // TODO: Hash password.
      // TODO: Save and return the user.
    },
  },
};
