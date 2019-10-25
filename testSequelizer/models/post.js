'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    writer: DataTypes.STRING
  },{});

  Post.associate = (models) => {
    Post.hasMany(models.Reply);
  };

  return Post;
};
