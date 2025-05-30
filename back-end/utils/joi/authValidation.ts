import joi from "joi";
// import {loginInterface, registerInterface} from "../../interfaces/authInterface"

const verifyRegister = (obj: object) => {
  const schema = joi.object({
    username: joi.string().min(8).max(50).required(),
    email: joi.string().min(8).max(50).required().email(),
    password: joi.string().required().min(8),
    // password: joiPasswordComplexity(),
  });
  return schema.validate(obj);
};
const verifyLogin = (obj: object) => {
  const schema = joi.object({
    email: joi.string().min(8).max(50).required().email(),
    password: joi.string().required().min(8),
    // password: joiPasswordComplexity(),
  });
  return schema.validate(obj);
};

export { verifyRegister, verifyLogin };
