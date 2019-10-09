const statusCodes = {
  OK: 200, // OK best used for READ and UPDATE
  CREATED: 201,
  NOCONTENT: 204, // NOCONTENT best used for DELETE Operations
  BADREQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOTFOUND: 404
};

export default statusCodes;
