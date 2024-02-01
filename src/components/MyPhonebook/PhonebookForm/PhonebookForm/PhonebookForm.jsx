import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Form, FormGroup, Label, Input, SubmitButton } from './PhonebookForm.styled';

const PhonebookForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const PhoneNameId = nanoid();
  const PhoneNumberId = nanoid();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor={PhoneNameId}>Name</Label>
        <Input
          value={name}
          onChange={handleChange}
          id={PhoneNameId}
          type="text"
          name="name"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor={PhoneNumberId}>Number</Label>
        <Input
          value={number}
          onChange={handleChange}
          id={PhoneNumberId}
          type="tel"
          name="number"
          required
        />
      </FormGroup>
      <SubmitButton type="submit">Add contact</SubmitButton>
    </Form>
  );
};

export default PhonebookForm;
