const { gql } = require('apollo-server');

const rootTypes = gql`
  directive @cacheControl(maxAge: Int, scope: CacheControlScope) on FIELD_DEFINITION | OBJECT | INTERFACE
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }
  extend type Query {
    album(id: Int): Album! @cacheControl(maxAge: 900)
    albums(offset: Int, limit: Int, orderBy: String, filter: String): [Album]! @cacheControl(maxAge: 900)
  }
  extend type Mutation {
    buyAlbum(albumId: Int!): buyAlbums!
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
  type buyAlbums {
    albumId: Int!
    title: String!
    userId: Int!
  }
`;

exports.typeDefs = [rootTypes, customTypes];
