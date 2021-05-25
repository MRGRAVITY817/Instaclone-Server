import { gql } from 'apollo-server';

export default gql`
  type ToggleFollowResult {
    ok: Boolean!
    error: String
    following: Boolean
  }
  type Mutation {
    toggleFollow(username: String!): ToggleFollowResult!
  }
`;
