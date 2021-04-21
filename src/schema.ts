import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from 'apollo-server-express';

// Merge Type Defs
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const typeDefs = mergeTypeDefs(loadedTypes);

// Merge Resolvers
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;