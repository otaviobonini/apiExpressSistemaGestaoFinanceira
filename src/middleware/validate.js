export const validate = (schema, property = "body") => {
  return (req, res, next) => {
    try {
      const data = schema.parse(req[property]);

      req[property] = data;

      return next();
    } catch (error) {
      return res.status(400).json({
        error:
          error.issues?.map((err) => ({
            field: err.path[0],
            message: err.message,
          })) || "Validation error",
      });
    }
  };
};
