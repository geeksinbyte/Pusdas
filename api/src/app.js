import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

// Enable CORS
app.use(cors());

// Logging
app.use(morgan("combined"));

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(routes);

export default app;
