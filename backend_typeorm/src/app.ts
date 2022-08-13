import express from "express";
import morgan from "morgan";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import subCategoryRoutes from "./routes/subCategoryRoutes";
import productRoutes from "./routes/productRoutes";
import budgetRoutes from "./routes/budgetRoutes ";
import budget_entryRoutes from "./routes/budget_entryRoutes";
import customerRoutes from "./routes/customerRoutes";
import addressRoutes from "./routes/addressRoutes";
import orderRoutes from "./routes/orderRoutes";
import order_entryRoutes from "./routes/order_entryRoutes";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/category", categoryRoutes);
app.use("/subcategory", subCategoryRoutes);
app.use("/product", productRoutes);
app.use("/customer", customerRoutes);
app.use("/address", addressRoutes);
app.use("/budget", budgetRoutes);
app.use("/budget_entry", budget_entryRoutes);
app.use("/order", orderRoutes);
app.use("/order_entry", order_entryRoutes);

export default app;
