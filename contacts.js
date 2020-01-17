const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const contactPath = path.join(__dirname, 'db', 'contacts.json');
const encoding = 'utf8';

// this function finds all save contact
async function listContacts() {
  try {
    const listContacts = await readFileAsync(contactPath, encoding);
    return JSON.parse(listContacts);
  } catch (err) {
    console.log('ERROR:', err);
  }
}

// this function finds contact by Id and write in console
async function getContactById(contactId) {
  try {
    const listContacts = await readFileAsync(contactPath, encoding);
    const contactsList = JSON.parse(listContacts);

    let obj = contactsList.filter(contact => {
      if (contact.id === contactId) return contact;
    });

    if (obj.length === 0) {
      return { message: 'Not found' };
    }

    return obj;
  } catch (err) {
    console.log('ERROR:', err);
  }
}

// this function adds contact
async function addContact(name, email, phone) {
  try {
    const contact = {
      id: 0,
      name,
      email,
      phone
    };

    const listContacts = JSON.parse(await readFileAsync(contactPath, encoding));
    let arr = [];

    if (listContacts) {
      arr = listContacts;
      contact['id'] = arr[arr.length - 1].id + 1;
    }
    arr.push(contact);

    await writeFileAsync(contactPath, JSON.stringify(arr));

    return contact;
  } catch (err) {
    console.log('ERROR:', err);
  }
}

// this function deletes the contact by Id
async function removeContact(contactId) {
  try {
    const listContacts = JSON.parse(await readFileAsync(contactPath, encoding));

    const isInclud = listContacts.filter(contact => contact.id === contactId);
    if (isInclud.length === 0) {
      return { message: 'Not found' };
    }

    const filtredContacts = listContacts.filter(
      contact => contact.id !== contactId
    );

    await writeFileAsync(contactPath, JSON.stringify(filtredContacts));
    return { message: 'contact deleted' };
  } catch (err) {
    console.log('ERROR:', err);
  }
}

// this function update the contact by Id from information
async function updateContact(contactId, { name, email, phone }) {
  try {
    const listContacts = JSON.parse(await readFileAsync(contactPath, encoding));

    const isInclud = listContacts.filter(contact => contact.id === contactId);
    if (isInclud.length === 0) {
      return { message: 'Not found' };
    }
    let updatecContact;

    const filtredContacts = listContacts.filter(contact => {
      if (contact.id === contactId) {
        contact.name = name || contact.name;
        contact.email = email || contact.email;
        contact.phone = phone || contact.phone;
        updatecContact = contact;
      }
      return contact;
    });

    await writeFileAsync(contactPath, JSON.stringify(filtredContacts));
    return updatecContact;
  } catch (err) {
    console.log('ERROR:', err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};
