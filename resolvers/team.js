module.exports = {
  Mutation: {
    createTeam: async (parent, args, { models, user }) => {
      try {
        return {
          message: null,
          success: !!(await models.Team.create({ ...args, owner: user.id }))
        };
      } catch (e) {
        return {
          message: e.message,
          success: false
        };
      }
    }
  }
};
