import React, { useState } from 'react';
import './App.css';

const ContactList = ({ contacts, onDelete, onUpdate }) => (
  <ul>
    {contacts.map(contact => (
      <li key={contact.id}>
        {contact.name} - {contact.email} - {contact.phone}
        <button onClick={() => onUpdate(contact.id)}>Edit</button>
        <button onClick={() => onDelete(contact.id)}>Delete</button>
      </li>
    ))}
  </ul>
);

const ContactForm = ({ onSubmit, contact }) => {
  const [name, setName] = useState(contact ? contact.name : '');
  const [email, setEmail] = useState(contact ? contact.email : '');
  const [phone, setPhone] = useState(contact ? contact.phone : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Phone:
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </label>
      <button type="submit">{contact ? 'Update' : 'Add'}</button>
    </form>
  );
};

const ContactApp = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const addContact = (newContact) => {
    setContacts([...contacts, { ...newContact, id: Date.now() }]);
  };

  const updateContact = (id) => {
    const contactToUpdate = contacts.find(contact => contact.id === id);
    setSelectedContact(contactToUpdate);
  };

  const saveContact = (updatedContact) => {
    if (selectedContact) {
      setContacts(contacts.map(contact =>
        contact.id === selectedContact.id ? { ...updatedContact, id: contact.id } : contact
      ));
      setSelectedContact(null);
    } else {
      addContact(updatedContact);
    }
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const searchContacts = (query) => {
    // Implement search logic here
    // For simplicity, let's filter by contact name
    return contacts.filter(contact => contact.name.toLowerCase().includes(query.toLowerCase()));
  };

  return (
    <div>
      <h1>Contact Management System</h1>
      <ContactForm onSubmit={saveContact} contact={selectedContact} />
      <input
        type="text"
        placeholder="Search by name"
        onChange={(e) => setContacts(searchContacts(e.target.value))}
      />
      <ContactList contacts={contacts} onDelete={deleteContact} onUpdate={updateContact} />
    </div>
  );
};

export default ContactApp;
