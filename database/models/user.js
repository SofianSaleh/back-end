const bcrypt = require("bcryptjs");

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
            msg: `The username must contain only letters or number`,
          },
          len: {
            args: [4, 25],
            msg: `The username must be between 4 and 25 characters`,
          },
        },
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: `Invalid Email`,
          },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 100],
            msg: `The password must be between 6 and 100 characters`,
          },
        },
      },
    },
    {
      hooks: {
        afterValidate: async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 12);
          user.password = hashedPassword;
        },
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Team, {
      through: "member",
      foreignKey: {
        name: "userId",
        filed: "user_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.belongsToMany(models.Channel, {
      through: "channel_member",
      foreignKey: {
        name: "userId",
        filed: "user_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return User;
};
