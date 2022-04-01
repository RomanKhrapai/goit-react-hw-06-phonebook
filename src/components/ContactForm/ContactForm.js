import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import contactsActions from 'redux/contacts/contacts-actions';
import { Form } from './Form.styles';
import { InputForm } from './InputForm.styles';

function ContactForm({ contacts, onSubmit }) {
  const [name, setname] = useState('');
  const [number, setnumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        setname(value);
        break;
      case 'number':
        setnumber(value);
        break;
      default:
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (
      !contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      onSubmit({ name, number });
      reset();
    } else {
      alert('Rosie Simpson is already in contacts.');
    }
  };

  const reset = () => {
    setname('');
    setnumber('');
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}> Name </label>

      <InputForm
        id={nameInputId}
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label htmlFor={numberInputId}> Number </label>

      <InputForm
        id={numberInputId}
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button type="submit">add contact</button>
    </Form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    contacts: state.contact.items,
  };
};

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(contactsActions.addContact(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
