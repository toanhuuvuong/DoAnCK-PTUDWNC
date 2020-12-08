const { STATUS } = require("./constant");
const constant = require("./constant");
const { STATUS } = constant;
const helper = require("./helper")


module.exports = {
  handleReadRequest: async ({ req, res, sourceInput, fields, readFunc, resource }) => {
    let obj = {};
    if (sourceInput) obj = helper.dataMapper(req[sourceInput], fields || []);

    try {
      const info = await readFunc(obj);

      const data = {};
      data[resource] = info;
      helper.responseWithData(res, data)
    } catch (error) {
      console.error(error);
      if (typeof error === "number")
        helper.responseWithStatus(res, error)
      else
        helper.responseWithStatus(res, STATUS.INTERNAL);
    }
  },
  handleWriteRequest: async ({ req, res, sourceInput, fields, io, resource, logContent }) => {
    const obj = {};
    if (sourceInput) helper.dataMapper(req[sourceInput], fields);

    try {
      const result = await io(obj);
      if (result.affectedRows) {
        //create data to response
        const data = {};
        data[resource] = req.body;
        if (result.insertId)
          data[resource][fields[0]] = result.insertId;
        helper.responseWithData(res, data);
      } else
        helper.responseWithStatus(res, STATUS.UNCHANGE);
    } catch (error) {
      console.error(error);
      if (typeof error === "number")
        helper.responseWithStatus(res, error)
      else
        helper.responseWithStatus(res, STATUS.INTERNAL);
    }
  },
}