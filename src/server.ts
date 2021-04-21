require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './schema';
import { getUser, protectedResolver } from './users/user.utils';

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectedResolver,
    };
  },
});

const PORT: string = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}`));
