import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Label } from './ContactForm.styled';
import styled from '@emotion/styled';
import * as yup from 'yup';
import 'yup-phone';
import PropTypes from 'prop-types';
import { useAddContactMutation } from 'redux/contactsApi';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import Button from '@mui/material/Button';

const Input = styled(Field)`
  max-width: 100%;
  margin-left: auto;
  font-size: 20px;
`;

const ConttForm = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  gap: 10px;
  font-size: 20px;
`;

const initialValues = { name: '', number: '' };

const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const phoneRegExp =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

let SignupSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(
      nameRegExp,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
  number: yup
    .string()
    .matches(
      phoneRegExp,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

const ContactForm = ({ contacts }) => {
  const [addContact, { isLoading }] = useAddContactMutation();

  const handleSubmit = async (values, { resetForm }) => {
    if (checkContactName(values.name)) {
      toast.error('This contact is already exist', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    await addContact(values).unwrap();
    toast.success('Contact is added to your phonebook', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    resetForm();
  };

  const checkContactName = name => {
    return contacts.find(contact => contact.name === name);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={SignupSchema}
    >
      <ConttForm autoComplete="off">
        <Label>
          Name
          <Input type="text" name="name" />
          <ErrorMessage name="name" component="span" />
        </Label>

        <Label>
          Number
          <Input type="tel" name="number" />
          <ErrorMessage name="number" component="span" />
        </Label>

        <Button
          type="submit"
          disabled={isLoading}
          variant="contained"
          sx={{
            height: 40,
            width: 200,
            ':hover': { backgroundColor: 'green' },
          }}
        >
          {isLoading && (
            <Oval
              height={15}
              width={15}
              color="rgb(25, 0, 185)"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          )}
          Add contact
        </Button>
      </ConttForm>
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ContactForm;
