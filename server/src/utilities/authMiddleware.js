require("dotenv").config();
const { GraphQLError } = require("graphql");
const UserService = require("../modules/users/users.services");
const UserDB = require("../modules/users/users.db");
const { content } = require("googleapis/build/src/apis/content");

exports.authMiddleware = async ({ token, tablePrefix }) => {
  try {
    const { userId } = UserService.userVerification({ token });
    if (!userId)
      throw new GraphQLError("Token invalid", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });

    const user = await UserDB.getUserById({ userId }, { tablePrefix });

    if (!user) {
      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }

    return {
      token,
      user,
      isValid: true,
    };
  } catch (error) {
    throw new GraphQLError(error.message, {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
};
