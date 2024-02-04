
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, updateFilter } from '../../../redux/phonebookSlice';
import { persistor } from '../../../redux/store';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import PhonebookList from './PhonebookList/PhonebookList';
import { Container } from './MyPhonebook.styled';
import { PersistGate } from 'redux-persist/integration/react';
import { nanoid } from 'nanoid';

const MyPhonebook = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);

  const isDuplicate = ({ name, number }) => {
    return contacts.some(
      (contact) =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number.toLowerCase() === number.toLowerCase()
    );
  };

  const addContactHandler = (data) => {
    const { name, number } = data;

    if (isDuplicate({ name, number })) {
      alert(`Contact with ${name} and ${number} already in the list`);
      return;
    }

    dispatch(addContact({ id: nanoid(), ...data }));
  };

  const deleteContactHandler = (id) => {
    dispatch(deleteContact(id));
  };

  const changeFilterHandler = ({ target }) => {
    dispatch(updateFilter(target.value));
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
    <PersistGate loading={null} persistor={persistor}>
      <Container>
        <h2>Phonebook</h2>
        <PhonebookForm onSubmit={addContactHandler} />
        <div>
          <input onChange={changeFilterHandler} name="filter" placeholder="Search" />
          <PhonebookList items={filteredContacts} deleteContact={deleteContactHandler} />
        </div>
      </Container>
    </PersistGate>
  );
};

export default MyPhonebook;
