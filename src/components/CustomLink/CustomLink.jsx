import React from 'react';
import { Link, useMatch } from 'react-router-dom';

export const CustomLink = ({ children, to, ...props }) => {
  const match = useMatch(to);
  return (
    <Link
      to={to}
      {...props}
      style={{
        color: match ? '#ffc300' : 'white',
        textDecoration: 'none',
        fontSize: '20px',
      }}
    >
      {children}
    </Link>
  );
};
