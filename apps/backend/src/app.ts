import "express-async-errors";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./config/passport";
import routes from "./routes";
import errorHandler from "./middlewares/error.middleware";

const app = express();

/**
 * ✅ CORS FIX (no undefined allowed)
 */
const allowedOrigins: string[] = [
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Preflight
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get("/", (_req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api", routes);

// Global error handler
app.use(errorHandler);

export default app;
