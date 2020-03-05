const Contacts = require("./api");

// this function finds all save contact
async function listContacts() {
  try {
    return await Contacts.find({});
  } catch (err) {
    console.log("err", err);
  }
}

// this function finds contact by Id and write in console
async function getContactById(contactId) {
  try {
    return await Contacts.find({ _id: contactId });
  } catch (err) {
    console.log("err", err);
  }
}

// this function adds contact
async function addContact(name, email, phone) {
  try {
    const contact = {
      name,
      email,
      phone
    };

    return await Contacts.create(contact);
  } catch (err) {
    console.log("ERROR:", err);
  }
}

// this function deletes the contact by Id
async function removeContact(contactId) {
  try {
    const deleted = await getContactById(contactId);

    if (!deleted) {
      return { message: "object not found" };
    }

    await Contacts.deleteOne({ _id: contactId });

    return { message: "object deleted" };
  } catch (err) {
    console.log("ERROR:", err);
  }
}

// this function update the contact by Id from information
async function updateContact(contactId, { name, email, phone }) {
  try {
    const updateContact = await getContactById(contactId);

    if (!updateContact) {
      return { message: "contact not found" };
    }

    await Contacts.updateOne(updateContact._id, {
      name: name || updateContact.name,
      email: email || contact.email,
      phone: phone || contact.phone
    });

    return { message: "contact updated" };
  } catch (err) {
    console.log("ERROR:", err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};
