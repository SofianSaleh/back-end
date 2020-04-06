const { formatErrors } = require("../helper");
const { tryLogin } = require("../auth");

module.exports = {
  Query: {
    getUser: async (parent, { id }, { models }) => {
      return await models.User.findByPk(id);
    },
    getAllUsers: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
  },
  Mutation: {
    login: async (parent, { email, password }, { models, SECRET, SECRET2 }) => {
      return await tryLogin(email, password, models, SECRET, SECRET2);
    },

    register: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args);
        console.log(user);
        return {
          success: true,
          user,
        };
      } catch (e) {
        return {
          success: false,
          errors: formatErrors(e, models),
        };
      }
    },
  },
};
