import { config } from "dotenv";

// Load environment variables from a .env file
config();

interface Config {
  mongoURI: string;
  port: string;
}

const getConfig = (): Config => {
  return {
    mongoURI: process.env.MONGO_URI || "", // MongoDB URI for connecting to the database
    port: process.env.PORT || "5000", // Port the server should run on
  };
};

export default getConfig;
