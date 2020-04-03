'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    text: DataTypes.TEXT
  }, {
    timestamps:true,
    paranoid: true,
    underscored:true
  });
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.Channel,{
      foreignKey:{
        name:'channelId',
        filed:'channel_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })

    Message.belongsTo(models.User,{
      foreignKey:{
        name:'userId',
        filed:'user_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  };
  return Message;
};