const Contact = require("../db/models/contactModel");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner });
  res.json(result);
};

module.exports = { getContacts };
