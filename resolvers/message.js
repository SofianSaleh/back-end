module.exports = {
  Mutation: {
    createMessage: async (parent, args, { models, user }) => {
      try {
        return {
          message: null,
          success: !!(await models.Message.create({ ...args, userId: user.id }))
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
