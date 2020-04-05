module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            message: `The username must contain only letters or number`
          },
          len: {
            args: [4, 25],
            message: `The username must be between 4 and 25 characters`
          }
        }
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: false,
            message: `Invalid Email`
          }
        }
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Team, {
      through: "member",
      foreignKey: {
        name: "userId",
        filed: "user_id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    User.belongsToMany(models.Channel, {
      through: "channel_member",
      foreignKey: {
        name: "userId",
        filed: "user_id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
  };
  return User;
};
