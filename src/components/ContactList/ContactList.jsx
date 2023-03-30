import ContactItem from 'components/ContactItem';
// import { ContList } from './ContactList.styled';
import PropTypes from 'prop-types';

import List from '@mui/material/List';

// const ConttList = styled(List)`
//   gap: 10px;
//   display: flex;
//   flex-direction: column;
// `;

const ContactList = ({ contacts }) => {
  return (
    // <Box sx={{ width: '100%' }}>
    <List
      sx={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
      }}
    >
      {/* <Stack spacing={2}> */}
      {contacts.map(({ id, name, number }) => {
        return <ContactItem key={id} id={id} name={name} number={number} />;
      })}
      {/* </Stack> */}
    </List>
    // </Box>
  );
};

ContactList.propTypes = {
  visibleContats: PropTypes.array,
  onDeleteContact: PropTypes.func,
};

export default ContactList;
