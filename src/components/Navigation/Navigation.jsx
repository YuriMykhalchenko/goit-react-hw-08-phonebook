import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'Hooks/useAuth';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { CustomLink } from 'components/CustomLink';

const NavLinkStyled = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 20px;
  &.active {
    color: #ffc300;
  }
  &:hover,
  &:focus {
    color: #ffc300;
  }
`;

// import styles from './Navigation.module.css';

export const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav>
      <Box
        component="div"
        sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
      >
        <CustomLink to="/goit-react-hw-08-phonebook">Home</CustomLink>
        {isLoggedIn && (
          <NavLinkStyled to="/goit-react-hw-08-phonebook/contacts">
            Contacts
          </NavLinkStyled>
        )}
      </Box>
    </nav>
  );
};
