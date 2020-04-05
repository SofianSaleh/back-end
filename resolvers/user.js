const bcrypt = require("bcryptjs");
const { formatErrors } = require("../helper");

module.exports = {
  Query: {
    getUser: async (parent, { id }, { models }) => {
      return await models.User.findByPk(id);
    },
    getAllUsers: async (parent, args, { models }) => {
      return await models.User.findAll();
    }
  },
  Mutation: {
    register: async (parent, { password, ...otherArgs }, { models }) => {
      try {
        if (password.length < 6) {
          return {
            success: false,
            errors: [
              {
                path: "password",
                message: `Password must be longer thean 6 characters`
              }
            ]
          };
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await models.User.create({
          ...otherArgs,
          password: hashedPassword
        });
        return {
          success: true,
          user
        };
      } catch (e) {
        console.log(`hi`);
        console.log({
          success: false,
          errors: formatErrors(e, models)
        });
        return {
          success: false,
          errors: formatErrors(e, models)
        };
      }
    }
  }
};
