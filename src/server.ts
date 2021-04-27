require('dotenv').config();
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as logger from 'morgan';
import client from './client';
import * as http from 'http';

interface SubscriptionParams {
  token?: string;
}

const PORT: string = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async (ctx) => {
    // Http context
    if (ctx.req) {
      return { loggedInUser: await getUser(ctx.req.headers.token), client };
    } else {
      // Web socket context
      const {
        connection: { context },
      } = ctx;
      return { loggedInUser: context.loggedInUser, client };
    }
  },
  subscriptions: {
    onConnect: async ({ token }: SubscriptionParams) => {
      if (!token) {
        throw new Error("You can't listen");
      }
      const loggedInUser = await getUser(token);
      return { loggedInUser };
    },
  },
});

const app = express();
app.use(logger('tiny'));
apollo.applyMiddleware({ app });
app.use('/static', express.static('uploads'));

// For subscriptions
const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
