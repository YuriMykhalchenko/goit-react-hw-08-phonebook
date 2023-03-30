import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { ContactsTitle } from './Contacts.styled';
import Container from '@mui/material/Container';
import { ThreeDots } from 'react-loader-spinner';
import useInput from 'Hooks/useInput';
import { Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { getFilterValue } from 'redux/filterSlice';
import { useGetContactsQuery } from 'redux/contactsApi';

const Contacts = () => {
  const input = useInput('');
  const filterValue = useSelector(getFilterValue);

  const { data: contacts = [], error, isFetching } = useGetContactsQuery();

  const getVisibleContacts = normalizedFilter => {
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  const normalizedFilter = filterValue.toLocaleLowerCase();
  const visibleContats = getVisibleContacts(normalizedFilter);
  return (
    <Container maxWidth="md">
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter {...input} />
      {isFetching ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#0000ff"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        <ContactList contacts={visibleContats} />
      )}
      {error && <h3>Something went wrong</h3>}
      <Outlet />
    </Container>
  );
};

export default Contacts;
