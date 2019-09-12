module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'album',
    {
      albumId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'album_id'
      },
      name: {
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id'
      }
    },
    {
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: 'albums'
    }
  );

  Album.createModel = album => Album.create(album);

  Album.associate = models => {
    Album.belongsTo(models.user, {
      foreignKey: 'userId'
    });
  };

  return Album;
};
