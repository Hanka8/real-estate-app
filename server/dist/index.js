"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const leadRoutes_1 = __importDefault(require("./routes/leadRoutes"));
const config_1 = __importDefault(require("./config"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
// Initialize configuration values
const { mongoURI, port } = (0, config_1.default)();
const app = (0, express_1.default)();
// Middleware
app.use(body_parser_1.default.json());
// Configure CORS
const allowedOrigins = ["https://your-app-name.netlify.app"];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,POST,OPTIONS",
    allowedHeaders: "Content-Type",
};
app.use((0, cors_1.default)(corsOptions));
// Set up rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
});
app.use("/lead", limiter);
// Connect to MongoDB
mongoose_1.default
    .connect(mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));
// Routes
app.use("/lead", leadRoutes_1.default);
// Sample route to check if the server is running
app.get("/", (req, res) => {
    res.send("Server is running");
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// Export the app for testing
exports.default = app;
