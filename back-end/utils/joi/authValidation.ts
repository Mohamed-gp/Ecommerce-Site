import joi from "joi";
import joiPasswordComplexity from "joi-password-complexity";
import {loginInterface, registerInterface} from "../../interfaces/authInterface"



const verifyRegister = (obj :registerInterface) => {
  const schema = joi.object({
    username: joi.string().min(8).max(50).required(),
    email: joi.string().min(8).max(50).required().email(),
    password: joiPasswordComplexity(),
  });
  return schema.validate(obj)
};
const verifyLogin = (obj : loginInterface) => {
  const schema = joi.object({
    email: joi.string().min(8).max(50).required().email(),
    password: joiPasswordComplexity(),
  });
  return schema.validate(obj)
};


export {verifyRegister,verifyLogin}