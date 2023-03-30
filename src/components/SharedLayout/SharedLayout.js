import { Outlet } from 'react-router-dom';
import { AppBarComp } from 'components';
import { Suspense } from 'react';
import Container from '@mui/material/Container';

export const SharedLayout = () => {
  return (
    <Container
      sx={{
        maxWidth: '1200px',
        paddingTop: 10,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <AppBarComp />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </Container>
  );
};
