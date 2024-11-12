"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
// Load environment variables from a .env file
(0, dotenv_1.config)();
const getConfig = () => {
    return {
        mongoURI: process.env.MONGO_URI || "",
        port: process.env.PORT || "5000", // Port the server should run on
    };
};
exports.default = getConfig;
