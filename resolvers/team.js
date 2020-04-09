const { formatErrors } = require("../helper");
const requiresAuth = require("../premissions");

module.exports = {
  Query: {
    allTeams: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        return await models.Team.findAll({
          where: { owner: user.id },
          raw: true,
        });
      }
    ),
  },
  Mutation: {
    createTeam: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          const team = await models.Team.create({ ...args, owner: user.id });
          return {
            success: true,
          };
        } catch (e) {
          console.log(e);
          return {
            success: false,
            error: formatErrors(e, models),
          };
        }
      }
    ),
  },
  Team: {
    channels: ({ id }, args, { models }) =>
      models.Channel.findAll({ where: { teamId: id } }),
  },
};
