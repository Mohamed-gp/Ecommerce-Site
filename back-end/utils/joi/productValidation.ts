import joi from "joi";

const verifyCreateProduct = (obj: object) => {
  const schema = joi.object({
    name: joi.string().min(5).max(30).required(),
    category: joi.string().min(7).max(50).required(),
    description: joi.string().min(300).max(381).required(),
    promotionPercentage: joi.number().min(1).max(99).required(),
    price: joi.number().min(10).max(10000).required(),
    isFeatured: joi.boolean().required(),
  });
  return schema.validate(obj);
};

export { verifyCreateProduct };
