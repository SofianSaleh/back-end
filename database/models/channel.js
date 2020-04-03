'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    name: DataTypes.STRING,
    public: DataTypes.BOOLEAN
  }, {
    timestamps:true,
    paranoid: true
  });
  Channel.associate = function(models) {
    // associations can be defined here
    Channel.belongsTo(models.Team,{
      foreignKey:'team_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  };
  return Channel;
};