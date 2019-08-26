const { gql } = require('apollo-server');

const rootTypes = gql`
  extend type Query {
    album(id: Int): Album!
    albums(offset: Int, limit: Int, orderBy: String): [Album]!
  }
`;

const customTypes = gql`
  type Photo {
    albumId: Int!
    id: Int!
    title: String!
    url: String!
    thumbnailUrl: String!
  }
  type Album {
    id: Int!
    title: String!
    artist: Int!
    photos: [Photo]
  }
`;

exports.typeDefs = [rootTypes, customTypes];
