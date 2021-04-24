import { gql } from 'apollo-server';

export default gql`
  type SeeFeedResult {
    ok: Boolean!
    error: String
    feeds: [Photo]
  }
  type Query {
    seeFeed: SeeFeedResult!
  }
`;
