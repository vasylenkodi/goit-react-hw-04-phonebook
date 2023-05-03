import React, { Component } from 'react';
import { useState, useEffect} from 'react';
import shortid from 'shortid';
import ContactsForm from './ContactsForm';
import { Search } from './Search/Search';
import Contacts from './Contacts';
import css from './app.module.css';

export default function App() {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const localStorageData = JSON.parse(localStorage.getItem('contacts'));

  const [contacts, setContacts] = useState(localStorageData ?? initialContacts);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = data => {
    data.id = shortid.generate();

    if (contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    setContacts([...contacts, data]);
  };

  const searchHandler = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const contactDeleteHandler = idToDelete => {
    setContacts(contacts.filter(contact => contact.id !== idToDelete));
  };


  useEffect(() => {
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const inputId = shortid.generate();
  const telId = shortid.generate();

  const filterToLowercase = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filterToLowercase);
  });

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactsForm id={inputId} telId={telId} onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <Search value={filter} onSearch={searchHandler} />
      <Contacts
        contacts={visibleContacts}
        contactDeleteHandler={contactDeleteHandler}
      />
    </div>
  );
}
