var _ = require("lodash/core");

let formatErrors = (e, models) => {
  if (e instanceof models.Sequelize.ValidationError) {
    return e.errors.map((x) => _.pick(x, ["path", "message"]));
  }
  return [{ path: "name", message: e.message }];
};

module.exports = {
  formatErrors,
};
