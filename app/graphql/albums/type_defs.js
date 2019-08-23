const { gql } = require('apollo-server');

const rootTypes = gql`
  extend type Query {
    album(id: Int): album!
  }
`;

const customTypes = gql`
  type photo {
    albumId: Int!
    id: Int!
    title: String!
    url: String!
    thumbnailUrl: String!
  }
  type album {
    id: Int!
    title: String!
    artist: Int!
    photos: [photo]
  }
`;

const inputTypes = gql`
  input AlbumsInput {
    artist: Int!
    id: Int!
    title: String!
  }
`;

exports.typeDefs = [rootTypes, customTypes, inputTypes];
