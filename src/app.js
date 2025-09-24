import express, { json, urlencoded } from "express";
import { join } from "path";
import { config } from "dotenv";

import dbConnect from "./config/db.js";
import authRoutes from "./routes/auth_routes.js";
import orderRoutes from "./routes/routes_order.js";
import equipmentRoutes from "./routes/equipment_routes.js";
import indexRoutes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

config();
dbConnect();

const app = express();

// Middleware
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join(process.cwd(), "public")));

app.use("/", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/equipment", equipmentRoutes);

app.use(errorHandler);

export default app;
