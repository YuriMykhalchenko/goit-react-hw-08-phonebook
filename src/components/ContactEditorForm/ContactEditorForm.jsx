import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import 'yup-phone';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Text = styled.span`
  font-size: 20px;
`;

const Input = styled(Field)`
  max-width: 100%;
  margin-left: auto;
  font-size: 20px;
`;
export const ContactEditorForm = ({
  initialValues = { name: '', number: '' },
  onSubmit,
  btnText,
}) => {
  const handleSubmit = async (values, actions) => {
    await onSubmit(values);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  const nameRegExp =
    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={SignupSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box
            component="span"
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <label>
              <Box component="div" sx={{ p: 2, display: 'flex', gap: '10px' }}>
                <Text>Name</Text>
                <Input name="name" type="text" />
              </Box>

              <ErrorMessage name="name" component="span" />
            </label>
            <br />
            <label>
              <Box component="div" sx={{ p: 2, display: 'flex', gap: '10px' }}>
                <Text>Number</Text>
                <Input name="number" type="text" />
              </Box>
              <ErrorMessage name="number" component="span" />
            </label>
            <br />
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              sx={{
                height: 40,
                width: 200,
                ':hover': { backgroundColor: 'green' },
              }}
            >
              {btnText}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
