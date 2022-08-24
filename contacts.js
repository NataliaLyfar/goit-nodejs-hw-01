const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");


const contactsPath = path.resolve(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(({id}) => id === contactId);
    return result;
  } catch (error) {
    console.log(error);
  };
};

const updateSourceFile = async (instance) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(instance, null, 2));
  } catch (error) {
    console.log(error);
  };
};

const removeContact = async(contactId) => {
  try {
    const contacts = await listContacts();
    const changedList = contacts.filter(({id}) => id !== contactId);
    updateSourceFile(changedList);
    return changedList;
  } catch (error) {
    console.log(error);
  };
};

const addContact = async(name, email, phone) => {
  try {
    const newContact = {id: nanoid(), name, email, phone};
    const contacts = await listContacts();
    const changedList = [newContact, ...contacts];
    updateSourceFile(changedList);
    return newContact;
  } catch (error) {
    console.log(error);
  };
};

const updateContactById = async (id, name, email, phone) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    index === -1 ? null : contacts[index] = {id, name, email, phone};
    updateContactById(contacts);
    return contacts[index];
  } catch (error) {
    console.log(error);
  };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};