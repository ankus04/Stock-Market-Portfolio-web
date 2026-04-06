const jwtSecret =
  process.env.JWT_SECRET || "local_dev_jwt_secret_change_me";

if (!process.env.JWT_SECRET) {
  console.log(
    "JWT_SECRET not found in environment. Using default local development secret."
  );
}

export { jwtSecret };
