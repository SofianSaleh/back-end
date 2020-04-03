'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    name: DataTypes.STRING,
    public: DataTypes.BOOLEAN
  }, {
    timestamps:true,
    paranoid: true,
    underscored:true
  });
  Channel.associate = function(models) {
    // associations can be defined here
    Channel.belongsTo(models.Team,{
      foreignKey:{
        name:'teamId',
        filed:'team_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })

    Channel.belongsToMany(models.User,{
      through :'channel_member',
      foreignKey:{
        name:'channelId',
        filed:'channel_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })

  };
  return Channel;
};