const UnprocessableEntityException = require("../errors/UnprocessableEntityException");
const { getByParams } = require("../services/store/validation.service");

module.exports = (validationRules) => async (req, res, next) => {
  const errors = {};

  // eslint-disable-next-line no-restricted-syntax
  for await (const field of Object.keys(validationRules)) {
    const fieldErrors = [];

    const rules = validationRules[field];

    // eslint-disable-next-line no-restricted-syntax
    for await (const ruleValidate of rules) {
      const [rule, param] = ruleValidate.split(":");
      // eslint-disable-next-line default-case
      switch (rule) {
        case "required":
          if (!req.body[field]) {
            fieldErrors.push("Field is required");
          }
          break;
        case "email":
          if (
            !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body[field])
          ) {
            fieldErrors.push("Valid email is required");
          }
          break;
        case "min":
          {
            const minValue = parseInt(param, 10);
            if (req.body[field] && req.body[field].length < minValue) {
              fieldErrors.push(`Too short. min = ${minValue}`);
            }
          }
          break;
        case "max":
          {
            const maxValue = parseInt(param, 10);
            if (req.body[field] && req.body[field].length > maxValue) {
              fieldErrors.push(`Too short. max = ${maxValue}`);
            }
          }
          break;
        case "phone":
          if (!/^\+?([0-9]{2})\)?([0-9]{10})$/.test(req.body[field])) {
            fieldErrors.push("Valid phone number is required");
          }
          break;
        case "regex":
          {
            const regex = new RegExp(param);
            console.log(regex);
            if (!regex.test(req.body[field])) {
              fieldErrors.push("Data format invalid");
            }
          }
          break;
        case "unique": {
          const additionalParams = param.split(",");
          const table = additionalParams[0];
          const column = additionalParams[1];

          const id =
            additionalParams.length === 3
              ? req.params[additionalParams[2]]
              : null;
          console.log(field, req.body);

          const result = await getByParams(table, column, req.body[field], id);
          if (result.length !== 0) {
            fieldErrors.push(`${field} is presented`);
          }
        }
      }
      if (fieldErrors.length !== 0) {
        errors[field] = fieldErrors;
      }
    }
  }
  if (Object.keys(errors).length === 0) {
    return next();
  }
  next(new UnprocessableEntityException(errors));
};
