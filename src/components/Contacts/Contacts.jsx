import React from 'react';
import PropTypes from 'prop-types';
import css from './contacts.module.css';

export default function Contacts({ contacts, contactDeleteHandler }) {
  const onContactDelete = event => {
    contactDeleteHandler(event.currentTarget.dataset.id);
  };

  const contactsArray = contacts;
  return (
    <ul className={css.contactsList}>
      {contactsArray.map(contact => {
        return (
          <li key={contact.id} className={css.contactsList__item}>
            {contact.name}: {contact.number}{' '}
            <button
              type="button"
              data-id={contact.id}
              onClick={onContactDelete}
              className={css.deleteButton}
            >
              delete
            </button>{' '}
          </li>
        );
      })}
    </ul>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  contactDeleteHandler: PropTypes.func,
};
