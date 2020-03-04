const Contacts = require("./api");

// this function finds all save contact
async function listContacts() {
  try {
    let list;
    await Contacts.find({}, function(err, listContacts) {
      if (err) return console.log(err);

      list = listContacts;
    });
    return list;
  } catch (err) {
    console.log("err", err);
  }
}

// this function finds contact by Id and write in console
async function getContactById(contactId) {
  try {
    let contact;
    await Contacts.find({ _id: contactId }, function(err, contactDB) {
      if (err) return console.log(err);
      contact = contactDB;
    });
    return contact;
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

    let newContact;
    await Contacts.create(contact, function(err, contactBD) {
      if (err) return handleError(err);
      newContact = contactBD;
    });

    return newContact;
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

    await Contacts.deleteOne({ _id: contactId }, function(err, cb) {
      if (err) return console.log(err);
    });

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

    await Contacts.updateOne(
      updateContact._id,
      {
        name: name || updateContact.name,
        email: email || contact.email,
        phone: phone || contact.phone
      },
      function(err, cb) {
        if (err) return console.log(err);
      }
    );

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
