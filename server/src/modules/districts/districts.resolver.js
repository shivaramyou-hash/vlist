const DistrictsControllers = require("../districts/districts.controllers");

const districtsResolvers = {
  Query: {
    getDistrictsByState: DistrictsControllers.getDistrictsByState,
  },
  Mutation: {},
};
module.exports = districtsResolvers;
