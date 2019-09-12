const { gql } = require('apollo-server');

const getAlbum = id => gql`
    query {
        album(id: ${id}) {
          title
          artist
          photos {
            albumId
            id
            title
            url
            thumbnailUrl
          }
        }
      }`;

const getAlbums = (offset, limit, orderBy, filter) => gql`
  query {
    albums(offset: ${offset}, limit: ${limit}, orderBy: "${orderBy}", filter: "${filter}") {
      title
      artist
      photos {
        albumId
        id
        title
        url
        thumbnailUrl
      }
    }
  }
`;
const buyAlbum = albumId => ({
  mutation: gql`
    mutation buyAlbum($albumId: AlbumId!) {
      buyAlbum(albumId: $albumId) {
        albumId
        title
        userId
      }
    }
  `,
  variables: { albumId }
});

module.exports = { getAlbum, getAlbums, buyAlbum };
