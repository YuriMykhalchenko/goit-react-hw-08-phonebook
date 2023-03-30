import React from 'react';
import { NavLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled';

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

// import styles from './AuthNav.module.css';

export const AuthNav = () => {
  return (
    <Stack spacing={2} direction="row">
      <NavLinkStyled to="/goit-react-hw-08-phonebook/register">
        Register
      </NavLinkStyled>
      <NavLinkStyled to="/goit-react-hw-08-phonebook/login">
        Log In
      </NavLinkStyled>
    </Stack>
  );
};
