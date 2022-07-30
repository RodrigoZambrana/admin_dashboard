const express = require("express");
const morgan = require("morgan");
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

//Global variables

// Routes
app.use("/categories", require("./routes/categoryRoutes"));
app.use("/subcategories", require("./routes/subCategoryRoutes"));
app.use("/services", require("./routes/offeredServicesRoutes"));
app.use("/customers", require("./routes/customerRoutes"));
app.use("/customer/address", require("./routes/customerAdressRoutes"));
app.use("/budgets", require("./routes/budgetRoutes"));
app.use("/orders", require("./routes/orderRoutes"));
app.use("/budget/product", require("./routes/budgetEntryRoutes "));
app.use("/invoice", require("./routes/invoiceRoutes"));
app.use("/payment", require("./routes/budgetRoutes"));
app.use("/expenses", require("./routes/expenseRoutes"));

//Public

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
