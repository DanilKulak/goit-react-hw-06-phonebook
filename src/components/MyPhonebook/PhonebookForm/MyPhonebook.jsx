import React, { useState, useEffect } from 'react';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import PhonebookList from './PhonebookList/PhonebookList';
import { nanoid } from 'nanoid';
import { Container } from './MyPhonebook.styled';

const MyPhonebook = () => {
  const [contacts, setContacts] = useState(() => {
    const data = JSON.parse(localStorage.getItem('my-contacts'));
    return data || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDuplicate = ({ name, number }) => {
    return contacts.some(
      (contact) =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number.toLowerCase() === number.toLowerCase()
    );
  };
  

  const addContact = (data) => {
    const { name, number } = data;

    if (isDuplicate({ name, number })) {
      alert(`Contact with ${name} and ${number} already in the list`);
      return;
    }

    setContacts((prevContacts) => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return [...prevContacts, newContact];
    });
  };


  const deleteContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const changeFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name, number }) =>
      name.toLowerCase().includes(normalizedFilter) ||
      number.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <Container>
      <h2>Phonebook</h2>
      <PhonebookForm onSubmit={addContact} />
      <div>
        <input onChange={changeFilter} name="filter" placeholder="Search" />
        <PhonebookList items={filteredContacts} deleteContact={deleteContact} />
      </div>
    </Container>
  );
};

export default MyPhonebook;
