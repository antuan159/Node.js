const express = require('express');
const app = express();
const contactsApi = require('./contacts');

app.get('/', function(req, res) {
  const list = contactsApi.listContacts();
  console.table(list);
  res.send('good');
});

app.listen(3000);
