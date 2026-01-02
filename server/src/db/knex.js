require("dotenv").config();
const strings = require("../constants/strings");
const environment = process.env.NODE_ENV || strings.DEVELOPMENT;
const config = require("./knex.config.js")[environment];
module.exports = require("knex")(config);
