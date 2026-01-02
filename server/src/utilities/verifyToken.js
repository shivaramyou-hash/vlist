// const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const OrgDB = require("../modules/organization/organization.db");

exports.verifyToken = async ({ req }) => {
  try {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    // const orgId = req.headers["x-auth-org"];
    // let tablePrefix = "";
    // if (orgId) {
    //   const org = await OrgDB.organizationById({ orgId });
    //   tablePrefix = org?.[0]?.tablePrefix;
    // }
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      // Split at the space
      const bearer = bearerHeader.split(" ");
      // get token from arrary
      const bearerToken = bearer[1];
      try {
        if (!bearerToken)
          return {
            token: null,
            // tablePrefix,
          };

        const isValid = jwt.verify(
          bearerToken,
          process.env.ACCESS_TOKEN_SECRET
        );
        if (!isValid) {
          return {
            token: null,
            // tablePrefix,
          };
        }
        // set the token
        return {
          token: bearerToken,
          //   tablePrefix,
        };
      } catch (err) {
        return {
          token: null,
          //   tablePrefix,
        };
      }
    } else {
      return {
        token: null,
        // tablePrefix,
      };
    }
  } catch (error) {
    return {
      token: null,
    };
  }
};
