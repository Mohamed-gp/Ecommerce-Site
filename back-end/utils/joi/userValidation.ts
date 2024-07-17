import joi from "joi";
// import {loginInterface, registerInterface} from "../../interfaces/authInterface"

const verifyUpdateUser = (obj: object) => {
  const schema = joi
    .object({
      username: joi.string().min(8).max(50).allow(""),
    })

    .unknown(true);

  return schema.validate(obj);
};

export { verifyUpdateUser };
