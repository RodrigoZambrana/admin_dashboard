const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

app.set("trust proxy", 1);

app.use(express.json({ limit: "4mb" }));
app.use(cors());

//Global variables

// Routes
app.use("/categories", require("./routes/categoryRoutes"));
app.use("/subcategories", require("./routes/subCategoryRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/services", require("./routes/offeredServicesRoutes"));
app.use("/customers", require("./routes/customerRoutes"));
app.use("/customer/address", require("./routes/customerAdressRoutes"));
app.use("/budgets", require("./routes/budgetRoutes "));
app.use("/budget/product", require("./routes/budgetEntryRoutes"));
app.use("/orders", require("./routes/orderRoutes"));
app.use("/invoice", require("./routes/invoiceRoutes"));
//app.use("/invoice/product", require("./routes/invoiceEntryRoutes"));
app.use("/payment", require("./routes/paymentRoutes"));
app.use("/expenses", require("./routes/expenseRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

//Public

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
