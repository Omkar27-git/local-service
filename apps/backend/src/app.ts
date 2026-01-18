import "express-async-errors";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";
import routes from "./routes";
import passport from "passport"; // ✅ use passport directly

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Parsers
app.use(express.json());
app.use(cookieParser());

// Passport init
app.use(passport.initialize());

logger.info("App initialized successfully");

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Routes
app.use("/api", routes);

// Error handler
import errorHandler from "./middlewares/error.middleware";
app.use(errorHandler);

export default app;
