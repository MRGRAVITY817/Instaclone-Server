import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    deleteComment(id: String): MutationResponse!
  }
`;
