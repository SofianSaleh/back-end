module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },

    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },

    password: {
      type: DataTypes.STRING,
      allowNull:false,

    },
  }, {
    timestamps:true,
    paranoid: true,
    underscored:true
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Team,{
      through :'member',
      foreignKey:{
        name:'userId',
        filed:'user_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })


    User.belongsToMany(models.Channel,{
      through :'channel_member',
      foreignKey:{
        name:'userId',
        filed:'user_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })


  };
  return User;
};