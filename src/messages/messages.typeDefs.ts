import { gql } from 'apollo-server';

export default gql`
  type Message {
    id: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
    payload: String!
    room: Room!
    read: Boolean!
  }
  type Room {
    id: Int!
    createdAt: String!
    updatedAt: String!
    unreadTotal: Int!
    users: [User]
    messages: [Message]
  }
`;
