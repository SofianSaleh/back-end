const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

let refreshTokens = async (token, refreshToken, models, SECRET, SECRET2) => {
  let userId = 0;
  try {
    const {
      user: { id },
    } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await models.User.findOne({ where: { id: userId }, raw: true });

  if (!user) {
    return {};
  }

  const refreshSecret = user.password + SECRET2;

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(
    user,
    SECRET,
    refreshSecret
  );
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

let createTokens = (user, secret_1, secret_2) => {
  const createToken = jwt.sign({ user: _.pick(user, "id") }, secret_1, {
    expiresIn: "15m",
  });

  const createRefreshToken = jwt.sign({ user: _.pick(user, "id") }, secret_2, {
    expiresIn: "7d",
  });

  return [createToken, createRefreshToken];
};

let tryLogin = async (email, password, models, SECRET, SECRET2) => {
  const user = await models.User.findOne({ where: { email }, raw: true });
  if (!user) {
    console.log(user);
    return {
      success: false,
      errors: [
        {
          path: "Email",
          message: "No this email doesn't belong to any user",
        },
      ],
    };
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return {
      success: false,
      errors: [
        {
          path: "Password",
          message: "Incorrect password",
        },
      ],
    };
  }
  const refreshSecret = user.password + SECRET2;
  const [token, refreshToken] = createTokens(user, SECRET, refreshSecret);
  return {
    success: true,
    token,
    refreshToken,
  };
};

module.exports = {
  tryLogin,
  refreshTokens,
};
