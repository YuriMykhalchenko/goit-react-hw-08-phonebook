import React from 'react';
import { Navigation } from 'components/Navigation';
import { AuthNav } from 'components/AuthNav';
import { useAuth } from 'Hooks/useAuth';
import { UserMenu } from 'components';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export const AppBarComp = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <AppBar>
        <Container>
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Phonebook
            </Typography>

            <Box
              component="div"
              sx={{ display: 'flex', gap: 10, alignItems: 'center' }}
            >
              <Navigation />
              {isLoggedIn ? <UserMenu /> : <AuthNav />}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
