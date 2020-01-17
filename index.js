const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const contactsApi = require('./contacts');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {
    flags: 'a'
  }
);

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors());
// app.use(morgan('combined'));
app.use(bodyParser.json());

// get save all contacts
app.get('/api/contacts', async function(req, res) {
  try {
    const contacts = await contactsApi.listContacts();
    res.json(contacts);
  } catch (err) {
    console.log(err);
  }
});

// get contact by Id
app.get('/api/contacts/:contactId', async function(req, res) {
  const query = Number(req.params.contactId);
  try {
    const obj = await contactsApi.getContactById(query);
    res.status(200).json(obj);
  } catch (error) {
    res.status(404).send(error);
  }
});

// add contact
app.post('/api/contacts', async function(req, res) {
  if (!req.body.name || !req.body.email || !req.body.phone) {
    res.status(400).json({ message: 'missing required name field' });
    return;
  }

  try {
    const contact = await contactsApi.addContact(
      req.body.name,
      req.body.email,
      req.body.phone
    );

    res.status(201).json(contact);
  } catch (error) {
    console.log(error);
  }
});

// remove contact by Id
app.delete('/api/contacts/:contactId', async function(req, res) {
  const query = Number(req.params.contactId);
  try {
    const message = await contactsApi.removeContact(query);
    res.status(200).json(message);
  } catch (err) {
    res.status(404).json(err);
  }
});

// update contact by Id
app.patch('/api/contacts/:contactId', async function(req, res) {
  if (Object.keys(req.body).length == 0) {
    res.status(400).send({ message: 'missing fields' });
    return;
  }

  const query = Number(req.params.contactId);
  try {
    const message = await contactsApi.updateContact(query, req.body);
    res.status(200).json(message);
  } catch (err) {
    res.status(404).json(err);
  }
});
app.listen(PORT, () => {
  console.log('server has been started...');
});
