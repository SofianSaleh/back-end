module.exports = {
  Mutation: {
    createTeam: async (parent, args, { models, user }) => {
      try {
        return {
          msg: null,
          success: !!(await models.Team.create({ ...args, owner: user.id })),
        };
      } catch (e) {
        return {
          msg: e.message,
          success: false,
        };
      }
    },
  },
};
