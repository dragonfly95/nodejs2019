'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    writer: DataTypes.STRING,
    content: DataTypes.TEXT
  });

  Reply.associate = (models) => {
    // Reply.belongsTo(models.Post, { foreignKey: 'postId' });
    Reply.belongsTo(models.Post);
  };
  return Reply;
};
