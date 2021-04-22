import { gql } from 'apollo-server-core';

export default gql`
  type SeeProfileResult {
    ok: Boolean!
    error: String
  }
  type Query {
    seeProfile(username: String!): User
  }
`;
