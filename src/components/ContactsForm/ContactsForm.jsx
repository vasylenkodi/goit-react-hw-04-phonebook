import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './contactsForm.module.css';

export default function ContactsForm({id, telId, onSubmit}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      
            case 'number':
        setNumber(value);
        break;
    
      default:
        break;
    }
  };

  const onFormSubmit = event => {
    event.preventDefault();

    onSubmit({name, number});
    reset();
  };

  function reset() {
    setName('');
    setNumber('');
  }

    return (
      <form onSubmit={onFormSubmit} className={css.contactsForm}>
        <label htmlFor={id}>
          Name
          <input
            id={id}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor={telId}>
          Number
          <input
            id={telId}
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit" className={css.addContactButton}>
          Add contact
        </button>
      </form>
    );
  }

  ContactsForm.propTypes = {
    id: PropTypes.string,
    telId: PropTypes.string,
    onSubmit: PropTypes.func,
  };