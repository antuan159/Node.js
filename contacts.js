const fs = require('fs');
const path = require('path');

const contactPath = path.join('db', 'contacts.json');
const encoding = 'utf8';

// this function search all save contacs and write in console
function listContacts() {
  fs.readFile(contactPath, encoding, (err, contacts) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(JSON.parse(contacts));
  });
}

// this function finds contact by Id and write in console
function getContactById(contactId) {
  fs.readFile(contactPath, encoding, (err, contacts) => {
    if (err) {
      console.log(err);
      return;
    }
    const contactsList = JSON.parse(contacts);
    const obj = contactsList.find(contact => {
      if (contact.id === contactId) return contact;
    });
    if (obj.length === 0) {
      console.log('ID not found');
      return;
    }
    console.table(obj);
  });
}

// this function deletes the contact by Id
function removeContact(contactId) {
  fs.readFile(contactPath, encoding, (err, contacts) => {
    if (err) {
      console.log(err);
      return;
    }

    const contactsList = JSON.parse(contacts);

    const filtredContacts = contactsList.filter(
      contact => contact.id !== contactId
    );

    fs.writeFile(contactPath, JSON.stringify(filtredContacts), err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Contacts removed');
    });
  });
}

// this function adds contact
function addContact(name, email, phone) {
  fs.readFile(contactPath, encoding, (err, contacts) => {
    if (err) {
      console.log(err);
      return;
    }
    const arr = JSON.parse(contacts);
    const latsItem = arr[arr.length - 1];

    const contact = {
      id: latsItem.id + 1,
      name,
      email,
      phone
    };

    arr.push(contact);
    fs.writeFile(contactPath, JSON.stringify(arr), err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Contacts Added');
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
