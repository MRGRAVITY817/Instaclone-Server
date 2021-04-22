require('dotenv').config();
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/user.utils';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as logger from 'morgan';

const PORT: string = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

const app = express();
app.use(logger('tiny'));
apollo.applyMiddleware({ app });
app.use('/static', express.static('uploads'));

app.listen({ port: PORT }, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
