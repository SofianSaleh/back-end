module.exports = {
  Mutation: {
    createChannel: async (parent, args, { models }) => {
      try {
        return {
          message: null,
          success: !!(await models.Channel.create(args))
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
