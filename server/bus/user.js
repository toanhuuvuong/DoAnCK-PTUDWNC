const db = require("../utils/db");
const utils = require("../utils/utils");

const TABLE = "users";
const viewFields = [];
const changeFields = [];

module.exports = {
  ...utils.commonModel(db, TABLE, viewFields, changeFields),
  findByUsername: (username) => this.findByCondition({ username: username }),
};