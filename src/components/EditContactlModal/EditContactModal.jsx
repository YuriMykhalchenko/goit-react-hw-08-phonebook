import { useNavigate } from 'react-router-dom';
import { ContactEditorForm } from 'components/ContactEditorForm/ContactEditorForm';
import { Overlay, Modal } from './EditMaterialModal.styled';
import { useParams } from 'react-router-dom';
import { useGetContactsQuery } from 'redux/contactsApi';
import { useUpdateContactMutation } from 'redux/contactsApi';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const EditContactModal = () => {
  const { contactId } = useParams();
  const { data: contacts } = useGetContactsQuery();
  const getContactById = id => contacts.find(contact => contact.id === id);
  const contact = getContactById(contactId);
  console.log(contact);
  const contactName = contact.name;
  const contactNumber = contact.number;
  const [updateContact] = useUpdateContactMutation();
  const navigate = useNavigate();
  const closeModal = () => navigate('/goit-react-hw-08-phonebook/contacts');

  const checkName = name =>
    contacts.find(
      searchedContact =>
        searchedContact.name.toLowerCase() === name &&
        searchedContact.id !== contact.id
    );

  const handleUpdateContact = async fields => {
    const name = fields.name.toLowerCase();

    if (checkName(name)) {
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
    try {
      await updateContact({ id: contactId, ...fields });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Overlay>
      <Modal>
        <Box
          component="div"
          sx={{
            p: 2,
            border: '1px dashed grey',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {' '}
          {contact && (
            <ContactEditorForm
              initialValues={{ name: contactName, number: contactNumber }}
              btnText="Save changes"
              onSubmit={handleUpdateContact}
            />
          )}
          <Button
            type="button"
            onClick={closeModal}
            variant="contained"
            sx={{
              height: 40,
              width: 200,
              backgroundColor: 'orange',
              ':hover': { backgroundColor: 'red' },
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Overlay>
  );
};

export default EditContactModal;
