const express = require("express");
const router = express.Router();

const {
  addService,
  getAllService,
  getServiceById,
  updateService,
  deleteService,
} = require("../controller/offeredServiceController");

//get all category
router.get("/", getAllService);

//add a category
router.post("/add", addService);

//get a category
router.get("/:id", getServiceById);

//update a category
router.put("/edit/:id", updateService);

//delete a category
router.patch("/delete/:id", deleteService);

module.exports = router;
