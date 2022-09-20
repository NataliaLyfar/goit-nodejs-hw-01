const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");


const contactsPath = path.resolve(__dirname,"db", "contacts.json");

const updateContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.log(error);
  };
};

const getContactsList = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getContactsList();
    const contact = contacts.find(({id}) => id === contactId);
    if(!contact) return null; 
    return contact;
  } catch (error) {
    console.log(error);
  };
};

const addContact = async(name, email, phone) => {
  try {
    const newContact = {id: nanoid(), name, email, phone};
    const contacts = await getContactsList();
    const changedList = [newContact, ...contacts];
    await updateContacts(changedList);
    return newContact;
  } catch (error) {
    console.log(error);
  };
};

const removeContact = async(contactId) => {
  try {
    const contacts = await getContactsList();
    const index = contacts.findIndex(({id}) => id === contactId);
    if(index === -1) return null;
    const [removedContact] = contacts.splice(index,1)
    await updateContacts(contacts);
    return removedContact;
  } catch (error) {
    console.log(error);
  };
};

const updateContactById = async (id, name, email, phone) => {
  try {
    const contacts = await getContactsList();
    const index = contacts.findIndex(contact => contact.id === id);
    index === -1 ? null : contacts[index] = {id, name, email, phone};
    await updateContacts(contacts);
    return contacts[index];
  } catch (error) {
    console.log(error);
  };
};

module.exports = {
  getContactsList,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};