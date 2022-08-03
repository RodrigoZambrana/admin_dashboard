import express from "express";
import morgan from "morgan";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", adminRoutes);

export default app;
