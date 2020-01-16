const argv = require('yargs').argv;
const helpers = require('./contacts');

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      helpers.listContacts();
      break;

    case 'get':
      helpers.getContactById(id);
      break;

    case 'add':
      helpers.addContact(name, email, phone);
      break;

    case 'remove':
      helpers.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
