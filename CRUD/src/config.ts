import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env" });

const config = {
  port: process.env.PORT,
  database: {
    host: process.env.DB_HOST!,
    port: process.env.DB_PORT!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    name: process.env.DB_NAME!,
  },
  jwt: {
    secret: process.env.SECRET!,
  },
};

export default config;
