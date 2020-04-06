module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    "Team",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: {
            args: [3, 100],
            msg: `Name must be longer than 3`,
          },
        },
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );
  Team.associate = function (models) {
    // associations can be defined here
    Team.belongsToMany(models.User, {
      through: "member",
      foreignKey: {
        name: "teamId",
        field: "team_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Team.belongsTo(models.User, {
      foreignKey: "owner",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Team;
};
