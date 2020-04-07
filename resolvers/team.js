const { formatErrors } = require("../helper");
const requiresAuth = require("../premissions");

module.exports = {
  Mutation: {
    createTeam: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          console.log(user);
          const team = await models.Team.create({ ...args, owner: user.id });
          console.log(team);
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
};
