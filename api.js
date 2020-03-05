const mongoose = require("mongoose");

const contactsScheme = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});

const Contacts = mongoose.model("contacts", contactsScheme);

module.exports = Contacts;
