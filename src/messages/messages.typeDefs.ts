import { gql } from 'apollo-server';

export default gql`
  type Message {
    id: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
    payload: String!
    room: Room!
  }
  type Room {
    id: Int!
    createdAt: String!
    updatedAt: String!
    users: [User]
    messages: [Message]
  }
`;
