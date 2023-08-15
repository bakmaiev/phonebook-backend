const express = require("express");
const { getContacts } = require("../controllers/contactController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, getContacts);

router.post("/", authenticate);

router.delete("/:contactId", authenticate);

module.exports = router;
