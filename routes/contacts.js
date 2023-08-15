const express = require("express");
const {
  getContacts,
  deleteContact,
  addContact,
} = require("../controllers/contactController");
const authenticate = require("../middlewares/authenticate");
const isValidId = require("../middlewares/isValidId");
const { validateBody } = require("../schemas/userSchemas");
const contactSchema = require("../schemas/contactSchemas");

const router = express.Router();

router.get("/", authenticate, getContacts);

router.post("/", authenticate, validateBody(contactSchema), addContact);

router.delete("/:contactId", authenticate, isValidId, deleteContact);

module.exports = router;
