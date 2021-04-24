import { gql } from 'apollo-server';

export default gql`
  type SeePhotoCommentResult {
    ok: Boolean!
    error: String
    comments: [Comment]
  }
  type Query {
    seePhotoComment(id: String): SeePhotoCommentResult!
  }
`;
