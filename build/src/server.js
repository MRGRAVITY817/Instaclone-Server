"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var apollo_server_1 = require("apollo-server");
var client = new client_1.PrismaClient();
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Movie {\n    id: Int\n    title: String\n    year: Int\n    createdAt: DateTime\n    updatedAt: DateTime\n  }\n  type Query {\n    movies: [Movie]\n    movie: Movie\n  }\n  type Mutation {\n    createMovie(title: String!, year: Int!, genre: String): Movie\n    deleteMovie(title: String!): Boolean\n  }\n"], ["\n  type Movie {\n    id: Int\n    title: String\n    year: Int\n    createdAt: DateTime\n    updatedAt: DateTime\n  }\n  type Query {\n    movies: [Movie]\n    movie: Movie\n  }\n  type Mutation {\n    createMovie(title: String!, year: Int!, genre: String): Movie\n    deleteMovie(title: String!): Boolean\n  }\n"])));
var resolvers = {
    Query: {
        movies: function () { return client.movie.findMany(); },
        movie: function () { return ({ title: 'hello', year: 2021 }); }
    },
    Mutation: {
        createMovie: function (_, _a) {
            var title = _a.title, year = _a.year, genre = _a.genre;
            return client.movie.create({
                data: {
                    title: title,
                    year: year,
                    genre: genre
                }
            });
        },
        deleteMovie: function (_, _a) {
            var title = _a.title;
            console.log(title);
            return true;
        }
    }
};
var server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});
server
    .listen()
    .then(function () { return console.log('Server is running on http://localhost:4000'); });
var templateObject_1;
